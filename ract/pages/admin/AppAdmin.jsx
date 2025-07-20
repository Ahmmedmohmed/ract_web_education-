// component
import AdminHome from "./home/AdminHome";

// ui
import Row from "../../ui/global/Row";
import MainTitle from "../../ui/title/MainTitle";

function AppAdmin() {
    return (
        <>
            <Row>
                <MainTitle data-aos="fade-down">{`الرئيسية`}</MainTitle>
            </Row>

            <Row>
                <AdminHome />
            </Row>
        </>
    );
}

export default AppAdmin;
