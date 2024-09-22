import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const GetUserId = () => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    //@ts-expect-error none
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      setUserId(tg.initDataUnsafe.user.id);
      setData(tg.initDataUnsafe);
      console.log("User ID:", tg.initDataUnsafe.user.id);
    } else {
      console.log("User data not available");
    }
  }, []);

  const { initDataRaw, initData } = retrieveLaunchParams();
  return (
    <div>
      {userId ? (
        <p>Your Telegram User ID is: {userId}</p>
      ) : (
        <p>Unable to retrieve Telegram User ID</p>
      )}
      {data ? (
        <p>Your data is: {JSON.stringify(data)}</p>
      ) : (
        <p>Unable to retrieve data</p>
      )}
      extras: {JSON.stringify(initDataRaw)}
      extras2 {JSON.stringify(initData)}
    </div>
  );
};

export default GetUserId;
