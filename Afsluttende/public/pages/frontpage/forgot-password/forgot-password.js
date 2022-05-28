document.getElementById('confirm-btn').onclick = function(){
    fetch("http://192.168.0.107:5000/api/User/forgot-password", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            email: document.getElementById('email').value,
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
                message: "Reset password mail sent",
                timer: 5000
              })
              setTimeout(() => {
                  window.location = '/'
              }, 750);
        }
    })
}