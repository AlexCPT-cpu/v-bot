import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { DialogClose } from "./ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function WithdrawModal() {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="transition-all duration-100 active:scale-90 border-none active:border-none focus:border-none focus:ring-0 active:ring-0 focus-visible:ring-0 bg-white"
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Withdraw & Stop
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] rounded-2xl bg-black border border-white text-white">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              Confirm Withdrawal of all funds, Stopping the bot process and
              delete it
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full justify-between flex-row items-center mt-8 space-x-36">
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>

            <Button
              onClick={() => {
                toast.success("Withdrawal Success");
                setTimeout(() => navigate("/bots"), 1500);
              }}
              className="transition-all duration-100 active:scale-90 py-5"
              variant="solid"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
