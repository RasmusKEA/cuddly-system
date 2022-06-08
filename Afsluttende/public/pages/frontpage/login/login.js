if(localStorage.getItem("session") != null){
    window.location = "/home"
}

function loginUser() {
    if(document.getElementById("email").value !== '' && document.getElementById("password").value !== ''){
        fetch("https://paythehippy-app.azurewebsites.net/api/User/authenticate", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                deviceUuid: "Browser",
                systemVersion: "Browser",
                deviceModel: "Browser",
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })  
        }).then(res => {
            if(res.status !== 200 ){
                cuteToast({
                    type: 'warning', // or 'info', 'error', 'warning',
                    title: "Warning",
                    message: "Incorrect login credentials",
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

document.getElementById("send-button").addEventListener("click", loginUser)