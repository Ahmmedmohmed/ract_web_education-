import { useState } from "react";
import { Outlet } from "react-router-dom";

// ui component
import HeaderAdmin from "../../ui/header/admin/HeaderAdmin";
import SidebarAdmin from "../../ui/sidebar/admin/SidebarAdmin";

// context
// import { AppMenuProviderUser } from "../../contexts/AppMenuContextUser";

// import AppHeader from "../../ui/header/AppHeader";
// import SidebarAdmind from "../../ui/sidebar/SidebarAdmin";

// styled
// import AppStyledLayout from "./style/AppStyledLayout";
// import StyledMain from "./style/StyledMain";
// import StyledContainer from "./style/StyledContainer";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <HeaderAdmin toggleSidebar={toggleSidebar} />
                <SidebarAdmin
                    isOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />

                <main className="pt-4 pb-12 lg:pr-64">
                    <div className="container mx-auto px-4 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* <AppMenuProviderUser>
                <AppStyledLayout className="">
                    <AppHeader />

                    <SidebarAdmin />

                    <StyledMain className="AppMain" id="AppMain">
                        <StyledContainer>
                            <Outlet />
                        </StyledContainer>
                    </StyledMain>
                </AppStyledLayout>
            </AppMenuProviderUser> */}
        </>
    );
}

export default AdminLayout;
