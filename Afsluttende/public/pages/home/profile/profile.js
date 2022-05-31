let session = JSON.parse(localStorage.getItem("session"))
if(session === null || session.role !== 'admin'){
    window.location = '/'
}

let currentTeamName;

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
    document.getElementById('team-name').value = res.teamName
    currentTeamName = res.teamName

});

document.getElementById('confirm-btn').onclick = function(){
    if(document.getElementById('image').value !== ''){
        let file = document.querySelector('#image')
        let formData = new FormData()
        formData.append('img', file.files[0])

        fetch("http://192.168.0.107:5000/api/User/upload", {
            method: "POST",
            headers: { 'Authorization': `Bearer ${session.accessToken}`},
            body: formData
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
                    message: "Team logo saved",
                    timer: 5000
                  })
            }
        })
    }

    if(document.getElementById('team-name').value !== "" && document.getElementById('team-name').value !== currentTeamName){
        fetch("http://192.168.0.107:5000/api/User", {
            method: "PATCH",
            headers: { 'Authorization': `Bearer ${session.accessToken}`,
                "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({teamName: document.getElementById('team-name').value})   
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
                    message: "Team name saved",
                    timer: 5000
                  })
            }
            return res.json()
        })
    }

}