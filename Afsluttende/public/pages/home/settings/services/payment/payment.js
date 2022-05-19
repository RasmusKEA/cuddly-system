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
    if(json.phoneNumber !== null){
        document.getElementById("phonenumber").value = json.phoneNumber
    }

    if(json.countryCode !== null){
        document.getElementById("countrycode").value = json.countryCode   
    }

    if(json.mobilePayActive !== false){
        document.getElementById("checkbox").checked = true
    }else{
        document.getElementById("checkbox").checked = false
    }

});

function checkCheckbox() {  
    var checkbox = document.getElementById("checkbox");  
    
    fetch("http://192.168.0.107:5000/api/User", {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            mobilePayActive : checkbox.checked
        })  
    }).then(res => {
        if(res.status !== 200 ){
            //toast here
            throw Error("Incorrect login credentials")
        }else if(res.status === 200){
        }
        return res.json()
    })
  }  

  document.getElementById("submit").onclick = function(){
    fetch("http://192.168.0.107:5000/api/User", {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            phoneNumber : document.getElementById("phonenumber").value,
            countryCode : document.getElementById("countrycode").value
        })  
    }).then(res => {
        if(res.status !== 200 ){
            //toast here
            throw Error("Incorrect login credentials")
        }else if(res.status === 200){
        }
        return res.json()
    })
  }
