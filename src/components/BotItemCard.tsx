import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import truncateEthAddress from "truncate-eth-address";

const wallets = [
  {
    address: "0x611a917b934E3c523258a08588AA50Dc77B13190",
    amountTokens: 4000,
    amountETH: 0.05,
    active: true,
  },
  {
    address: "0x71c3b215ad246DD75DfCD1ED14F128060dC118bF",
    amountTokens: 4000,
    amountETH: 0.05,
    active: false,
  },
  {
    address: "0xA4B5c3693457248A40CFc7Aa8346c9192b91eE9E",
    amountTokens: 4000,
    amountETH: 0.05,
    active: true,
  },
  {
    address: "0x8bD3Afb6562d3dF1A25192A3A9B816F77e813BE1",
    amountTokens: 4000,
    amountETH: 0.05,
    active: false,
  },
  {
    address: "0xEA58145e3A2Ef37d2D2dFCBc8fD96f89e21f5Cbd",
    amountTokens: 4000,
    amountETH: 0.05,
    active: true,
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function BotItemCard({ className, ...props }: CardProps) {
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
          <div className="space-y-4 h-[250px] overflow-scroll scrollbar-hide w-full">
            {wallets.map((wallet, index) => (
              <div
                key={index}
                className="p-2 shadow-md border-b border-b-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`flex h-2 w-2 rounded-full ${
                        wallet.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <p className="font-semibold text-white">
                      Wallet {index + 1}
                    </p>
                  </div>
                </div>
                <div className="text-sm flex flex-row w-full justify-between py-2">
                  <div className="font-semibold">Address:</div>
                  <div>{truncateEthAddress(wallet.address)}</div>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <div className="text-sm">
                    <div className="font-semibold">Token Amount:</div>
                    <div>{wallet.amountTokens}</div>
                  </div>
                  <div className="text-sm">
                    <div>
                      <span className="font-semibold">ETH Amount:</span>
                    </div>
                    <div>{wallet.amountETH}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
