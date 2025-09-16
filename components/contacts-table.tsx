"use client";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiBardLine,
  RiFilter3Line,
  RiSearch2Line,
  RiVerifiedBadgeFill,
  RiCheckLine,
  RiMoreLine,
} from "@remixicon/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Item = {
  fullUrl: string;
  resource: {
    resourceType: string;
    id: string;
    name?: Array<{ family: string; given: string[] }>;
    telecom?: Array<{ system: string; value: string; rank?: number }>;
    gender?: string;
    birthDate?: string;
  }
};



interface GetColumnsProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
}

const getColumns = ({ data, setData }: GetColumnsProps): ColumnDef<Item>[] => [
  {
    header: "First Name",
    accessorKey: "firstname",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="font-medium">{row.getValue("gender")}</div>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Last Name",
    accessorKey: "lastname",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="font-medium">{row.getValue("gender")}</div>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("gender")}</span>
    ),
    size: 140,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("gender")}</span>
    ),
    size: 140,
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("gender")}</span>
    ),
    size: 140,
  },
    {
    header: "Date of Birth",
    accessorKey: "birthDate",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("birthDate")}</span>
    ),
    size: 140,
  },
  
];

export default function ContactsTable() {
          const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);
// interface Item {
//   fullUrl: string;
//   resource: Record<string, any>; // allows any structure inside resource
// }
// for FHIR Patient API response
interface PatientItem {
  fullUrl: string;
  resource: {
    resourceType: string;
    id: string;
    name?: Array<{ family: string; given: string[] }>;
    telecom?: Array<{ system: string; value: string; rank?: number }>;
    gender?: string;
    birthDate?: string;
    // ... more if needed
  };
}


const [data, setData] = useState<PatientItem[]>([
]);
    useEffect(() => {
        async function name() {
            await getData()
        }
    name();
  }, [])


const getData = async (): Promise<void> => {
  setError('');
  setIsLoading(true);

  try {
    const res = await fetch(`/api/proxy?path=fhir/v2/Patient?family=mylastname`);
      const patientsData = await res.json();
      console.log(patientsData.entry)
      setData(patientsData.entry);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);


  return (
<div
  className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
  <table className="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
           Full Name
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Phone
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Email
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Date of Birth</p>
        </th>
      </tr>
    </thead>
    <tbody>
        {data && data.map((item) => (
            <tr key={item.resource.id}>
        <td className="p-4 border-b border-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {item.resource.name ? item.resource.name[0].given.join(" ") : "N/A"} {item.resource.name ? item.resource.name[0].family : "N/A"}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {/* Assuming job title is not available in the current data structure */}
            {item.resource.telecom ? item.resource.telecom.find(t => t.system === "phone")?.value : "N/A"}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {item.resource.telecom ? item.resource.telecom.find(t => t.system === "email")?.value : "N/A"}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {item.resource.birthDate || "N/A"}
          </p>
        </td>
      </tr>
        ))}
    </tbody>
  </table>
</div>
  );
}
