if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

document.getElementById('confirm-btn').onclick = function(){
    fetch("https://paythehippy-app.azurewebsites.net/api/Member", {
        method: "POST",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById('member-name').value,
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
                message: "Member created",
                timer: 5000
              })
              setTimeout(() => {
                  window.location = '/members'
              }, 750);
        }
    })
}