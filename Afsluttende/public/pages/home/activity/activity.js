if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

fetch(`http://192.168.0.107:5000/api/Transaction`, {
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
    const transactionRow = document.getElementById("transaction-div")
    data.forEach(transaction => {
        let transWrap = document.createElement("div")
        transWrap.className = "trans-wrap"

        let left = document.createElement("div")
        left.className = "left"
        let leftSpan = document.createElement("span")
        let leftSpan1 = document.createElement("span")
        if(transaction.transactionType === "Withdraw"){
            leftSpan1.innerHTML = `${transaction.transactionType}`
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

        right.append(rightSpan)
        right.append(rightSpan1)

        transWrap.append(left)
        transWrap.append(right)
        transactionRow.appendChild(transWrap)
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}