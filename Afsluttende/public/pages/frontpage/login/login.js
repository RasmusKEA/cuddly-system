if(localStorage.getItem("session") != null){
    window.location = "/home"
}

function loginUser() {
    if(document.getElementById("email").value !== '' && document.getElementById("password").value !== ''){
        fetch("http://192.168.0.107:5000/api/User/authenticate", {
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
                //toast here
                throw Error("Incorrect login credentials")
            }else if(res.status === 200){
                window.location = '/home'
            }
            return res.json()
        })
        .then(res => {
            localStorage.setItem("session", JSON.stringify(res))
            //let session = localStorage.getItem("session")
            //let jsonSes = JSON.parse(session)
            //console.log(jsonSes.accessToken)
        });
    }else{
        window.alert("You need to fill out all fields before trying to login")
    }

}  

document.getElementById("send-button").addEventListener("click", loginUser)