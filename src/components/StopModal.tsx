/* eslint-disable @typescript-eslint/no-unused-vars */
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
import axios from "axios";
import { apiEndpoint } from "../../config/config";

export function StopModal({
  paused,
  //@ts-expect-error unused
  setPaused,
  username,
  index,
}: {
  paused: boolean;
  setPaused: (pause: boolean) => void;
  username: string;
  index: string;
}) {
  const submitForm = async (active: boolean) => {
    try {
      await axios.put(`${apiEndpoint}/api/user/${username}/activate/${index}`, {
        active,
      });
      setTimeout(
        () =>
          toast.success(
            active ? "Volume Bot Activated" : "Volume Bot Deactivated"
          ),
        1500
      );
    } catch (error) {
      console.log(error);
      toast.error("error changing bot active state");
    }
  };

  return (
    <>
      {paused ? (
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
                    // setPaused(true);
                    submitForm(false);
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
                    // setPaused(false);
                    submitForm(true);
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
