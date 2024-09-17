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
import { Pencil } from "lucide-react";
import EditForm from "./EditForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function EditModal() {
  const navigate = useNavigate();
  const [error, setError] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center border border-gray-600 rounded-lg p-2 bg-gray-800 transition-all duration-100 active:scale-90">
          <Pencil className="text-white w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] rounded-2xl bg-black border border-white text-white">
        <DialogHeader>
          <DialogTitle>Edit Bot</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              Enter details. and Click save when you're done.
            </div>
          </DialogDescription>
        </DialogHeader>
        <EditForm onError={setError} />
        <DialogFooter>
          <Button
            disabled={error}
            onClick={() => navigate("/bots")}
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
