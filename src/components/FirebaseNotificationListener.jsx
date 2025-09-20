import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { messaging } from "../firebase";

const FirebaseNotificationListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Notification received:", payload);

      const { title, body } = payload.notification || {};
      if (title || body) {
        toast.info(
          <div>
            <strong>{title}</strong>
            <div>{body}</div>
          </div>,
          { position: "top-right" }
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default FirebaseNotificationListener;
