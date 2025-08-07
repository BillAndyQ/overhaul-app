"use client";
import { useUser } from "@/app/userContext";
import SidebarUI from "@/components/SidebarUI";

export default function SidebarLoginUI({urlLogout=""}) {
    const { user, isLoading } = useUser();
        
    if (isLoading || !user) return null;

    return <SidebarUI urlLogout={urlLogout} />;
}
