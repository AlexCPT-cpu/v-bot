import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import truncateEthAddress from "truncate-eth-address";
import { useNavigate } from "react-router-dom";

const notifications = [
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

export function HomeCard({ className, ...props }: CardProps) {
  const navigate = useNavigate();

  const goToTokenDetails = (userId: string | number, tokenAddress: string) => {
    navigate(`/bot/${userId}/${tokenAddress}`);
  };

  return (
    <Card className={cn("w-full bg-black text-white", className)} {...props}>
      <CardHeader>
        <CardTitle>Volume Bots</CardTitle>
        <CardDescription>You have {"2"} active bots.</CardDescription>
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
        <div className="h-[400px] overflow-scroll scrollbar-hide">
          {notifications.map((notification, index) => (
            <div
              onClick={() =>
                goToTokenDetails(notification.userId, notification.description)
              }
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 text-left hover:bg-gray-600/20 p-2 rounded-lg"
            >
              <span
                className={`flex h-2 w-2 translate-y-1 rounded-full ${
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
