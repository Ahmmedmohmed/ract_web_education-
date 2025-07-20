/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Outlet } from "react-router-dom";

// ui component
import HeaderStaff from "../../ui/header/staff/HeaderStaff";
import SidebarStaff from "../../ui/sidebar/staff/SidebarStaff";

function StaffLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <HeaderStaff toggleSidebar={toggleSidebar} />
                <SidebarStaff
                    isOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />

                <main className="pt-4 pb-12 lg:pr-64">
                    <div className="container mx-auto px-4 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default StaffLayout;
