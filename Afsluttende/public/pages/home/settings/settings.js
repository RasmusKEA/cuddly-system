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

document.getElementById("news").onclick = function() {news()}
function news(){
    window.location ="/news"
}

document.getElementById("feedback").onclick = function() {feedback()}
function feedback(){
    window.location ="/feedback"
}

document.getElementById("change-member-password").onclick = function() {member()}
function member(){
    window.location ="/member"
}

document.getElementById("change-admin-password").onclick = function() {admin()}
function admin(){
    window.location ="/admin"
}





    document.getElementById("export-team-info").onclick = function(){exportData()}
    function exportData(){
        console.log(session.accessToken)
        cuteAlert({
            type: 'question',
            title: 'Export file',
        message: "You can export the team's data to and receive it in another format than what you see on the app. You will recieve the exported file to your email",
            confirmText: "Send the file!",
            cancelText: "Do not send"
        }).then((e) => {
            if(e == "confirm"){
                fetch("http://192.168.0.107:5000/api/User/export", {
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
                        message: "Email sent",
                        timer: 5000
                      })
                }
            })
        }
        })
    }

        


document.getElementById("new-season").onclick = function() {newSeason()}
function newSeason(){
console.log(session.accessToken)
    cuteAlert({
        type: 'question',
        title: 'New season',
    message: "Are you sure you want to reset the fine box? Assigned fines and deposits will be deleted, but saves players and fine types. This can't be undone!",
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