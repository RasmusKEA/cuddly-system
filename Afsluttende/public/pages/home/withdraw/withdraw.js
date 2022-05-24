if(localStorage.getItem("session") === null){
    window.location = "/"
}
let session = JSON.parse(localStorage.getItem("session"))

document.getElementById('confirm-btn').onclick = function(){
    console.log('test')
    fetch("http://192.168.0.107:5000/api/Transaction/withdraw", {
        method: "POST",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            amount: document.getElementById('amount').value,
            name: document.getElementById('withdraw-name').value
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
                message: "Withdrawal registered",
                timer: 5000
              })
        }
        return res.json()
    })
}

document.getElementById('date').valueAsDate = new Date()