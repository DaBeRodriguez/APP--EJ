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
  
  
  })
  
  // Registrar usuarios
  $("#registrate").click(function () {
    // capturar email y contraseña
  
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
  
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
  
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:errorMessage,
          })
      });
  })
  
  // Ingresar con cuenta registrada
  
  $("#ingresar").click(function () {
    let email = $("#Email").val();
    let password = $("#Password").val();
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        location.href = "pagina.html";
  
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
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
  
  
  
  