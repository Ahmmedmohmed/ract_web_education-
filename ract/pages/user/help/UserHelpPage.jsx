/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Home, Plus } from "lucide-react";
import { useState } from "react";

// utils
import { App_User } from "../../../utils/constants";

// components
import SuggestionCard from "../../app/youTubesuggestions/card/SuggestionCard";

// assets
import error500 from "../../../assets/images/error/error-500.webp";

function UserHelpPage() {
    const navigate = useNavigate();
    const [suggestionResult, setSuggestionResult] = useState([
        {
            video_url: `https://www.youtube.com/watch?v=_y_ptIWYBh4&ab_channel=NewMediaAcademyLife`,
            title: `مراجعة`,
        },
        {
            video_url: `https://www.youtube.com/watch?v=_y_ptIWYBh4&ab_channel=NewMediaAcademyLife`,
            title: `مراجعة`,
        },
        {
            video_url: `https://www.youtube.com/watch?v=_y_ptIWYBh4&ab_channel=NewMediaAcademyLife`,
            title: `مراجعة`,
        },
    ]);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(`/${App_User}/home`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-black">
                            المساعدة
                        </h1>
                    </div>

                    {/* <Link
                        to={`/${App_User}/powerpointservices/create`}
                        className="px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all"
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة طلب بوربوينت جديدة
                    </Link> */}
                </div>

                <div className="related-posts mt-20" data-aos="fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {suggestionResult &&
                            suggestionResult?.map((blog, index) => (
                                <SuggestionCard blog={blog} key={index} />
                            ))}
                    </div>
                </div>
            </div>
        </>

        // <>
        //     <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        //         {/* <h1 className="text-9xl font-bold text-primary-600">404</h1> */}
        //         <div className="max-w-60 max-h-60">
        //             <img
        //                 src={error500}
        //                 alt={error500}
        //                 className="max-w-60 max-h-60"
        //                 onError={(e) => {
        //                     e.target.src = error500;
        //                     e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
        //                 }}
        //             />
        //         </div>

        //         <h2 className="text-2xl font-semibold mt-6 mb-2">
        //             الصفحة تحت الإنشاء
        //         </h2>

        //         <p className="text-gray-600 mb-8 max-w-md">
        //             عزيزي المستخدم الصفحة الحالية تحت الإنشاء برجاء الانتظار
        //             قليلأ.
        //         </p>

        //         <Link
        //             to={`/${App_User}/home`}
        //             className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-primary-700 transition"
        //         >
        //             <Home size={18} className="ml-2" />
        //             العودة إلى الصفحة الرئيسية
        //         </Link>
        //     </div>
        // </>
    );
}

export default UserHelpPage;
