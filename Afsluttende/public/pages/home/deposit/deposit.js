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
    }
    return res.json()
}).then(res => {
    console.log(res)
    populateCheckbox(res.members)

});

function populateCheckbox(data) {
    let checkboxDiv = document.getElementById('left')

    data.forEach(element => {
        let label = document.createElement('label')
        label.className = 'container'
        label.innerHTML = element.name

        let input = document.createElement('input')
        input.type = 'checkbox'
        input.className = "select-all-members"
        input.id = element.id
        label.append(input)

        let checkmark = document.createElement('span')
        checkmark.className = 'checkmark'
        label.append(checkmark)

        checkboxDiv.append(label)
    });
}

document.getElementById('select-all').onclick = function() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
}

document.getElementById('confirm-btn').onclick = function(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];

    for (let checkbox of checkboxes) {
        if(checkbox.checked && checkbox.id !== "select-all"){
            checked.push(checkbox.id)
        }
    }

    if(checkboxes.length !== 0){
        let members = []
        checked.forEach(member => {
            members.push({
                amount: document.getElementById('amount').value,
                date: document.getElementById('date').value,
                name: document.getElementById('deposit-name').value,
                transactionType: "deposit",
                memberId: member
            })
        }); 
        postDeposit(members)
    }
}

function postDeposit(members){
    if(document.getElementById('amount').value !== ''){
        fetch("https://paythehippy-app.azurewebsites.net/api/Transaction", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({transactions: members})   
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
                    message: "Deposits registered",
                    timer: 5000
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 500);  
            }
        })
    }else{
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "You need to fill in all fields",
            timer: 5000
          })
    }
    
}

document.getElementById('deposit-name').value = "Deposit"
document.getElementById('date').valueAsDate = new Date()



