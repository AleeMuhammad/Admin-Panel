import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

const FirebaseNotificationListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground notification received:", payload);

      const { title, body, image } = payload.notification || {};

      if (Notification.permission === "granted") {
        new Notification(title || "New Notification", {
          body: body || "",
          icon: '/logo.png',
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default FirebaseNotificationListener;
