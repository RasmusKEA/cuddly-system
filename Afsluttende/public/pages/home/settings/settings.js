let session = localStorage.getItem("session")
let jsonSes = JSON.parse(session)

if(jsonSes.role !== "admin"){
    document.getElementById("currency").style.display = "none"
    document.getElementById("change-admin-password").style.display = "none"
    document.getElementById("change-member-password").style.display = "none"
    document.getElementById("new-season").style.display = "none"
    document.getElementById("export-team-info").style.display = "none"
    document.getElementById("team-settings").style.display = "none"
}