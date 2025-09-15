'use client';
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from '../../lib/auth-context'
import { useState, useEffect } from 'react'
import { apiGet } from "@/lib/api";


export default function Patients(){
    const { token, authenticate, loading } = useAuth()
      const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data,setData]=useState(null)

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
    if (!token || token === '') {
      await authenticate();
    }

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


    return(<>
        <SidebarProvider><AppSidebar/></SidebarProvider>
              <table className="w-full table-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm">

        <tbody className="divide-y divide-gray-200">
          {data && data.map((datas, index) => (
            <tr
              key={index}
              className="bg-white transition duration-200 ease-in-out hover:bg-gray-100"
            >
              <td className="px-4 py-6 text-sm text-[#0A1629]">{index + 1}</td>
              <td className="px-4 py-6 text-sm text-[#0A1629]">{datas.resource['gender']}</td>
              <td className="px-4 py-6 text-sm text-[#0A1629]">{datas.resource['birthDate']}</td>
            </tr>
          ))}
        </tbody>
      </table>

        </>
    );
}