import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const GetUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    //@ts-expect-error none
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      setUserId(tg.initDataUnsafe.user.id);
      console.log("User ID:", tg.initDataUnsafe.user.id);
    } else {
      console.log("User data not available");
    }
  }, []);

  const { initData } = retrieveLaunchParams();
  return (
    <div>
      {userId ? (
        <p>Your Telegram User ID is: {userId}</p>
      ) : (
        <p>Unable to retrieve Telegram User ID</p>
      )}

      {initData ? (
        <p>Your Telegram data is: {JSON.stringify(initData)}</p>
      ) : (
        <p>Unable to retrieve Telegram Data User ID</p>
      )}
    </div>
  );
};

export default GetUserId;
