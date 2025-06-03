import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import type { TestType } from "./hooks/api/useTestTypesData";
import useDelDepartment from "./hooks/api/useDelDepartment";

interface Props {
  Depdata: TestType;
  ModalCloseFn: () => void;
}
const DeleteMDepartmentModal = ({ Depdata, ModalCloseFn }: Props) => {
  const { id, ...data } = Depdata;
  const { mutateAsync: deleteDepartment } = useDelDepartment();
  const deleteFn = () => {
    deleteDepartment(id);
    ModalCloseFn();
  };
  return (
    <DialogContent>
      <DialogTitle>Delete</DialogTitle>
      <DialogDescription>Edit the Test Units Details</DialogDescription>
      <div className="flex flex-col gap-2">
        Medical Departmnet Name : {data.name}
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

export default DeleteMDepartmentModal;
