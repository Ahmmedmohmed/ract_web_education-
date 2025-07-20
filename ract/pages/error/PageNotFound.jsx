/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";

// ui component
import Header from "../../ui/header/app/Header";
import Main from "../../ui/main/Main";
import NotFound from "./NotFound";
import Footer from "../../ui/footer/Footer";

function PageNotFound() {
    return (
        <>
            <Header />
            <Main>
                <NotFound />
            </Main>
            <Footer />
        </>
    );
}

export default PageNotFound;
