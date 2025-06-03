import React from "react";
import { Dialog } from "./ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Modal({ children, open, setOpen }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
}
