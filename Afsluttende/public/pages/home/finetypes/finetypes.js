if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

fetch(`http://192.168.0.107:5000/api/Fine`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "Something went wrong",
            timer: 5000
        })
        
        setTimeout(() => {
            localStorage.removeItem("session")
            window.location = "/"
        }, 750);
    }
    return res.json()
}).then(json => {
    console.log(json.fines)
    populateFineTypes(json.fines)
})


function populateFineTypes(fines){
    let leftDiv = document.getElementById('left-div')

    fines.forEach(fine => {
        if(fine.name !== "Recurring Fine"){
            let fineDiv = document.createElement('div')
            fineDiv.className = 'fine-div'
            fineDiv.id = fine.id
    
            let innerLeft = document.createElement('div')
            innerLeft.className = 'inner-left'
    
            let fineName = document.createElement('p')
            fineName.className = 'fine-name'
            fineName.innerHTML = fine.name
    
            innerLeft.append(fineName)
            let innerRight = document.createElement('div')
            innerRight.className = 'inner-right'
    
            let fineAmount = document.createElement('p')
            fineAmount.className = 'fine-amount'
            fineAmount.innerHTML = fine.amount
            innerRight.append(fineAmount)
    
            fineDiv.append(innerLeft)
            fineDiv.append(innerRight)
            leftDiv.append(fineDiv)
        }
    });

    let fineDiv = document.querySelectorAll('.fine-div')
    fineDiv.forEach(div => {
        div.addEventListener('click', (event) =>{
            fetch(`http://192.168.0.107:5000/api/Fine/${div.id}`, {
                method: "GET",
                headers: { 
                    'Authorization': `Bearer ${session.accessToken}`,
                     "Content-type": "application/json; charset=UTF-8" },  
                }).then(res => {
                    if(res.status !== 200 ){
                        cuteToast({
                            type: 'warning', // or 'info', 'error', 'warning',
                            title: "Warning",
                            message: "Something went wrong",
                            timer: 5000
                        })
                        
                        setTimeout(() => {
                            localStorage.removeItem("session")
                            window.location = "/"
                        }, 750);
                }
                    return res.json()
                }).then(json => {
                    populateEditFine(json)
                })
        })
    })
}

function populateEditFine(json){
    let rightDiv = document.getElementById('right-div')
    removeAllChildNodes(rightDiv)

    let editFine = document.createElement('div')
    editFine.className = 'edit-fine'
    editFine.id = json.id

    let fineNameInput = document.createElement('input')
    fineNameInput.type = 'text' 
    fineNameInput.className = 'input'
    fineNameInput.id = "fine-name"
    fineNameInput.value = json.name

    let fineAmountInput = document.createElement('input')
    fineAmountInput.type = 'number' 
    fineAmountInput.className = 'input'
    fineAmountInput.id = "fine-amount"
    fineAmountInput.value = json.amount

    let buttonDiv = document.createElement('div')
    buttonDiv.className = 'button-div'

    let updateButton = document.createElement('button')
    updateButton.id = 'update-btn'
    updateButton.className = 'confirm-btn'
    updateButton.innerHTML = 'Update'
    updateButton.onclick = function(){
        updateFineType(json.id)
    }

    let deleteButton = document.createElement('button')
    deleteButton.id = 'delete-btn'
    deleteButton.className = 'confirm-btn'
    deleteButton.innerHTML = 'Delete'
    deleteButton.onclick = function(){
        deleteFineType(json.id)
    }

    editFine.append(fineNameInput)
    editFine.append(fineAmountInput)
    editFine.append(updateButton)
    editFine.append(deleteButton)
    rightDiv.append(editFine)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateFineType(id){
    fetch(`http://192.168.0.107:5000/api/Fine/${id}`, {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById('fine-name').value,
            amount: document.getElementById('fine-amount').value,
        })   
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
                message: "Update succesful",
                timer: 5000
              })

              setTimeout(() => {
                location.reload()
              }, 500);  
        }   
    })
}

function deleteFineType(id){
    fetch(`http://192.168.0.107:5000/api/Fine/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
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
                message: "Delete succesful",
                timer: 5000
              })
              setTimeout(() => {
                location.reload()
              }, 500);  
        }   
    })
}

document.getElementById('add-btn').onclick = function(){window.location = '/finetypes/add'}