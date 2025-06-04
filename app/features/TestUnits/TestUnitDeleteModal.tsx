import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import useDeletTestUnitMutation from "./hooks/api/useDeletTestUnitMutation";
interface TestUnitDeleteModalProps {
  name: string;
  id: string;
  ModalCLoseFn: () => void;
}
const TestUnitDeleteModal = ({
  name,
  id,
  ModalCLoseFn,
}: TestUnitDeleteModalProps) => {
  const { mutateAsync: deleteTestUnit } = useDeletTestUnitMutation();
  const deleteFn = () => {
    deleteTestUnit(id);
    ModalCLoseFn();
  };

  return (
    <DialogContent>
      <DialogTitle>Delete</DialogTitle>
      <DialogDescription>Edit the Test Units Details</DialogDescription>
      <div className="flex flex-col gap-2">
        Test Unit Name : {name}
        <div className="mt-2 flex items-center justify-between">
          <button className="w-fit bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl disabled:opacity-50">
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-xl disabled:opacity-50 "
            onClick={deleteFn}
          >
            Delete
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default TestUnitDeleteModal;
