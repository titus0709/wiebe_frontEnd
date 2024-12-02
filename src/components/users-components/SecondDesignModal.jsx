import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import SecondDesignView from "./SecondDesignView";
import { Button } from "../ui/button";

const SecondDesignModal = ({ getSecondDesign, text }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="text-sm ml-4 my-2">
          {text ? text : "Choose Back Design"}
        </Button>
      </DialogTrigger>

      <DialogHeader>
        <DialogContent className="">
          <DialogHeader>
            <SecondDesignView
              getSecondDesign={getSecondDesign}
              setOpen={setOpen}
            />
          </DialogHeader>
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
};

export default SecondDesignModal;
