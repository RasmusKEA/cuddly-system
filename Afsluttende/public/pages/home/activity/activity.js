if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

fetch(`https://paythehippy-app.azurewebsites.net/api/Transaction`, {
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
    let months = []
    let prev

    json.transactions.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

        json.transactions.forEach(element => {
            if(prev !== moment(element.date).format('MMMM [\']YY')){
                months.push(moment(element.date).format('MMMM [\']YY'))
                prev = moment(element.date).format('MMMM [\']YY');
            }
        });

        const buttonRow = document.getElementById("horizontal-div")
        months.forEach(month => {
            let btn = document.createElement("button")
            btn.innerHTML = `${month}`
            btn.className = "activity-btn"
            btn.id = month
            buttonRow.append(btn)
        });

        populateActivity(json.transactions)
        document.getElementById("all-btn").style.opacity = "50%"

        document.querySelectorAll('.activity-btn').forEach(item => {
            item.addEventListener('click', event => {
                if(item.id !== "all-btn"){
                    document.getElementById("all-btn").style.opacity = "100%"
                }else{
                    document.getElementById("all-btn").style.opacity = "50%"
                }
                let data = []
                json.transactions.forEach(i => {
                    if(item.id === "all-btn"){
                        data.push(i)
                    }
                    if(moment(i.date).format('MMMM [\']YY') === item.id){
                        data.push(i)
                    }
                })   
                let element = document.getElementById("transaction-div")
                removeAllChildNodes(element)
                populateActivity(data)
                data = []
            })
        })
});

function populateActivity(data) {
    console.log(data)
    const transactionRow = document.getElementById("transaction-div")
    data.forEach(transaction => {
        let transWrap = document.createElement("div")
        transWrap.className = "trans-wrap"
        transWrap.id = `${transaction.id}-div`

        let left = document.createElement("div")
        left.className = "left"
        let leftSpan = document.createElement("span")
        let leftSpan1 = document.createElement("span")
        if(transaction.transactionType === "withdraw"){
            leftSpan1.innerHTML = 'Withdraw'
        }else{
            leftSpan1.innerHTML = `${transaction.member.name}`
        }
        leftSpan.innerHTML = `${transaction.name} <br>`
        leftSpan1.style.opacity = 0.5
        

        left.append(leftSpan)
        left.append(leftSpan1)

        let right = document.createElement("div")
        right.className = "right"
        let rightSpan = document.createElement("span")
        let rightSpan1 = document.createElement("span")
        rightSpan.innerHTML = `${transaction.amount} <br> `
        rightSpan1.innerHTML = `${moment(transaction.date).format('D MMMM YYYY')}`
        rightSpan1.style.opacity = 0.5

        if(transaction.transactionType === "deposit"){
            rightSpan.style.color = "#6ebba8"
        }else if(transaction.transactionType === "fine"){
            rightSpan.style.color = "#df5c60"
        }else{
            rightSpan.style.color = "#d0c77c"
        }

        let spanDiv = document.createElement("div");

        let deleteBtn = document.createElement("button")
        deleteBtn.className = "delete-btn"
        deleteBtn.id = transaction.id

        let deleteImg = document.createElement("img")
        deleteImg.className = "delete-img"
        deleteImg.setAttribute("src", "./global/delete.png")

        deleteBtn.append(deleteImg)

        spanDiv.append(rightSpan)
        spanDiv.append(rightSpan1)

        right.append(spanDiv)
        right.append(deleteBtn)

        transWrap.append(left)
        transWrap.append(right)
        transactionRow.appendChild(transWrap)
    })

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener('click', event => {
            deleteTransaction(btn.id)
        })
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function deleteTransaction(id) {
        fetch(`https://paythehippy-app.azurewebsites.net/api/transaction/${id}`, {
            method: "DELETE",
            headers: { 
                'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" }
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
            }else if(res.status === 200){
                cuteToast({
                    type: 'success', // or 'info', 'error', 'warning',
                    title: "Success",
                    message: "Transaction deleted",
                    timer: 5000
                })
                
                removeAllChildNodes(document.getElementById(`${id}-div`))
            }
        })
}