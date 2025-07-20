// hooks
import GoToProfile from "../../../hooks/GoToProfile";

// components
import Login from "./Login";

function LoginPage() {
    return (
        <>
            <GoToProfile />
            <Login />
        </>
    );
}

export default LoginPage;
