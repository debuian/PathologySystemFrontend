import { Edit, FilePlus, Trash2 } from "lucide-react";
import test from "node:test";
import { useState } from "react";
import { Link } from "react-router";
import Modal from "~/components/Modal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "~/components/ui/table";
import DeleteMDepartmentModal from "~/features/Test/TestTypes/DeleteMDepartmentModal";
import EditMDepartmentModal from "~/features/Test/TestTypes/EditMDepartmentModal";
import {
  useTestTypesData,
  type TestType,
} from "~/features/Test/TestTypes/hooks/api/useTestTypesData";
export default function TestTypePage() {
  const { data } = useTestTypesData();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TestType | null>(null);
  const [action, setAction] = useState<"update" | "delete" | null>(null);

  return (
    <>
      {selected != null ? (
        <Modal open={isOpen} setOpen={setIsOpen}>
          {action == "update" ? (
            <EditMDepartmentModal
              data={selected}
              ModalCloseFn={() => setIsOpen(false)}
            />
          ) : (
            <DeleteMDepartmentModal
              Depdata={selected}
              ModalCloseFn={() => setIsOpen(false)}
            />
          )}
        </Modal>
      ) : null}

      <Card className="mx-auto max-w-1/2">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Medical Department</CardTitle>
          <Link
            to={{ pathname: "create" }}
            className="btn btn-primary flex items-center border px-4 py-2 rounded-md hover:bg-black hover:text-white"
          >
            <FilePlus className="h-4 w-4 mr-2" />
            Create
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
                data.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => {
                            setAction("update");
                            setSelected(unit);
                            setIsOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4"> </Edit>
                        </button>
                        <button
                          onClick={() => {
                            setAction("delete");
                            setSelected(unit);
                            setIsOpen(true);
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
                    No test units found. Try adjusting your filters.
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
