/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useState } from "react";

// context
import { AppMenuProviderUser } from "../../contexts/AppMenuContextUser";

// style
import AppStyledLayout from "./style/AppStyledLayout";
import StyledMain from "./style/StyledMain";
import StyledContainer from "./style/StyledContainer";
import HeaderUser from "../../ui/header/user/HeaderUser";
import SidebarUser from "../../ui/sidebar/user/SidebarUser";

// ui component
import HeaderUse from "../../ui/header/AppHeader";
import SidebarUse from "../../ui/sidebar/SidebarUser";
// import AppSidebar from "../../ui/sidebar/AppSidebar";

// const Main = styled.main`
//     overflow: hidden;
// `;

// const StyledAppLayout = styled.div`
//     display: grid;
//     /* grid-template-columns: 26rem 1fr; */
//     grid-template-columns: auto 1fr;
//     grid-template-rows: auto 1fr;

//     /* height: 100vh; */
//     min-height: 100dvh;
//     position: relative;
//     /* scroll-behavior: smooth;
//     overflow-y: scroll; */

//     @media (max-width: 767px) {
//         grid-template-columns: 1fr;
//     }
// `;

// const Main = styled.main`
//     /* background-color: var(--color-grey-50); */
//     /* padding: 4rem 4.8rem 6.4rem; */
//     padding: 4rem 3rem 6.4rem;
//     overflow: auto;
//     /* start max 767px */

//     @media (max-width: 767px) {
//         padding: 2rem 2.8rem 3.4rem;
//     }
// `;

// const Container = styled.div`
//     /* max-width: 120rem; */
//     margin: 0 auto;
//     display: flex;
//     flex-direction: column;
//     gap: 3.2rem;
// `;

function UserLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <HeaderUser toggleSidebar={toggleSidebar} />
                <SidebarUser
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

                    <SidebarUser />

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

export default UserLayout;
