/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "./HomeCard";
import axios from "axios";
import { apiEndpoint } from "../../config/config";
import BotItem from "./BotItem";
// import { retrieveLaunchParams } from "@telegram-apps/sdk";

type CardProps = React.ComponentProps<typeof Card>;

export function BotCard({ className, ...props }: CardProps) {
  // const { initData } = retrieveLaunchParams();
  const userId = 2024; //initData?.user?.id;
  const [data, setData] = useState<Bot[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/api/user/${userId}`);
        setData(response?.data?.bots);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    getUserData();
  }, [userId]);

  const countActiveItems = useMemo(() => {
    return data?.filter((item: any) => item.active).length;
  }, [data]);

  const navigate = useNavigate();

  const goToTokenDetails = (
    userId: string | number,
    tokenAddress: string,
    index: number
  ) => {
    navigate(`/bot/${userId}/${tokenAddress}/${index}`);
  };

  // const handleSwitchChange = (index: number, checked: boolean) => {
  //   const updatedNotifications = [...notifications];
  //   updatedNotifications[index].active = checked;
  //   setNotifications(updatedNotifications);
  // };

  return (
    <Card
      className={cn("w-full bg-black text-white border-none", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>Volume Bots</CardTitle>
        <CardDescription>
          You have {countActiveItems} active bots.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 w-full">
        {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div> */}
        <div className="h-[235px] overflow-scroll scrollbar-hide w-full">
          {data?.map((notification: any, index: any) => (
            <BotItem
              index={index}
              userId={userId!}
              key={index}
              notification={notification}
              goToTokenDetails={goToTokenDetails}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {/* <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button> */}
      </CardFooter>
    </Card>
  );
}
