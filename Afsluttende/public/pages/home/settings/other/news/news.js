if(localStorage.getItem("session") === null){
    window.location = "/"
}

let session = JSON.parse(localStorage.getItem("session"))
