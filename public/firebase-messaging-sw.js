importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyDF7QZdfUFoK1cXjHaquR67dCBpYaPhOeo",
    authDomain: "sentistock-e63ef.firebaseapp.com",
    projectId: "sentistock-e63ef",
    storageBucket: "sentistock-e63ef.firebasestorage.app",
    messagingSenderId: "497799441530",
    appId: "1:497799441530:web:d326193dfed6588e491fc3"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(
        payload.notification.title,
        { body: payload.notification.body }
    );
});