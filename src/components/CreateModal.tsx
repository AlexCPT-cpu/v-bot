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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import TokenForm from "./TokenForm";

export function CreateModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="transition-all duration-100 active:scale-90 border-none active:border-none focus:border-none focus:ring-0 active:ring-0 focus-visible:ring-0 bg-white"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Bot
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] rounded-2xl bg-black border border-white text-white">
        <DialogHeader>
          <DialogTitle>Create Bot</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              Enter details. and Click save when you're done.
            </div>
          </DialogDescription>
        </DialogHeader>
        <TokenForm />
        <DialogFooter>
          <Button
            className="transition-all duration-100 active:scale-90 py-5"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
