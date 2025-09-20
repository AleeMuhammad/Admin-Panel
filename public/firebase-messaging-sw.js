importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Initialize Firebase inside the service worker
firebase.initializeApp({
  apiKey: "AIzaSyAnxxng8WGxgSnpTn6hKM216tEYw5lI01A",
  authDomain: "zain-gs-admin.firebaseapp.com",
  projectId: "zain-gs-admin",
  storageBucket: "zain-gs-admin.firebasestorage.app",
  messagingSenderId: "23766203112",
  appId: "1:23766203112:web:adbb9db715a4ebc13ea75d",
  measurementId: "G-M7MKGTE23R"
});

// Get messaging instance
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background notification received:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.image || "/logo.png"
  };
try {
    const audio = new Audio('/order.mp3');
    audio.play().catch(err => console.log("SW Audio Error:", err));
  } catch (e) {
    console.log("Audio cannot play in service worker:", e);
  }
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
