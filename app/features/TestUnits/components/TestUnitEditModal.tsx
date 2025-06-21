import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import TestUnitEdit from "./TestUnitEdit";
import type { TestUnit } from "types/api/TestUnit";

interface TestUnitEditModalProps {
  selectedUnit: TestUnit;
  ModalCLoseFn: () => void;
}

const TestUnitEditModal = ({
  selectedUnit,
  ModalCLoseFn,
}: TestUnitEditModalProps) => {
  return (
    <div>
      <DialogContent>
        <DialogTitle>Edit</DialogTitle>
        <DialogDescription>Edit the Test Units Details</DialogDescription>
        <TestUnitEdit
          initialData={(() => {
            const { id, ...rest } = selectedUnit;
            return rest;
          })()}
          dataId={String(selectedUnit.id)}
          ModalCLoseFn={ModalCLoseFn}
        />
      </DialogContent>
    </div>
  );
};

export default TestUnitEditModal;
