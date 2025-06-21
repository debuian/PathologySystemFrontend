import { FilePlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "~/components/ui/table";
import { useTestsData } from "~/features/Test/hooks/api/useTestData";
import type { TestFormValues } from "types/form/TestFormValues";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import TestEdit from "../features/Test/components/TestEdit";
import DeleteTest from "~/features/Test/components/DeleteTest";
import Pagination from "~/components/Pagination";
import Modal from "~/components/Modal";
import TestCard from "~/features/Test/components/TestCard";

export default function Test() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestFormValues | null>(null);
  const [selectedTestID, setSelectedTestId] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "UpdateTest" | "Delete" | null
  >(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  const { data } = useTestsData(currentPage, itemsPerPage);
  return (
    <>
      <Modal open={isOpen} setOpen={setIsOpen}>
        {selectedAction === "UpdateTest" ? (
          <DialogContent className=" overflow-y-auto  max-h-[80vh]">
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>Edit the Test Details</DialogDescription>
            {selectedTest && selectedTestID && (
              <TestEdit
                initialData={selectedTest}
                dataId={selectedTestID}
                ModalCLoseFn={() => setIsOpen(false)}
              />
            )}
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogTitle>Delete Test</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this test?
            </DialogDescription>
            {selectedTest && selectedTestID && (
              <DeleteTest
                name={selectedTest?.name}
                testId={selectedTestID}
                ModalCLoseFn={() => setIsOpen(false)}
              />
            )}
          </DialogContent>
        )}
      </Modal>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Test Management</CardTitle>
          <Link
            to="/tests/create" // Absolute path
            className="btn btn-primary flex items-center border px-4 py-2 rounded-md hover:bg-black hover:text-white"
          >
            <FilePlus className="h-4 w-4 mr-2" />
            Create
          </Link>
        </CardHeader>

        <CardContent className="min-h-[calc(100vh-300px)] space-y-6">
          {/* <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/5">
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Price</TableHead>
                <TableHead className="font-medium">Unit</TableHead>
                <TableHead className="font-medium">Department</TableHead>
                <TableHead className="font-medium">Normal Min Value</TableHead>
                <TableHead className="font-medium">Normal Max Value</TableHead>
                <TableHead className="font-medium">Categories</TableHead>
                <TableHead className="text-right font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data && data.data.length > 0 ? (
                data.data.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">
                      {test.name && test.name.length > 25
                        ? `${test.name.slice(0, 25)}...`
                        : test.name}
                    </TableCell>
                    <TableCell>{test.price}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs">
                        {test?.testUnit?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      {test?.medicalDepartment?.name &&
                      test?.medicalDepartment?.name.length > 25
                        ? `${test.medicalDepartment.name.slice(0, 25)}...`
                        : test?.medicalDepartment?.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {test.categoryMappings.slice(0, 3).map((category) => (
                          <span
                            key={category.id}
                            className="px-2 py-1.5 bg-gray-700 text-gray-200 rounded-full text-xs"
                          >
                            {category?.category?.name}
                          </span>
                        ))}
                        {test.categoryMappings.length > 3 ? (
                          <span className="px-2 py-1.5 bg-gray-700 text-gray-200 rounded-full text-xs">
                            +{test.categoryMappings.length - 3}
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            const formData: TestFormValues = {
                              name: test.name,
                              price: String(test?.price),
                         
                              medicalDepartmentId: test.medicalDepartment?.id!,
                              testUnitId: test?.testUnit?.id!,
                              categoryIds: test?.categoryMappings?.map(
                                (category) => category.category.id
                              ),
                            };
                            setIsOpen(true);
                            setSelectedTestId(String(test.id));
                            setSelectedTest(formData);
                            setSelectedAction("UpdateTest");
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            const formData: TestFormValues = {
                              name: test.name,
                              price: String(test?.price),
                            
                              medicalDepartmentId: test.medicalDepartment?.id!,
                              testUnitId: test?.testUnit?.id!,
                              categoryIds: test?.categoryMappings?.map(
                                (category) => category.category.id
                              ),
                            };
                            setIsOpen(true);
                            setSelectedTestId(String(test.id));
                            setSelectedTest(formData);
                            setSelectedAction("Delete");
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
                  <TableCell colSpan={8} className="text-center py-6">
                    No tests found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {data?.data.map((test) => {
              const formData: TestFormValues = {
                name: test.name,
                price: String(test?.price),
                medicalDepartmentId: test.medicalDepartment?.id!,
                testUnitId: test?.testUnit?.id!,
                categoryIds: test?.categoryMappings?.map(
                  (category) => category.category.id
                ),
                referenceRanges: test.referenceRanges,
                specimenRequirements: test.specimenRequirements.map((sr) => ({
                  specimenId: sr.specimen.id,
                  containerId: sr.container.id,
                })),
              };
              return (
                <TestCard
                  key={test.id}
                  test={test}
                  onEdit={() => {
                    setIsOpen(true);
                    setSelectedTestId(String(test.id));
                    setSelectedTest(formData);
                    setSelectedAction("UpdateTest");
                  }}
                  onDelete={() => {
                    setIsOpen(true);
                    setSelectedTestId(String(test.id));
                    setSelectedTest(formData);
                    setSelectedAction("Delete");
                  }}
                />
              );
            })}
          </div>
        </CardContent>
        {data?.meta && (
          <CardFooter className="justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={data.meta.totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </CardFooter>
        )}
      </Card>
    </>
  );
}
