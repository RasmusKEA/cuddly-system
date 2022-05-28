if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))
let userEmail

fetch(`http://192.168.0.107:5000/api/User/${session.id}`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        localStorage.removeItem("session")
        window.location = "/"
        cuteToast({
            type: 'error', // or 'info', 'error', 'warning',
            title: "Error",
            message: "You do not have access to this page",
            timer: 5000
          })
    }
    return res.json()
}).then(res => {
    userEmail = res.email
});

document.getElementById('submit').onclick = function(){
    if(document.getElementById('new-password').value !== "" && document.getElementById('confirm-password').value !== "" && document.getElementById('new-password').value === document.getElementById('confirm-password').value){
        fetch("http://192.168.0.107:5000/api/User/change-team-password", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                email: userEmail,
                password: document.getElementById('admin-password').value,
                newTeamPassword: document.getElementById('confirm-password').value
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
                    message: "Password changed",
                    timer: 5000
                  })
                setTimeout(() => {
                    window.location = '/'
                }, 2000);
                
            }
        })
    }else{
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "You need to fill out all fields in order to change team password",
            timer: 2500
          })
    }
}