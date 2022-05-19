if(localStorage.getItem("session") === null){
    window.location = "/"
}
let session = JSON.parse(localStorage.getItem("session"))

fetch(`http://192.168.0.107:5000/api/Member`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        //toast here
        localStorage.removeItem("session")
        window.location = "/"
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

fetch(`http://192.168.0.107:5000/api/Fine`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        //toast here
        localStorage.removeItem("session")
        window.location = "/"
        throw Error("Unauthorized")
    }
    return res.json()
}).then(res => {
    populateFines(res.fines)
});

function populateFines(data){
    let checkboxDiv = document.getElementById('right')

    data.forEach(element => {

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

    fines.forEach(fine => {
        members.forEach(member => {
            postFine(member, fine)
        });
    });

    

}

function postFine(member, fine){

    fetch("http://192.168.0.107:5000/api/Transaction", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                "transactions": [
                  {
                        date: document.getElementById('date').value,
                        amount: document.getElementById(`${fine}-info`).textContent,
                        memberId: member,
                        id: fine,
                        transactionType: "fine"
                  }
                ]
              })  
        }).then(res => {
            if(res.status !== 200 ){
                //toast here
                throw Error("Unauthorized")
            }else if(res.status === 200){
                
            }
            return res.json()
        })
}

document.getElementById('date').valueAsDate = new Date()
