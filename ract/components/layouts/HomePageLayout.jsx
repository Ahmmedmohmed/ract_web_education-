/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Outlet } from "react-router-dom";

// ui component
// import Goicon from "../../ui/goicon/GoIcon";
import Header from "../../ui/header/app/Header";
import Footer from "../../ui/footer/Footer";
import Main from "../../ui/main/Main";
import ScrollToTopButton from "../../ui/scrolltotop/ScrollToTopButton";
import IconWhats from "../../ui/iconwhats/IconWhats";
import Preloader from "../../ui/preloader/Preloader";

function HomePageLayout() {
    return (
        <>
            {/* <Preloader /> */}
            <ScrollToTopButton />
            <IconWhats />
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    );
}

export default HomePageLayout;
