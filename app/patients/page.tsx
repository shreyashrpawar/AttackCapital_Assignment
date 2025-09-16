'use client';
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from '../../lib/auth-context'
import { useState, useEffect } from 'react'
import { apiGet } from "@/lib/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/user-dropdown";
import FeedbackDialog from "@/components/feedback-dialog";
import { RiScanLine } from "@remixicon/react";
import { StatsGrid } from "@/components/stats-grid";
import ContactsTable from "@/components/contacts-table";

export default function Patients(){
    const { token, authenticate, loading } = useAuth()
      const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data,setData]=useState(null)

  //     useEffect(() => {
  //       async function name() {
  //           await getData()
  //       }
  //   name();
  // }, [])


// const getData = async (): Promise<void> => {
//   setError('');
//   setIsLoading(true);

//   try {
//     if (!token || token === '') {
//       await authenticate();
//     }

//     const res = await fetch(`/api/proxy?path=fhir/v2/Patient?family=mylastname`);
//       const patientsData = await res.json();
//       console.log(patientsData.entry)
//       setData(patientsData.entry);
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       setError(err.message);
//     } else {
//       setError('An unexpected error occurred');
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };
// useEffect(() => {
//     console.log("Data state updated:", data);
//   }, [data]);


    return( <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <RiScanLine size={22} aria-hidden="true" />
                    <span className="sr-only">Dashboard</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Contacts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <FeedbackDialog />
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          <div className="min-h-[100vh] flex-1 md:min-h-min">
            <ContactsTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    );
}