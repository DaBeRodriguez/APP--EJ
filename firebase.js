$(document).ready(function (){
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

// Initialize Cloud Firestore and get a reference to the service
const auth = firebase.auth();

const db = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();

                                              // REGISTRAR USUARIOS NUEVOS

// X CORREO Y CONTRASEÑA
$("#registrate").click(function () {

  let nombre = $("#Nombre").val();
  let email = $("#Email").val();
  let password = $("#Password").val();

  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
     // Signed in
    var user = userCredential.user;

    // alerta de confirmacion:
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
        text: errorMessage, errorMessage
      })
    });
});

// X CUENTA DE GOOGLE
$("#google").click(function (e) {
e.preventDefault

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => { 
    window.location.href = "home.html";
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...

    alert(errorCode,errorMessage,email,credential);
  });
});

                                              // INGRESAR CON CUENTA 

//X CUENTA REGISTRADA
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

// CERRAR SESION
$("#salir").click(function () {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    alert("CERRARAS SESION ");
    // window.location.href = "index.html";

  }).catch((error) => {
    // An error happened.
  });

})


// Actualiza el perfil de un usuario

function addNombre(nombre) {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: nombre,
    // photoURL: "https://example.com/jane-q-user/profile.jpg"

  }).then(() => {
    // Update successful
alert("El nombre ya se cambio")
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

    console.log(uid,email,usuario);
      obtenerDatos()
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function obtenerDatos() {
  db.collection("posteos").get().then((querySnapshot) => {
    mostrarDatos(querySnapshot.docs);
  });
  
}

// CREAR PUBLICACIONES
$("#publicar").click(function (e) {
 e.preventDefault();
let post = $("#texto");val();

const user = firebase.auth().currentUser;
     db.collection("Posteos").add({
      _publicacion:post,
      _idUser:user.iud,
      _nombreUser:user.displayName, 
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
  console.log(post);

})
.catch((error) => {
  console.error("Error adding document: ", error);
});
});


//MOSTRAR PUBLICACION EN HTML
  function mostrarDatos(data) {
    const user = firebase.auth().currentUser;
    if (data.length > 0) {
      $("#post").empty();
      let html = "";
      data.forEach((doc) => {
        var post = doc.data();
        console.log("post - ",post);
        var div = ``;
        if (user.uid == post._idUser) {
          div = `
          <div class="card mt-3 mx-auto" style="max-width: 800px;">
            <div class="card-body">
              <p>${post._publicacion}</p>
              <p>Publicado por ${post._nombreUser}</p>
              <button data-id="${doc._idUser}">
                Editar
              </button>
              <button data-id="${doc._idUser}">
                Eliminar
              </button>
            </div>
          </div>
        `;
        } else {
          div = `
          <div class="card bg-dark text-white  mt-3 mx-auto" style="max-width: 800px;">
            <div class="card-body">
              <p>${post._publicacion}</p>
              <p>Publicado por ${post._nombreUser}</p>
            </div>
          </div>
        `;
        }

        html += div;
      });
      $("#post").append(html);

    }
  }





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





});



