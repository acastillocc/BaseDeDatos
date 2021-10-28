var selectedFile;
var selectedFile2;
var alto;
var ancho;
var duraccion;

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

let UserRef = firebase.database().ref("users");
const btnSub = document.getElementById("Btnsend").addEventListener('click', save2send);

function save2send(e) {
  let
    email = document.getElementById("inputEmail4").value,
    password = document.getElementById("inputPassword4").value,
    confirmPassword = document.getElementById("inputPassword4_1").value,
    address = document.getElementById("inputAddress").value,
    city = document.getElementById("inputCity").value,
    state = document.getElementById("inputState").value,
    zip = document.getElementById("inputZip").value,
    imagen = document.getElementById("formFile").value;

  console.log(imagen);
  e.preventDefault();


  if (Validar(email, password, confirmPassword, address, city, state, zip) == true) {
    let newUser = UserRef.push();
    newUser.set({
      email: email,
      password: password,
      address: address,
      // audio: audio,
      // duracion:duraccion,
      URL: imagen,
      city: city,
      state: state,
      zip: zip,
      // Alto: alto,
      // Ancho: ancho,
      // Rojo:r,
      // Verde:g,
      // Azul:b
    });
    uploadFile();
    console.log(uploadFile());
    //Reset form
    document.getElementById("formulario").reset();
    // document.getElementById("Dpreview").style.display="none";
    alert("Su imagen fue registrada exitosamente");
    signUp(email, password);
    //location.href="./Admin.html"
  } else {
    alert("Sus datos estan mal digilenciados");
    // document.getElementById("ColorR").focus();
    // document.getElementById("ColorR").value="";
    // document.getElementById("ColorG").value="";
    // document.getElementById("ColorB").value=""  ;
  }
}

document.getElementById("formFile").addEventListener("change", function (event) {
  selectedFile = event.target.files[0];
  if (selectedFile.length == 0 || !(/\.(jpg|png|jpeg)$/i).test(selectedFile.name)) {
    alert('Ingrese una imagen con alguno de los siguientes formatos: .jpeg/.jpg/.png.');
    document.getElementById("formulario").reset();
  } else {
    document.getElementById("Dpreview").style.display = "block";

    var img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = function () {
      ancho = this.width;
      alto = this.height;
    };
    var file = document.getElementById("formFile").files;
    if (file.length > 0) {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        document.getElementById("preview").setAttribute("src", event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    }
  }


})

function Validar(email, password, confirmPassword, address, city, state, zip) {
  if (
    email.length == 0 ||
    password.length == 0 ||
    confirmPassword.length == 0 ||
    address.length == 0 ||
    city.length == 0 ||
    state.length == 0 ||
    zip.length == 0
  ) {
    console.log("Llene todos los campos");
    return false;
  } else {
    if (password === confirmPassword) {
      // validateFile(imagen);
      // if(validation(email, password)){
      // console.log("Mal email, contra");
      // return false;
      // }
      if(validation(email, password)==true){
        return true;
      }
    } else {
      alert("Su contraseña no es igual");
      return false;
    }
  }
}

function uploadFile() {
  var filename = selectedFile.name;
  // var filename2 = selectedFile2.name;
  var storageRef = firebase.storage().ref("/imagenes/" + filename);
  // var storageRef2 = firebase.storage().ref("/Audios/" + filename2);


  var uploadTask = storageRef.put(selectedFile);
  // var uploadTask2=storageRef2.put(selectedFile2);

  uploadTask.on('state_changed', function (snapshot) {

  }, function (error) {

  }, function () {

    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);
  });

  // uploadTask2.on('state_changed',function(snapshot){

  // },function(error) { 

  // },
  // function(){

  //   var downloadURL=uploadTask2.snapshot.downloadURL;
  //   console.log(downloadURL);
  // }
  // );

}

function signUp(email, password){
   
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch((error) => {
      document.getElementById("error").innerHTML = error.message;
      alert("Error");
  });
}

function validation(email, password) {
  var error = true;
  //email
  var expEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  var esValido = expEmail.test(email);
  if (esValido == true) {
    console.log("El correo es valido");
  } else {
    alert("El correo no es valido");
    error = false;
    // return false;
  }
  //password
  var expPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
  var esvalidoP = expPass.test(password);
  if (esvalidoP == true) {
    console.log("Contraseña correcta");

  } else {
    alert("Tu contraseña no es segura");
    error = false;
    // error = true;
    // return false;
  }
  return error;
}