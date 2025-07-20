// utils
import { App_User } from "../../utils/constants";

// component
import UserContactPage from "../../pages/user/contact/UserContactPage";
import ContactCreate from "../../pages/user/contact/create/ContactCreate";
import ContactUpdate from "../../pages/user/contact/update/ContactUpdate";

export const user_contact_route = [
    // =====================================================================
    // List
    { path: `/${App_User}/contact`, element: <UserContactPage /> },

    { path: `/${App_User}/contact/`, element: <UserContactPage /> },
    { path: `/${App_User}/contact-`, element: <UserContactPage /> },

    { path: `/${App_User}/contact/us`, element: <UserContactPage /> },
    { path: `/${App_User}/contact-us`, element: <UserContactPage /> },
    { path: `/${App_User}/contact/us/`, element: <UserContactPage /> },
    { path: `/${App_User}/contact-us/`, element: <UserContactPage /> },
    { path: `/${App_User}/contact/us-`, element: <UserContactPage /> },
    { path: `/${App_User}/contact-us-`, element: <UserContactPage /> },

    // =====================================================================
    // Create
    { path: `/${App_User}/contact/create`, element: <ContactCreate /> },

    { path: `/${App_User}/contact/create/`, element: <ContactCreate /> },
    { path: `/${App_User}/contact/create-`, element: <ContactCreate /> },

    // =====================================================================
    // Details

    // =====================================================================
    // Update
    {
        path: `/${App_User}/contact/update/:contactId`,
        element: <ContactUpdate />,
    },

    {
        path: `/${App_User}/contact/update/:contactId/`,
        element: <ContactUpdate />,
    },
    {
        path: `/${App_User}/contact/update/:contactId-`,
        element: <ContactUpdate />,
    },

    // =====================================================================
];
