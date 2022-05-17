if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))

fetch(`http://192.168.0.107:5000/api/User/${session.id}`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        //toast here
        localStorage.removeItem("session")
        window.location = "/"
        throw Error("Unauthorized")
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
    }

    if(session.role !== "admin" && json.mobilePayActive === true){
        document.getElementById("deposit-btn").style.display = "block"
    }    
});

fetch(`http://192.168.0.107:5000/api/Member`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${session.accessToken}`,
        "Content-type": "application/json; charset=UTF-8" },  
}).then(res => {
    if(res.status !== 200 ){
        //toast here
        localStorage.removeItem("session")
        window.location = "/"
        throw Error("Unauthorized")
    }
    return res.json()
}).then(res => {
    let deposits = res.members.reduce((prev, curr) => prev + curr.deposits, 0)
    let fines = res.members.reduce((prev, curr) => prev + curr.fines, 0)
    document.getElementById("fines-assigned").innerHTML = `${fines ? fines : 0} ${session.currency ? session.currency : "DKK"}`
    document.getElementById("deposits").innerHTML = `${deposits ? deposits : 0} ${session.currency ?  session.currency : "DKK"} already paid`
    console.log(session)
});

function settingsButton() {
    window.location = "/settings"
}

function activityButton(){
    window.location = "/activity"
}

document.getElementById("settings-button").addEventListener("click", settingsButton)
document.getElementById("activity-button").addEventListener("click", activityButton)