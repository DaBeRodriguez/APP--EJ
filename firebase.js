$(document).ready(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyD9slsvBByMNRuMhd3NyrH64fs6BiYJBWA",
    authDomain: "login-2e085.firebaseapp.com",
    projectId: "login-2e085",
    storageBucket: "login-2e085.appspot.com",
    messagingSenderId: "459262184948",
    appId: "1:459262184948:web:b7eefd5044a5ad50fb3da1",
    measurementId: "G-MJSWVQCS7R"
  };

  // No olvidar poner el => Firebase. (antes de "initializeApp")
const app = firebase.initializeApp(firebaseConfig);
  console.log(app);
const db =  firebase.firestore();


})

// Registrar usuarios
$("#registrate").click(function () {
  // capturar email y contraseña

  let nombre = $("#Nombre").val();

  let email = $("#Email1").val();
  let password = $("#Password1").val();

  console.log(email, password);

  // MEtodo FIREBASE Registrar usuarios nuevos
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      Swal.fire(
        'Listo!',
        'Su cuenta a sido creada con éxito',
        // '<a href="index.html">Ir al inicio</a>'      En este punto debo de poner la redireccion
      )
      addNombre(nombre);

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });
})

// Ingresar con cuenta registrada

$("#ingresar").click(function () {
  let email = $("#Email1").val();
  let password = $("#Password1").val();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      location.href = "home.html";
      // alert("hola")

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage)
    });
})

// Cerrar sesion 
$("#salir").click(function () {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "index.html";


  }).catch((error) => {
    // An error happened.
  });

})

// Registrarse con Google
$("#google").click(function () {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...
      window.location.href = "pagina.html";

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});

$("#salir").click(function () {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});


// Actualiza el perfil de un usuario

function addNombre(nombre) {


  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: "Jane Q. User",
    // photoURL: "https://example.com/jane-q-user/profile.jpg"

  }).then(() => {
    // Update successful

    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });

};


// Mostrar usuarios activos

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    var email = user.email;
    var usuario = user.displayName;

    console.log(uid,email.usuario);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// CREAR PUBLICAIONES
$("#publicar").click(function (e) {
 e.preventDefault();
let post = $("#texto");val();

const user = firebase.auth().currentUser;
db.collection("posteos").add({
 _publicacion:post,
_idUser:user.iud,
 _nombreUser:user.displayName, 
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
})





// Actualizar nombre por opciones

// $("#actualizar_nombre").click(function () {
//   alert("hola");
// let usuario = $("#Nombre").val();
//   const user = firebase.auth().currentUser;

  // user.updateProfile({ 
  //   displayName: usuario,
  //   // photoURL: "https://example.com/jane-q-user/profile.jpg"

  // }).then(() => {
  //   // Update successful
  // alert("hola");
  //   // ...
  // }).catch((error) => {
  //   // An error occurred
  //   // ...
  // });









