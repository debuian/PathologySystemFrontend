import useDeleteTestCategoryMutatuion from "../hooks/api/useDeleteTestCategoryMutatuion";
import type { TestCategory } from "../hooks/api/useTestCategoriesData";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
interface DeleteTestCategoryModalProps {
  data: TestCategory;
  ModalCloseFn: () => void;
}
const DeleteTestCategoryModal = ({
  data,
  ModalCloseFn,
}: DeleteTestCategoryModalProps) => {
  const { mutateAsync, isPending } = useDeleteTestCategoryMutatuion();

  const deleteFn = () => {
    mutateAsync(data.id);
    ModalCloseFn();
  };

  return (
    <DialogContent>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogDescription>Delete the Test Category Details</DialogDescription>
      <div className="flex flex-col gap-2">
        Test Category Name : {data.name}
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

export default DeleteTestCategoryModal;
