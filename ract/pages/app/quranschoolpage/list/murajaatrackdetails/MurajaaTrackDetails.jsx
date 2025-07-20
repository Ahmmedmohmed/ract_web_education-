/* eslint-disable no-unused-vars */
import { useState } from "react";

// components
import MurajaaDetails from "./details/MurajaaDetails";
import MurajaaForm from "./form/MurajaaForm";

const MurajaaTrackDetails = ({ path }) => {
    // console.log(`path`, path);

    return (
        <>
            <MurajaaDetails path={path} />
            <MurajaaForm path={path} />
        </>
    );
};

export default MurajaaTrackDetails;
