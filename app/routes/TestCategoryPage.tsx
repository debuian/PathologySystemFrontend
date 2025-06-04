import {
  useTestCategoriesData,
  type TestCategory,
} from "~/features/Test/TestCategories/hooks/api/useTestCategoriesData";
import { Edit, FilePlus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "~/components/ui/table";
import { useState } from "react";
import Modal from "~/components/Modal";
import UpdateTestCategoryModal from "~/features/Test/TestCategories/components/UpdateTestCategoryModal";
import DeleteTestCategoryModal from "~/features/Test/TestCategories/components/DeleteTestCategoryModal";

export default function TestCategoryPage() {
  const { data } = useTestCategoriesData();
  const [selected, setSelected] = useState<TestCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"Updated" | "Delete" | null>(null);
  return (
    <>
      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        {selected ? (
          action === "Updated" ? (
            <UpdateTestCategoryModal
              key={selected.id}
              id={selected.id}
              data={(() => {
                const { id, ...rest } = selected;
                return rest;
              })()}
              ModalCloseFn={() => setIsModalOpen(false)}
            />
          ) : (
            <DeleteTestCategoryModal
              data={selected}
              ModalCloseFn={() => setIsModalOpen(false)}
            />
          )
        ) : null}
      </Modal>
      <Card className="mx-auto max-w-1/2">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Test Categories</CardTitle>
          <Link
            to={{ pathname: "create" }}
            className="btn btn-primary flex items-center border px-4 py-2 rounded-md hover:bg-black hover:text-white"
          >
            <FilePlus className="h-4 w-4 mr-2" />
            Create Test Category
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="text-right font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => {
                            setSelected(category);
                            setAction("Updated");
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4"> </Edit>
                        </button>
                        <button
                          onClick={() => {
                            setSelected(category);
                            setAction("Delete");
                            setIsModalOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No test Category found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
