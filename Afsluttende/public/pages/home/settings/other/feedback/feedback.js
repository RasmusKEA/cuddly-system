if(localStorage.getItem("session") === null){
    window.location = "/"
}
let session = JSON.parse(localStorage.getItem("session"))

let hide = document.getElementById("hide")
let buttons = document.querySelectorAll('.grade-button')

buttons.forEach(button => {
    button.addEventListener('click', (event) =>{
        hide.style.visibility="visible"
        localStorage.setItem("grade", button.value)
    })
    
});

document.getElementById('submit').onclick = function(){
    console.log(localStorage.getItem('grade'))
    fetch("https://paythehippy-app.azurewebsites.net/api/Feedback", {
        method: "POST",
        headers: { 'Authorization': `Bearer ${session.accessToken}`,
            "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            grade: localStorage.getItem('grade'),
            description: document.getElementById('input').value
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
                message: "Feedback sent",
                timer: 5000
              })
        }
    })
}