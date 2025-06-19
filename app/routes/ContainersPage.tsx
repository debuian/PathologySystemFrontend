import { FilePlus } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
export default function ContainerCreatePage() {
  return (
    <Card className="container mx-auto p-4">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-2xl font-bold mb-4">
          Container Management {/* Fixed typo */}
        </CardTitle>
        <Link
          to="create" // Absolute path
          className="btn btn-primary flex items-center border px-4 py-2 rounded-md hover:bg-black hover:text-white"
        >
          <FilePlus className="h-4 w-4 mr-2" />
          Create
        </Link>
      </CardHeader>
    </Card>
  );
}
