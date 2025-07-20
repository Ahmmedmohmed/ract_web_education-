// component
import UserHome from "./home/UserHome";

// ui
import Row from "../../ui/global/Row";
import MainTitle from "../../ui/title/MainTitle";

function AppUser() {
    return (
        <>
            <Row>
                <MainTitle data-aos="fade-down">{`الرئيسية`}</MainTitle>
            </Row>

            <Row>
                <UserHome />
            </Row>
        </>
    );
}

export default AppUser;
