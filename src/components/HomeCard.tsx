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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoint } from "../../config/config";
import HomeItem from "./HomeItem";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

type CardProps = React.ComponentProps<typeof Card>;
export interface Bot {
  privateKey: string;
  wallet1: string;
  wallet2: string;
  wallet3: string;
  wallet4: string;
  wallet5: string;
  tokenAddress: string;
  amount: number;
  active: boolean;
}

export function HomeCard({ className, ...props }: CardProps) {
  const { initData } = retrieveLaunchParams();

  const userId = initData?.user?.id ?? 0;

  const [data, setData] = useState<Bot[]>([]);
  const navigate = useNavigate();

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

  const goToTokenDetails = (
    userId: string | number,
    tokenAddress: string,
    index: number
  ) => {
    navigate(`/bot/${userId}/${tokenAddress}/${index}`);
  };

  return (
    <Card className={cn("w-full bg-black text-white", className)} {...props}>
      <CardHeader>
        <CardTitle>Volume Bots</CardTitle>
        <CardDescription>You have {data?.length} created bots.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
        <div className="h-[235px] overflow-scroll scrollbar-hide">
          {data?.map((notification: any, index: any) => (
            <HomeItem
              index={index}
              userId={userId!}
              notification={notification}
              key={index}
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
