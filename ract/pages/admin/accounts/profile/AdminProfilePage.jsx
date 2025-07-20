/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// utils
import { App_Admin } from "../../../../utils/constants";

// components
import UpdateProfile from "./update/UpdateProfile";

function AdminProfilePage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="">
                <div className="flex items-center justify-start mb-6">
                    <button
                        onClick={() => {
                            navigate(`/${App_Admin}/home`);
                            // moveBack();
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <h1 className="text-3xl font-bold mr-2 text-black">
                        الملف الشخصي
                    </h1>
                </div>

                <UpdateProfile />
            </div>
        </>
    );
}

export default AdminProfilePage;
