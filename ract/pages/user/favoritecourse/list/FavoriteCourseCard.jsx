/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, BookOpen, Heart, Users } from "lucide-react";
import { FaHeart } from "react-icons/fa";

// api
import { userDeleteStudentFavoriteCourse } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// Utils
import { App_User, nameMainColor } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function FavoriteCourseCard({ enroll }) {
    let { course } = enroll;

    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();

    const [isLoading, setIsLoading] = useState(true);
    const [errorsMessage, setErrorsMessage] = useState("");

    const [favoriteStatus, setFavoriteStatus] = useState("");

    useEffect(() => {
        //
    }, [favoriteStatus]);

    const removeFavoriteCourse = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await userDeleteStudentFavoriteCourse(
                userData?.id,
                course?.id
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast(
                    "error",
                    error.message || "حدث خطأ أثناء حذف حالة التفضيل"
                );
                // console.log();
            } else {
                // console.log(``);
                Toast("success", "تم حذف الدورة من المفضلات بنجاح");

                setFavoriteStatus("success");
                // navigate(0); 
            }
        } catch (error) {
            setErrorsMessage(
                error.response?.data?.message ||
                    "حدث خطأ أثناء جلب حالة التفضيل"
            );
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (favoriteStatus === "success") {
        return null; // أو يمكنك إرجاع عنصر فارغ
    }

    // console.log(`favoriteStatus`, favoriteStatus);

    return (
        <>
            <div
                className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group
                    
                    `}
                // ${favoriteStatus === "success" ? "hidden" : ""}
                //
            >
                <div>
                    <div className="relative overflow-hidden">
                        <img
                            src={course?.image_url || course?.image || noimage}
                            alt={course?.title}
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            className="w-full h-80 object-fill group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="flex items-center gap-2 text-white text-sm">
                                <Clock size={14} />
                                <span>{course?.duration}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="border border-gray-400 rounded-2xl text-center flex flex-col items-center justify-center gap-4 py-2">
                            <h3 className="h3">
                                <Link
                                    className={`card-title truncate text-4xl text-blue-500 group-hover:text-blue-600 transition-all duration-500 line-clamp-1`}
                                >
                                    {course?.title}
                                </Link>
                            </h3>

                            <div className="wrapper flex items-center gap-4 text-2xl  line-clamp-1">
                                <p className="rating-text text-black font-bold">
                                    {course?.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-4">
                            <div className="card-meta-item flex items-center gap-2 text-3xl">
                                <Users size={30} />

                                <span className={`span text-blue-500`}>
                                    {course?.total_enrolled_students}
                                </span>
                            </div>

                            <div className="flex justify-end items-center gap-2 ">
                                <div className="flex gap-4">
                                    <button
                                        className="text-amber-400 hover:text-amber-500 transition-colors duration-500"
                                        onClick={() => {
                                            //
                                            removeFavoriteCourse();
                                        }}
                                    >
                                        <FaHeart size={30} />
                                    </button>
                                </div>

                                <button
                                    className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-red-600 transition-colors duration-500"
                                    onClick={() => {
                                        if (course?.is_live) {
                                            navigate(
                                                `/coursesislive/${course?.id}`
                                            );
                                        } else {
                                            navigate(`/courses/${course?.id}`);
                                        }
                                    }}
                                >
                                    اشترك الآن
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FavoriteCourseCard;
