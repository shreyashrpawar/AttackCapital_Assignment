import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Patients(){
    return(<>
        <SidebarProvider><AppSidebar/></SidebarProvider>
        
        </>
    );
}