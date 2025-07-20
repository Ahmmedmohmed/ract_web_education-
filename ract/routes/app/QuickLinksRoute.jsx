// component
import TermsAndConditions from "../../pages/app/quicklinks/TermsAndConditions";
import DeliveryPolicy from "../../pages/app/quicklinks/DeliveryPolicy";
import RefundPolicy from "../../pages/app/quicklinks/RefundPolicy";
import PrivacyPolicy from "../../pages/app/quicklinks/PrivacyPolicy";

export const quick_links_route = [
    // ====================================================================
    { path: "/termsandconditions", element: <TermsAndConditions /> },

    // ====================================================================
    { path: "/deliverypolicy", element: <DeliveryPolicy /> },

    // ====================================================================
    { path: "/refundpolicy", element: <RefundPolicy /> },

    // ====================================================================
    { path: "/privacypolicy", element: <PrivacyPolicy /> },
];
