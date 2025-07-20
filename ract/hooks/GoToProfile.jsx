import React from "react";
import { Navigate } from "react-router-dom";

// store
import UserDataStore from "../store/UserDataStore";

// utils
import { App_User } from "../utils/constants";

function GoToProfile() {
    let { userData } = UserDataStore();

    if (userData && userData?.is_verified == true) {
        return <Navigate to={`/${App_User}/home`} />;
    }
    return null;
}

export default GoToProfile;
