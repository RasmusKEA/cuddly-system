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
    
    checked.forEach(member => {
        postDeposit(member)
    });
    
}

function postDeposit(member){

    fetch("http://192.168.0.107:5000/api/Transaction", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                transactions : [
            {
                amount: document.getElementById('amount').value,
                date: document.getElementById('date').value,
                name: document.getElementById('deposit-name').value,
                transactionType: "deposit",
                memberId: member
            }
            ]
            })  
        }).then(res => {
            if(res.status !== 200 ){
                //toast here
                throw Error("Incorrect login credentials")
            }else if(res.status === 200){
                window.location = '/home'
            }
            return res.json()
        })
}

document.getElementById('deposit-name').value = "Deposit"
document.getElementById('date').valueAsDate = new Date()



