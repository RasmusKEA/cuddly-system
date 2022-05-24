if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

if(session.role !== "admin"){
    document.getElementById("currency").style.display = "none"
    document.getElementById("change-admin-password").style.display = "none"
    document.getElementById("change-member-password").style.display = "none"
    document.getElementById("new-season").style.display = "none"
    document.getElementById("export-team-info").style.display = "none"
    document.getElementById("team-settings").style.display = "none"
}


document.getElementById("log-out").onclick = function() {logout()};
function logout(){
    localStorage.removeItem("session")
    window.location = "/"

}

document.getElementById("payment").onclick = function() {payment()}
function payment(){
    window.location = "/payment"
}

document.getElementById("monthly").onclick = function() {monthly()}
function monthly(){
    window.location = "/monthly"
}

document.getElementById("new-season").onclick = function() {newSeason()}
function newSeason(){
console.log(session.accessToken)
    cuteAlert({
        type: 'question',
        title: 'New season',
        message: 'Are you sure blah blah',
        confirmText: "I am sure!",
        cancelText: "Do not reset"
    }).then((e) => {
        if(e == "confirm"){
            fetch("http://192.168.0.107:5000/api/User/reset", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" }   
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
                    message: "Season reset",
                    timer: 5000
                  })
            }
        })
    }
    })
}