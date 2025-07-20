/* eslint-disable no-unused-vars */

// components
import IjazahDetails from "./details/IjazahDetails";
import IjazahForm from "./form/IjazahForm";

const IjazahTrackDetails = ({ path }) => {
    return (
        <>
            <IjazahDetails path={path} />
            <IjazahForm path={path} />
        </>
    );
};

export default IjazahTrackDetails;
