if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

window.onload = function() {
    document.getElementById("checkbox").checked = true;
}

fetch(`http://192.168.0.107:5000/api/RecurringFine
`, {
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
}).then(res => {
    console.log(res.recurringFines)
    populateRecurringFine(res.recurringFines)
});

function populateRecurringFine(data){

    let leftDiv = document.getElementById("left")

    data.forEach(element => {
        let recurringFineDiv = document.createElement("div")
        recurringFineDiv.className = "recurring-fine"
        recurringFineDiv.id = `${element.id}-div`

        let innerLeft = document.createElement("div")
        innerLeft.className = "inner-left"
        let fineTitle = document.createElement("p")
        fineTitle.className = "fine-title"
        fineTitle.innerHTML = element.name
        let nextDate = document.createElement("p")
        nextDate.className = "next-date"
        nextDate.innerHTML = moment(element.nextDate).format('DD MMM YYYY')

        innerLeft.append(fineTitle)
        innerLeft.append(nextDate)

        let innerRight = document.createElement("div")
        innerRight.className = "inner-right"
        
        let amount = document.createElement("p")
        amount.className = "amount"
        amount.innerHTML = element.amount

        let deleteBtn = document.createElement("button")
        deleteBtn.className = "delete-btn"
        deleteBtn.id = element.id

        let image = document.createElement("img")
        image.className = "delete-image"
        image.setAttribute("src", "./global/delete.png")

        deleteBtn.append(image)

        innerRight.append(amount)
        innerRight.append(deleteBtn)

        recurringFineDiv.append(innerLeft)
        recurringFineDiv.append(innerRight)
        leftDiv.append(recurringFineDiv)

    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener('click', event => {
            deleteRecurringFine(btn.id)
        })
    })
}

document.getElementById("submit").onclick = function(){
    console.log(document.getElementById("name").value)
    console.log(document.getElementById("amount").value)
    console.log(document.getElementById("name").value)
    console.log(document.getElementById("date").value)
    console.log(document.getElementById("checkbox").checked)


    fetch("http://192.168.0.107:5000/api/RecurringFine", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(
                    {
                        name: document.getElementById("name").value,
                        amount: document.getElementById("amount").value,
                        startDate: document.getElementById("date").value,
                    }
                )  
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
                    message: "Recurring fine registered",
                    timer: 5000
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 750);
            }
            return res.json()
        })
}

function deleteRecurringFine(id) {
    fetch(`http://192.168.0.107:5000/api/RecurringFine/${id}`, {
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
        }else if(res.status === 200){
            cuteToast({
                type: 'success', // or 'info', 'error', 'warning',
                title: "Success",
                message: "Recurring fine deleted",
                timer: 5000
              })
            removeAllChildNodes(document.getElementById(`${id}-div`))
        }
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.getElementById('date').valueAsDate = new Date()