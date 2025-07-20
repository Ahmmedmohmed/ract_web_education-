/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

// utils
import { App_Admin, nameMainColor } from "../../../utils/constants";

// assets
import error500 from "../../../assets/images/error/error-500.webp";

function AdminHelpPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
                {/* <h1 className="text-9xl font-bold text-primary-600">404</h1> */}
                <div className="max-w-60 max-h-60">
                    <img
                        src={error500}
                        alt={error500}
                        className="max-w-60 max-h-60"
                    />
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-2">
                    الصفحة تحت الإنشاء
                </h2>

                <p className="text-gray-600 mb-8 max-w-md">
                    عزيزي المستخدم الصفحة الحالية تحت الإنشاء برجاء الانتظار
                    قليلأ.
                </p>

                <Link
                    to={`/${App_Admin}/home`}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-primary-700 transition`}
                >
                    <Home size={18} className="ml-2" />
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        </>
    );
}

export default AdminHelpPage;
