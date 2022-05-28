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
        //toast here
        localStorage.removeItem("session")
        window.location = "/"
        throw Error("Unauthorized")
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
        recurringFineDiv.id = element.id

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

        let image = document.createElement("img")
        image.className = "delete-image"
        image.setAttribute("src", "./global/delete.png")

        innerRight.append(amount)
        innerRight.append(image)

        recurringFineDiv.append(innerLeft)
        recurringFineDiv.append(innerRight)
        leftDiv.append(recurringFineDiv)

    });
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
                //toast here
                throw Error("Incorrect login credentials")
            }else if(res.status === 200){
                //toast confirm here
            }
            return res.json()
        })
    
}

document.getElementById('date').valueAsDate = new Date()