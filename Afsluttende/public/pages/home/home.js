if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = localStorage.getItem("session")
let jsonSes = JSON.parse(session)
console.log(jsonSes)

fetch(`http://192.168.0.107:5000/api/User/${jsonSes.id}`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${jsonSes.accessToken}`,
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
    console.log(json.teamName)
    document.getElementById("team-name").innerHTML = json.teamName
    document.getElementById("team-logo").src = json.teamLogo
});

