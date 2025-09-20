// import { useEffect } from "react";
// import { onMessage } from "firebase/messaging";
// import { toast } from "react-toastify";
// import { messaging } from "../firebase";

// const FirebaseNotificationListener = () => {
//   useEffect(() => {
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("Notification received:", payload);

//       const { title, body } = payload.notification || {};
//       if (title || body) {
//         toast.info(
//           <div>
//             <strong>{title}</strong>
//             <div>{body}</div>
//           </div>,
//           { position: "top-right" }
//         );
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

      // Show system/browser notification
      if (Notification.permission === "granted") {
        new Notification(title || "New Notification", {
          body: body || "",
          icon: image || "/firebase-logo.png",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default FirebaseNotificationListener;
