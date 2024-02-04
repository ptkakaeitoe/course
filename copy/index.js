// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVX0pl2gi8m5B7nPL1f1m5nU2dumoI8_8",
  authDomain: "login-page-2ef21.firebaseapp.com",
  databaseURL: "https://login-page-2ef21-default-rtdb.firebaseio.com",
  projectId: "login-page-2ef21",
  storageBucket: "login-page-2ef21.appspot.com",
  messagingSenderId: "1056897349241",
  appId: "1:1056897349241:web:9a684e2a1017c97c6a86a8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, redirect to another page
    window.location.href = "https://www.paingthukha.com/"; // Change 'homepage.html' to your desired path
  } else {
    // No user is signed in, stay on the login page or redirect to login page
  }
});

// Register function
function register() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let full_name = document.getElementById("full_name").value;
  let favourite_song = document.getElementById("favourite_song").value;
  let milk_before_cereal = document.getElementById("milk_before_cereal").value;

  if (!validate_email(email) || !validate_password(password)) {
    alert("Email or Password is Outta Line!!");
    return;
  }
  if (
    !validate_field(full_name) ||
    !validate_field(favourite_song) ||
    !validate_field(milk_before_cereal)
  ) {
    alert("One or More Extra Fields is Outta Line!!");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        email: email,
        full_name: full_name,
        favourite_song: favourite_song,
        milk_before_cereal: milk_before_cereal,
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).set(user_data);
      alert("User Created!!");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

// Login function
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!validate_email(email) || !validate_password(password)) {
    alert("Email or Password is Outta Line!!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Successful login actions
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = { last_login: Date.now() };
      database_ref.child("users/" + user.uid).update(user_data);
      alert("User Logged In!!");
    })
    .catch(function (error) {
      // Handle Errors here.
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

// Validation functions
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  return field != null && field.length > 0;
}
