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
}).then(json => {
    populateMembers(json.members)
})

function populateMembers(members){
    let leftDiv = document.getElementById('left-div')

    members.forEach(member => {
        let memberDiv = document.createElement('div')
        memberDiv.className = 'member-div'
        memberDiv.id = member.id

        let innerLeft = document.createElement('div')
        innerLeft.className = 'inner-left'

        let memberName = document.createElement('p')
        memberName.className = 'member-name'
        memberName.innerHTML = member.name

        let memberBalance = document.createElement('p')
        memberBalance.className = 'member-balance'
        if(member.fines - member.deposits >= 0){
            memberBalance.innerHTML = `Owes ${member.fines - member.deposits} ${session.currency}`
        }else{
            memberBalance.innerHTML = `Paid ${(member.fines - member.deposits)*-1} ${session.currency} too much`
        }

        innerLeft.append(memberName)
        innerLeft.append(memberBalance)

        let innerRight = document.createElement('div')
        innerRight.className = 'inner-right'

        let fineAmount = document.createElement('p')
        fineAmount.className = 'fine-amount'
        fineAmount.innerHTML = member.fines

        let depositAmount = document.createElement('p')
        depositAmount.className = 'deposit-amount'
        depositAmount.innerHTML = member.deposits

        innerRight.append(fineAmount)
        innerRight.append(depositAmount)

        memberDiv.append(innerLeft)
        memberDiv.append(innerRight)
        leftDiv.append(memberDiv)
    })

    let memberDiv = document.querySelectorAll('.member-div')
    memberDiv.forEach(div => {
        div.addEventListener('click', (event) => {
            fetch(`http://192.168.0.107:5000/api/Member/${div.id}`, {
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
                }).then(json => {
                    populateMemberDetails(json)
                })
        })
    })
}

function populateMemberDetails(json){
    
    let rightDiv = document.getElementById('right-div')
    removeAllChildNodes(rightDiv)

    let editMember = document.createElement('div')
    editMember.className = 'edit-member'
    editMember.id = json.id

    let memberNameInput = document.createElement('input')
    memberNameInput.type = 'text' 
    memberNameInput.className = 'input'
    memberNameInput.id = "member-name"
    memberNameInput.value = json.name

    let buttonDiv = document.createElement('div')
    buttonDiv.className = 'button-div'

    let updateButton = document.createElement('button')
    updateButton.id = 'update-btn'
    updateButton.className = 'button'
    updateButton.innerHTML = 'Update'
    updateButton.onclick = function(){
        updateMember(json.id)
    }

    let deleteButton = document.createElement('button')
    deleteButton.id = 'delete-btn'
    deleteButton.className = 'button'
    deleteButton.innerHTML = 'Delete'
    deleteButton.onclick = function(){
        deleteMember(json.id)
    }

    editMember.append(memberNameInput)
    editMember.append(updateButton)
    editMember.append(deleteButton)
    
    rightDiv.append(editMember)

    json.transactions.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

    json.transactions.forEach(transaction => {
        let memberFines = document.createElement('div')
        memberFines.className = 'member-fines'

        let innerLeft = document.createElement('div')
        innerLeft.className = 'inner-left'

        let fineName = document.createElement('p')
        fineName.className = 'fine-name'
        fineName.innerHTML = transaction.name

        let innerRight = document.createElement('div')
        innerRight.className = 'inner-right'

        let fineAmount = document.createElement('p')
        fineAmount.className = 'fine-amount'
        fineAmount.innerHTML = `${transaction.amount} ${session.currency}`

        if(transaction.transactionType === "deposit"){
            fineAmount.style.color = "#6ebba8"
        }else if(transaction.transactionType === "fine"){
            fineAmount.style.color = "#df5c60"
        }

        let fineDate = document.createElement('p')
        fineDate.className = 'date'
        fineDate.innerHTML = moment(transaction.date).format('DD MMM YYYY')

        innerLeft.append(fineName)
        innerRight.append(fineAmount)
        innerRight.append(fineDate)

        memberFines.append(innerLeft)
        memberFines.append(innerRight)
        
        rightDiv.append(memberFines)
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateMember(id){
    fetch(`http://192.168.0.107:5000/api/Member/${id}`, {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById('member-name').value
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

function deleteMember(id){
    fetch(`http://192.168.0.107:5000/api/Member/${id}`, {
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