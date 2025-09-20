// import { useEffect } from "react";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "../firebase";

// const FirebaseNotificationListener = () => {
//   useEffect(() => {
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("Foreground notification received:", payload);

//       const { title, body, image } = payload.notification || {};

//       if (Notification.permission === "granted") {
//         new Notification(title || "New Notification", {
//           body: body || "",
//           icon: '/logo.png',
//         });
//         const audio = new Audio('/order.mp3');
//         audio.play().catch(err => console.log(err));
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return null;
// };

// export default FirebaseNotificationListener;
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

const FirebaseNotificationListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground notification received:", payload);

      const { title, body, image } = payload.notification || {};

      // Show notification
      if (Notification.permission === "granted") {
        new Notification(title || "New Notification", {
          body: body || "",
          icon: '/logo.png',
        });

        // Play sound when notification arrives
        const audio = new Audio('/order.mp3');
        audio.play().catch(err => console.log(err));
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default FirebaseNotificationListener;
