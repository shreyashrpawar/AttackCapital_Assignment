import { SquarePen, Trash2 } from 'lucide-react'
// import { Column, Employee } from './data'

// interface EmployeeTableProps {
//   columns: Column[]
//   employeesData: Employee[]
// }

const EmployeeTable: React.FC<EmployeeTableProps> = ({ columns, employeesData }) => {
  return (
    <div className="mx-auto my-8 max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-2xl font-semibold text-gray-800">Employee Dashboard</h1>
      <table className="w-full table-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-4 text-left text-sm font-semibold uppercase text-[#91929E]"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employeesData.map((employee, index) => (
            <tr
              key={index}
              className="bg-white transition duration-200 ease-in-out hover:bg-gray-100"
            >
              <td className="px-4 py-6 text-sm text-[#0A1629]">{index + 1}</td>
              <td className="px-4 py-6 text-sm text-[#0A1629]">{employee.name}</td>
              <td className="px-4 py-6 text-sm text-[#0A1629]">{employee.cell}</td>
              <td className="px-4 py-6 text-sm text-[#0A1629]">{employee.email}</td>
              <td className="px-4 py-6 text-sm text-[#0A1629]">{employee.salary}</td>
              <td className="px-4 py-6 text-sm">
                <span
                  className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                    employee.status === 'Paid'
                      ? 'bg-[#E0F9F2] text-[#00D097]'
                      : 'bg-[#7D859224] text-[#7D8592]'
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="px-6 py-6 text-sm text-[#0A1629]">{employee.address}</td>
              <td className="px-6 py-6 text-sm text-[#0A1629]">
                <div className="flex space-x-4">
                  <button className="text-[#0A1629] hover:text-gray-700">
                    <SquarePen size={16} />
                  </button>
                  <button className="text-[#F65160] hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable