import { Edit, FilePlus, Trash2 } from "lucide-react";
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
import TestUnitDeleteModal from "~/features/TestUnits/components/TestUnitDeleteModal";
import type { TestUnit } from "types/api/TestUnit";
import { useTestUnitsData } from "~/features/TestUnits/hooks/api/useTestUnitsData";
import TestUnitEditModal from "~/features/TestUnits/components/TestUnitEditModal";

export default function TestUnitsPage() {
  const { data } = useTestUnitsData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<TestUnit | null>(null);
  const [action, setAction] = useState<"update" | "delete" | null>(null);
  return (
    <>
      <Modal open={isOpen} setOpen={setIsOpen}>
        {selectedUnit ? (
          action == "update" ? (
            <TestUnitEditModal
              selectedUnit={selectedUnit}
              ModalCLoseFn={() => setIsOpen(false)}
            />
          ) : (
            //
            <TestUnitDeleteModal
              name={selectedUnit?.name}
              id={String(selectedUnit?.id)}
              ModalCLoseFn={() => setIsOpen(false)}
            />
          )
        ) : null}
      </Modal>

      <Card className="mx-auto max-w-1/2">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Test Units</CardTitle>
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
                data.map((unit) => {
                  return (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 items-center">
                          <button
                            onClick={() => {
                              setSelectedUnit(unit);
                              setAction("update");
                              setIsOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4"> </Edit>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUnit(unit);
                              setAction("delete");
                              setIsOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
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
