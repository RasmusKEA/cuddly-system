if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

document.getElementById('confirm-btn').onclick = function(){
    fetch("http://192.168.0.107:5000/api/Fine", {
        method: "POST",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById('fine-name').value,
            amount: document.getElementById('fine-amount').value
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
                message: "Fine type created",
                timer: 5000
              })
              setTimeout(() => {
                  window.location = '/finetypes'
              }, 750);
        }
    })
}