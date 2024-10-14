importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyASabHAflufbdBN02u4uf_P8DfIKydv_aU",
    authDomain: "angular-push-notificatio-fbf04.firebaseapp.com",
    projectId: "angular-push-notificatio-fbf04",
    storageBucket: "angular-push-notificatio-fbf04.appspot.com",
    messagingSenderId: "409041708519",
    appId: "1:409041708519:web:ca8068add0fcc57c180942",
    measurementId: "G-SWLJHKBTMC",
  });
}

const messaging = firebase.messaging();
