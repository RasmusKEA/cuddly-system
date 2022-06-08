let session = JSON.parse(localStorage.getItem("session"))
if(session === null){
    window.location = "/"
}else if(session.role !== "admin"){
    window.location = "/home"
}

fetch(`https://paythehippy-app.azurewebsites.net/api/Member`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        localStorage.removeItem("session")
        window.location = "/"
        cuteToast({
            type: 'error', // or 'info', 'error', 'warning',
            title: "Error",
            message: "You do not have access to this page",
            timer: 5000
          })
        throw Error("Unauthorized")
    }
    return res.json()
}).then(res => {
    populateMembers(res.members)
});

function populateMembers(data) {
    let checkboxDiv = document.getElementById('left')

    data.forEach(element => {
        let label = document.createElement('label')
        label.className = 'container'
        label.innerHTML = element.name

        let input = document.createElement('input')
        input.type = 'checkbox'
        input.id = element.id
        input.className = "select-members"
        label.append(input)

        let checkmark = document.createElement('span')
        checkmark.className = 'checkmark'
        label.append(checkmark)

        checkboxDiv.append(label)
    });
}

document.getElementById('select-all-members').onclick = function() {
    let checkboxes = document.querySelectorAll('.select-members');
    for (let checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
}

fetch(`https://paythehippy-app.azurewebsites.net/api/Fine`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        localStorage.removeItem("session")
        window.location = "/"
        cuteToast({
            type: 'error', // or 'info', 'error', 'warning',
            title: "Error",
            message: "You do not have access to this page",
            timer: 5000
          })
    }
    return res.json()
}).then(res => {
    populateFines(res.fines)
});

function populateFines(data){
    let checkboxDiv = document.getElementById('right')

    data.forEach(element => {

        if(element.name !== "Recurring Fine"){
            let infoDiv = document.createElement('div')
            infoDiv.className = 'fine-info'
    
            let label = document.createElement('label')
            label.className = 'container'
            label.innerHTML = element.name
    
            let input = document.createElement('input')
            input.type = 'checkbox'
            input.id = element.id
            input.className = "select-fines"
            label.append(input)
    
            let checkmark = document.createElement('span')
            checkmark.className = 'checkmark'
            label.append(checkmark)
    
            let info = document.createElement('p')
            info.className = 'fine-amount'
            info.id = `${element.id}-info`
            info.innerHTML = element.amount
    
            infoDiv.append(label)
            infoDiv.append(info)
    
    
            checkboxDiv.append(infoDiv)
        }
        
    });
}
document.getElementById('select-all-fines').onclick = function() {
    let checkboxes = document.querySelectorAll('.select-fines');
    for (let checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
}

document.getElementById('confirm-btn').onclick = function(){
    let finesChecked = document.querySelectorAll('.select-fines')
    let membersChecked = document.querySelectorAll('.select-members')

    let fines = []
    let members = []

    for (let checkbox of finesChecked) {
        if(checkbox.checked){
            fines.push(checkbox.id)
        }
    }

    for (let checkbox of membersChecked) {
        if(checkbox.checked){
            members.push(checkbox.id)
        }
    }

    if(fines.length !== 0 && members.length !== 0 ){
        let transactions = []

        fines.forEach(fine => {
            members.forEach(member => {
                transactions.push({date: document.getElementById('date').value,
                amount: document.getElementById(`${fine}-info`).textContent,
                memberId: member,
                id: fine,
                transactionType: "fine"})
            });
        });
        
        postFine(transactions)
    }else{
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "Please select both members and fines",
            timer: 5000
          })
    }
}

function postFine(transactions){
    fetch("https://paythehippy-app.azurewebsites.net/api/Transaction", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({transactions: transactions})  
        }).then(res => {
            if(res.status !== 200 ){
                cuteToast({
                    type: 'warning', // or 'info', 'error', 'warning',
                    title: "Warning",
                    message: "Something went wrong",
                    timer: 5000
                  })
            }else if(res.status === 200){
                cuteToast({
                    type: 'success', // or 'info', 'error', 'warning',
                    title: "Success",
                    message: "Fines assigned",
                    timer: 5000
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 500);  
            }
        })
}

document.getElementById('date').valueAsDate = new Date()
