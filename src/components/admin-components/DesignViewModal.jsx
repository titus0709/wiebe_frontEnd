import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const DesignViewModal = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="font-bold">View</p>
      </DialogTrigger>

      <DialogHeader>
        <DialogContent className="">
          <DialogHeader>{children}</DialogHeader>
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
};

export default DesignViewModal;
