if(localStorage.getItem("session") === null){
    window.location = "/"
}
let session = JSON.parse(localStorage.getItem("session"))

fetch(`https://paythehippy-app.azurewebsites.net/api/User/${session.id}`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "Something went wrong",
            timer: 5000
          })
        setTimeout(() => {
            localStorage.removeItem("session")
            window.location = "/"
        }, 750);
        
    }
    return res.json()
}).then(json => {
    if(json.teamName === null){
        document.getElementById("team-name").innerHTML = "Team name"
    }else{
        document.getElementById("team-name").innerHTML = json.teamName
    }

    if(json.teamLogo === null){
        document.getElementById("team-logo").setAttribute("src", "https://cdn-icons-png.flaticon.com/512/171/171561.png")    
    }else{
        document.getElementById("team-logo").src = json.teamLogo
    }

    if(session.role !== "admin"){
        document.getElementById("withdraw-btn").style.display = "none"
        document.getElementById("deposit-btn").style.display = "none"
        document.getElementById("assign-btn").style.display = "none"
        
    }  
});

fetch(`https://paythehippy-app.azurewebsites.net/api/Member`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        cuteToast({
            type: 'warning', // or 'info', 'error', 'warning',
            title: "Warning",
            message: "Something went wrong",
            timer: 5000
        })

        setTimeout(() => {
            localStorage.removeItem("session")
            window.location = "/"
        }, 750);
    }
    return res.json()
}).then(res => {
    let deposits = res.members.reduce((prev, curr) => prev + curr.deposits, 0)
    let fines = res.members.reduce((prev, curr) => prev + curr.fines, 0)
    document.getElementById("fines-assigned").innerHTML = `${fines ? fines : 0} ${session.currency ? session.currency : "DKK"}`
    document.getElementById("deposits").innerHTML = `${deposits ? deposits : 0} ${session.currency ?  session.currency : "DKK"} already paid`
    console.log(session)
});

if(session.role === 'admin'){
    document.querySelector('.header-row').onclick = function(){
        window.location = '/profile'
    }
}

document.getElementById("settings-button").onclick = function(){window.location = "/settings"}
document.getElementById("activity-button").onclick = function(){window.location = "/activity"}
document.getElementById('deposit-btn').onclick = function(){window.location = '/deposit'}
document.getElementById('assign-btn').onclick = function(){window.location = '/assign'}
document.getElementById('withdraw-btn').onclick = function(){window.location = '/withdraw'}
document.getElementById('members-button').onclick = function(){window.location = '/members'}
document.getElementById('finetypes-button').onclick = function(){window.location = '/finetypes'}