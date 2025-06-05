import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Test } from "../hooks/api/useTestData";
import { Badge } from "~/components/ui/badge";
import {
  Activity,
  Calendar,
  DollarSign,
  Edit,
  TestTube,
  Trash2,
} from "lucide-react";
import { Button } from "~/components/ui/button";

interface testCardProps {
  test: Test;
  onEdit: () => void;
  onDelete: () => void;
}

const getGenderBadgeColor = (gender: string) => {
  switch (gender) {
    case "male":
      return "bg-blue-100 text-blue-800";
    case "female":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
const TestCard = ({ test, onDelete, onEdit }: testCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{test.name}</CardTitle>
            <p className="text-sm text-gray-600">CBC001</p>
          </div>
          <Badge variant="default">active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Department</p>
            <p className="font-medium">{test.medicalDepartment?.name}</p>
          </div>

          <div>
            <p className="text-gray-600">Specimen</p>
            <p className="font-medium">Whole Blood</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {test.categoryMappings?.map((category) => (
            <Badge>{category.category.name}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600">
            <DollarSign size={16} className="mr-1" />
            <span className="font-bold">${test.price}</span>
          </div>
          <div className="flex items-center text-blue-600">
            <Activity size={16} className="mr-1" />
            <span className="text-sm">2-4 hours</span>
          </div>
        </div>
        {test.referenceRanges && test.referenceRanges.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 flex items-center">
              <TestTube size={14} className="mr-1" />
              Reference Ranges ({test.referenceRanges.length})
            </p>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {test.referenceRanges.map((range) => (
                <div key={range.id} className="bg-gray-50 p-2 rounded text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getGenderBadgeColor(
                          range.gender
                        )}`}
                      >
                        {range.gender === "any" ? "All" : range.gender}
                      </span>
                      <div className="flex items-center text-gray-600">
                        <Calendar size={12} className="mr-1" />
                        <span>
                          {range.age_min_years}-{range.age_max_years}y
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-green-600 font-medium">
                        Normal:
                      </span>
                      {range.normal_min}-{range.normal_max}
                    </div>
                    <div>
                      <span className="text-red-600 font-medium">
                        Critical:
                      </span>
                      {range.critical_min}-{range.critical_max}
                    </div>
                  </div>
                  {range.notes && (
                    <p className="text-gray-600 mt-1 text-xs">{range.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onEdit}
          >
            <Edit size={14} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={onDelete}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCard;
