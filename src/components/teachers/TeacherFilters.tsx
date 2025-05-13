
import React from "react";
import { Download, Search } from "lucide-react";

interface TeacherFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;
  departmentOptions: string[];
}

export const TeacherFilters: React.FC<TeacherFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  departmentOptions
}) => {
  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="البحث عن مدرس بالاسم أو التخصص..."
              className="w-full pl-10 pr-4 py-2 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <select 
              className="py-2 px-3 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
            <Download size={16} /> تصدير PDF
          </button>
        </div>
      </div>
    </div>
  );
};
