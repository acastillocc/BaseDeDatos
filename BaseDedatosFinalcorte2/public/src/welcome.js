firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("login.html")
    }else{
        document.getElementById("user").innerHTML = "¡Bienvenido, "+user.email +"!";
    }
})


function logout(){
    firebase.auth().signOut();
}