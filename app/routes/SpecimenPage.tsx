import { Edit, FilePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Specimen } from "types/api/Specimen";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useSpecimensData } from "~/features/Specimen/hooks/api/useSpecimenData";

export default function SpecimenPage() {
  const { data } = useSpecimensData();
  const [selected, setSelected] = useState<Specimen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"Updated" | "Delete" | null>(null);

  return (
    <Card className="mx-auto max-w-1/2">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle>Specimen Management</CardTitle>
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
            <TableRow className="font-medium">
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right ">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0
              ? data.map((specimen) => (
                  <TableRow key={specimen.id} className="font-medium">
                    <TableCell>{specimen.id}</TableCell>
                    <TableCell>{specimen.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => {
                            setSelected(specimen);
                            setAction("Updated");
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelected(specimen);
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
              : null}{" "}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
