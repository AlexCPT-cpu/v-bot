import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { PauseIcon, PlayIcon } from "lucide-react";
import { DialogClose } from "./ui/dialog";
import toast from "react-hot-toast";

export function StopModal({
  paused,
  setPaused,
}: {
  paused: boolean;
  setPaused: (pause: boolean) => void;
}) {
  console.log(paused);
  return (
    <>
      {paused ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="transition-all duration-100 active:scale-90 border-none active:border-none focus:border-none focus:ring-0 active:ring-0 focus-visible:ring-0 bg-white"
            >
              <PlayIcon className="mr-2 h-4 w-4" /> Unpause Bot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95%] rounded-2xl bg-black border border-white text-white">
            <DialogHeader>
              <DialogTitle>Unpause Bot</DialogTitle>
              <DialogDescription>
                <div className="mt-2">Confirm Unpausing the current bot</div>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <div className="w-full justify-between flex-row items-center mt-8">
                <DialogClose className="bg-red-600">
                  {/* <Button type="button" variant="destructive"> */}
                  Close
                  {/* </Button> */}
                </DialogClose>
                <DialogClose
                  onClick={() => {
                    setPaused(false);
                    console.log("Set Unpauseed");
                    toast.success("Bot Unpaused");
                  }}
                  className="ml-32"
                >
                  {/* <Button

                    className="transition-all duration-100 active:scale-90 py-5"
                    variant="solid"
                    type="submit"
                  > */}
                  Confirm
                  {/* </Button> */}
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="transition-all duration-100 active:scale-90 border-none active:border-none focus:border-none focus:ring-0 active:ring-0 focus-visible:ring-0 bg-white"
            >
              <PauseIcon className="mr-2 h-4 w-4" /> Pause Bot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95%] rounded-2xl bg-black border border-white text-white">
            <DialogHeader>
              <DialogTitle>Pause Bot</DialogTitle>
              <DialogDescription>
                <div className="mt-2">Confirm Pausing the current bot</div>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <div className="w-full justify-between flex-row items-center mt-8">
                <DialogClose className="bg-red-600">
                  {/* <Button type="button" variant="destructive"> */}
                  Close
                  {/* </Button> */}
                </DialogClose>
                <DialogClose
                  onClick={() => {
                    setPaused(true);
                    console.log("Set Paused");
                    toast.success("Bot Paused");
                  }}
                  className="ml-32"
                >
                  {/* <Button

                    className="transition-all duration-100 active:scale-90 py-5"
                    variant="solid"
                    type="submit"
                  > */}
                  Confirm
                  {/* </Button> */}
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
