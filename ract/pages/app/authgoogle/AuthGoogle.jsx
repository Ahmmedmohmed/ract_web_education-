/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// api
import { publicAuthGoogleLogin } from "../../../api/public/authPublic";

// plugin
import Toast from "../../../plugin/Toast";

// utils
import {
    API_BASE_URL,
    App_User,
    nameMainColor,
} from "../../../utils/constants";

function AuthGoogle() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        // console.log(`hashParams`, hashParams);
        // console.log(`accessToken`, accessToken);

        const handleGoogleLogin = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicAuthGoogleLogin(
                    accessToken
                );

                // console.log(`data`, data);
                // console.log(`error`, error);

                if (error) {
                    if (error?.message) {
                        Toast("error", `${error?.message}.`);
                    }
                    navigate(`/`);
                    setIsLoading(false);
                } else {
                    Toast(
                        "success",
                        `تم تسجيل الدخول بنجاح.`
                        // `${data?.message || "Student Login Successfully."}`
                    );
                    setIsLoading(false);
                    navigate(`/${App_User}/home`);
                }
            } catch (error) {
                console.log(`Error`, error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        if (accessToken) {
            handleGoogleLogin();
        }
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-dvh z-20">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }
    return <>{/* <div>ddd</div> */}</>;
}

export default AuthGoogle;
