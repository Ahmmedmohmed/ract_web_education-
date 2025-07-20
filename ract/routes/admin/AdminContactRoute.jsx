// utils
import { App_Admin } from "../../utils/constants";

// component
import ContactsAdminPage from "../../pages/admin/contacts/ContactsAdminPage";

export const admin_contact_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/contact`, element: <ContactsAdminPage /> },

    { path: `/${App_Admin}/contact/`, element: <ContactsAdminPage /> },
    { path: `/${App_Admin}/contact-`, element: <ContactsAdminPage /> },

    { path: `/${App_Admin}/contact/us`, element: <ContactsAdminPage /> },
    { path: `/${App_Admin}/contact-us`, element: <ContactsAdminPage /> },
    { path: `/${App_Admin}/contact/us/`, element: <ContactsAdminPage /> },
    { path: `/${App_Admin}/contact-us/`, element: <ContactsAdminPage /> },
    { path: `/${App_Admin}/contact/us-`, element: <ContactsAdminPage /> },
    { path: `/${App_Admin}/contact-us-`, element: <ContactsAdminPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
