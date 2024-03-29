function createUser() {
    if(document.getElementById("email").value !== '' && document.getElementById("admin-password").value !== '' && document.getElementById("team-password").value !== ''){
        fetch("https://paythehippy-app.azurewebsites.net/api/User", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                deviceUuid: "Browser",
                systemVersion: "Browser",
                deviceModel: "Browser",
                email: document.getElementById("email").value,
                password: document.getElementById("admin-password").value,
                teamPassword: document.getElementById("team-password").value,
                currency: "DKK"
            })  
        }).then(res => {
            if(res.status !== 200 ){
                cuteToast({
                    type: 'warning', // or 'info', 'error', 'warning',
                    title: "Warning",
                    message: "User with this email already exists",
                    timer: 5000
                  })
            }else if(res.status === 200){
                window.location = '/home'
            }
            return res.json()
        })
        .then(res => {
            localStorage.setItem("session", JSON.stringify(res))
        });
    }else{
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "You need to fill out all fields before trying to login",
            timer: 5000
          })
    }
}  

document.getElementById("send-button").addEventListener("click", createUser)