import { useDeleteTestMutation } from "~/hooks/api/deleteTestMutation";

interface DeleteTestProps {
  name: string;
  testId: string;
  ModalCLoseFn: () => void;
}
const DeleteTest = ({ name, testId, ModalCLoseFn }: DeleteTestProps) => {
  const { mutateAsync: deleteTestMutation } = useDeleteTestMutation();

  const deleteTest = () => {
    deleteTestMutation(testId);
    ModalCLoseFn();
  };

  return (
    <div className="flex flex-col gap-2">
      Test Name : {name}
      <div className="mt-2 flex items-center justify-between">
        <button className="w-fit bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl disabled:opacity-50">
          Cancel
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded-xl disabled:opacity-50 "
          onClick={deleteTest}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteTest;
