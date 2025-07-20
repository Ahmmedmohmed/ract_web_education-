/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

// components
import HifzDetails from "./details/HifzDetails";
import HifzForm from "./form/HifzForm";

const HifzTrackDetails = ({ path }) => {
    // console.log(`path`, path);

    return (
        <>
            <HifzDetails path={path} />

            <HifzForm path={path} />
        </>
    );
};

export default HifzTrackDetails;
