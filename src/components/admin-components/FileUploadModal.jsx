import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderUp } from "lucide-react";
const FileUploadModal = ({ children }) => (
  <Dialog>
    <DialogTrigger>
      <FolderUp />
    </DialogTrigger>

    <DialogHeader>
      <DialogContent>
        <DialogHeader>{children}</DialogHeader>
      </DialogContent>
    </DialogHeader>
  </Dialog>
);

export default FileUploadModal;
