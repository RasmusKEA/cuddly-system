if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

let currencyId;
let currencyBtn = document.querySelectorAll('.currency-selector')

fetch(`http://192.168.0.107:5000/api/User/${session.id}`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        localStorage.removeItem("session")
        window.location = '/'
        cuteToast({
            type: 'error', // or 'info', 'error', 'warning',
            title: "Error",
            message: "You do not have access to this page",
            timer: 5000
          })
    }
    return res.json()
}).then(res => {
    document.getElementById(`${res.currency}`).className = 'currency-selector active'

});

currencyBtn.forEach(btn => {
    btn.className = 'currency-selector'
    btn.addEventListener('click', (event) => {
        currencyId = btn.id
        currencyBtn.forEach(element => {
            element.className = 'currency-selector'
        });
        btn.className = 'currency-selector active'

    })
})


document.getElementById('confirm-btn').onclick = function(){
    fetch("http://192.168.0.107:5000/api/User", {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({currency: currencyId})   
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
                message: "Currency saved",
                timer: 5000
              })
              setTimeout(() => {
                window.location = '/home'
            }, 750);
        }
        return res.json()
    })
}