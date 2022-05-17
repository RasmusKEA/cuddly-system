function createUser() {
    if(document.getElementById("email").value !== '' && document.getElementById("admin-password").value !== '' && document.getElementById("team-password").value !== ''){
        fetch("http://192.168.0.107:5000/api/User", {
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
                //toast here
                throw Error("Credentials not correct")
            }else if(res.status === 200){
                window.location = '/home'
            }
            return res.json()
        })
        .then(res => {
            localStorage.setItem("session", JSON.stringify(res))
        });
    }else{
        window.alert("You need to fill out all fields in order to register")
    }
}  

document.getElementById("send-button").addEventListener("click", createUser)