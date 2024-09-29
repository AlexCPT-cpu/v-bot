/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "../lib/utils";
import { Card, CardContent } from "../components/ui/card";

import WalletItem from "./WalletItem";

type CardProps = React.ComponentProps<typeof Card>;

export function BotItemCard({
  className,
  wallets,
  tokenAddress,
  ...props
}: CardProps | any) {
  return (
    <Card
      className={cn("w-full bg-black text-white border-none", className)}
      {...props}
    >
      <CardContent className="grid gap-1 w-full">
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
        {/* <div className="h-[450px] overflow-scroll scrollbar-hide w-full">

              <div
                className="w-full flex flex-row justify-between border-b border-b-white items-center py-2 mb-4 pb-5"
              >
                <div className="grid grid-cols-[25px_1fr] items-start text-left hover:bg-gray-600/20 rounded-none w-full">
                  <span
                    className={`flex h-2 w-2 translate-y-1 rounded-full transition-colors duration-100 bg-green-500 bg-red-500
                    `}
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
              </div>

        </div> */}
        <div className="w-full">
          <div className="space-y-4 h-[130px] overflow-scroll scrollbar-hide w-full">
            {wallets?.map((wallet: string, index: number) => (
              <WalletItem
                index={index}
                key={index}
                wallet={wallet}
                tokenAddress={tokenAddress}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
