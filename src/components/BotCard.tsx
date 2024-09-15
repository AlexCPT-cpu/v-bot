import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Switch from "@/components/Switch";
import truncateEthAddress from "truncate-eth-address";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialNotifications = [
  {
    name: "USDC.",
    userId: 32,
    description: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    active: true,
  },
  {
    name: "USDT",
    userId: 32,
    description: "0x00fdC1EeA25F1763C4b39AD4d3BC5A63B84c1538",
    active: false,
  },
  {
    name: "DODGE",
    userId: 32,
    description: "0x00fdC1EeA25F1763C4b39AD4d3BC5A63B84c1538",
    active: true,
  },
];
type CardProps = React.ComponentProps<typeof Card>;

export function BotCard({ className, ...props }: CardProps) {
  const navigate = useNavigate();

  const goToTokenDetails = (userId: string | number, tokenAddress: string) => {
    navigate(`/bot/${userId}/${tokenAddress}`);
  };

  const [notifications, setNotifications] = useState(initialNotifications);

  const handleSwitchChange = (index: number, checked: boolean) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].active = checked;
    setNotifications(updatedNotifications);
  };

  return (
    <Card
      className={cn("w-full bg-black text-white border-none", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>Volume Bots</CardTitle>
        <CardDescription>You have {"2"} active bots.</CardDescription>
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
        <div className="h-[450px] overflow-scroll scrollbar-hide w-full">
          {notifications.map((notification, index) => {
            return (
              <div
                onClick={() =>
                  goToTokenDetails(
                    notification.userId,
                    notification.description
                  )
                }
                key={index}
                className="w-full flex flex-row justify-between border-b border-b-white items-center py-2 mb-4 pb-5"
              >
                <div className="grid grid-cols-[25px_1fr] items-start text-left hover:bg-gray-600/20 rounded-none w-full">
                  <span
                    className={`flex h-2 w-2 translate-y-1 rounded-full transition-colors duration-100 ${
                      notification.active ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      ${notification.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {truncateEthAddress(notification.description)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center w-full justify-end">
                  <Switch
                    checked={notification.active}
                    onChange={(checked: boolean) =>
                      handleSwitchChange(index, checked)
                    }
                  />
                </div>
              </div>
            );
          })}
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
