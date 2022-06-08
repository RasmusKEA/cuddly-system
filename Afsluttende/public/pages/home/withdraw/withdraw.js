let session = JSON.parse(localStorage.getItem("session"))
if(session === null){
    window.location = "/"
}else if(session.role !== "admin"){
    window.location = "/home"
}

document.getElementById('confirm-btn').onclick = function(){
    if(document.getElementById('withdraw-name').value !== '' || document.getElementById('amount').value !== ''){
        fetch("https://paythehippy-app.azurewebsites.net/api/Transaction/withdraw", {
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
                  setTimeout(() => {
                      location.href = '/'
                  }, 500);
            }
        })
    }else{
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "You need to fill in all fields",
            timer: 5000
          })
    }
}

document.getElementById('date').valueAsDate = new Date()