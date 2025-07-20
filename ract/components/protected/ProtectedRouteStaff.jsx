/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";

// store
import UserDataStore from "../../store/UserDataStore";

// utils
import {
    App_Admin,
    App_Teacher,
    App_Staff,
    App_User,
} from "../../utils/constants";

const ProtectedRouteStaff = ({ children }) => {
    let { userData } = UserDataStore();

    // if (!userData || userData === undefined) {
    //     return <Navigate to={`/login`} />;
    // }

    // //
    if (userData?.is_verified == false) {
        return <Navigate to={`/verifyaccount`} />;
    }

    if (userData?.is_admin == true) {
        return <Navigate to={`/${App_Admin}/home`} />;
    }

    if (userData?.is_teacher == true) {
        return <Navigate to={`/${App_Teacher}/home`} />;
    }

    // if (userData?.is_staff == true) {
    //     return <Navigate to={`/${App_Staff}/home`} />;
    // }

    if (userData?.is_student == true) {
        return <Navigate to={`/${App_User}/home`} />;
    }

    return <>{children}</>;
};

// Export the 'ProtectedRouteStaff' component to make it available for use in other parts of the application.
export default ProtectedRouteStaff;
