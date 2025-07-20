// utils
import { App_User } from "../../utils/constants";

// component
import UserCertificatePage from "../../pages/user/certificate/UserCertificatePage";

export const user_certificate_route = [
    // ====================================================================
    // Details
    { path: `/${App_User}/certificate`, element: <UserCertificatePage /> },

    { path: `/${App_User}/certificate/`, element: <UserCertificatePage /> },
    { path: `/${App_User}/certificate-`, element: <UserCertificatePage /> },

    // ====================================================================
];
