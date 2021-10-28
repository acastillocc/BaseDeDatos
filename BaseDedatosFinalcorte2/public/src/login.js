var config = {
    apiKey: "AIzaSyDa46rpbjR4KnrHgvY9eLggYnkoGWxoLNQ",
    authDomain: "basedatos-38951.firebaseapp.com",
    databaseURL: "https://basedatos-38951-default-rtdb.firebaseio.com",
    projectId: "basedatos-38951",
    storageBucket: "basedatos-38951.appspot.com",
    messagingSenderId: "596371466581",
    appId: "1:596371466581:web:028fd2862964a1fd26e7dc",
    measurementId: "G-S58Y2HJ9BD"
  };
  // Initialize Firebase
  
  firebase.initializeApp(config);

document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})



function login(){
    const email = document.getElementById("UserEmail").value;
    const password = document.getElementById("UserPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password);

    
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            location.replace("usuario.html")
        }
    })
    
}

function forgotPass(){
    const email = document.getElementById("UserEmail").value;
    firebaseui.auth().sendPasswordResetEmail("UserPassword")
    .then(() => {
        alert("Reset link sent to your email id");
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message;
        alert("Entró error");
    });
}