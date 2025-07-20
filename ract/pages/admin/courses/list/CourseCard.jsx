/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";

// Utils
import { App_User } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function CourseCard({ course }) {
    // console.log(`www`, course?.progress);
    return (
        <>
            <Link
                to={`/${App_User}/courses/${course?.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
            >
                <div className="relative overflow-hidden">
                    <img
                        src={course?.image || noimage}
                        alt={course?.title}
                        onError={(e) => {
                            e.target.src = noimage;
                            e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                        }}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center gap-2 text-white text-sm">
                            <Clock size={14} />
                            <span>{course?.duration}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {course?.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course?.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-blue-600">
                            <BookOpen size={14} />
                            <span>{course?.lessonCount} دروس</span>
                        </div>

                        {course?.progress !== undefined && (
                            <div className="relative w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                    style={{ width: `${course?.progress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </>
    );
}

export default CourseCard;
