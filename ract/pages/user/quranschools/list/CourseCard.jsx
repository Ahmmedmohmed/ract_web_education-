/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
    Clock,
    BookOpen,
    Banknote,
    BanknoteX,
    BanknoteArrowDown,
} from "lucide-react";

// Utils
import { App_User, nameMainColor } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function CourseCard({ course }) {
    // let  course  = enroll;
    // console.log(`enroll`, enroll);
    // console.log(`course->`, course?.chapter_in_quran);

    return (
        <>
            <Link
                to={`/${App_User}/quranschools/${course?.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
            >
                <div>
                    <div className="relative overflow-hidden">
                        <img
                            src={
                                course?.chapter_in_qurans?.image_url ||
                                course?.chapter_in_qurans?.image ||
                                noimage
                            }
                            alt={course?.chapter_in_qurans?.title}
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            className="w-full h-80 object-fill group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="flex items-center gap-2 text-white text-sm">
                                <Clock size={14} />
                                <span>{course?.duration}</span>
                            </div>
                        </div> */}
                    </div>

                    <div className="p-4">
                        <h3
                            className={`font-bold text-3xl text-gray-800 mb-2 group-hover:text-blue-500 transition-all duration-500`}
                        >
                            {course?.chapter_in_qurans?.title}
                        </h3>

                        <p className="text-gray-600 text-lg mb-3 line-clamp-2 truncate">
                            {course?.chapter_in_qurans?.description}
                        </p>

                        <div className="mb-4">
                            {/* المبلغ الكلي */}
                            <div className="flex items-center gap-2 text-gray-600 text-2xl">
                                <Banknote size={20} className="ml-2" />
                                <span>(المبلغ الكلي)</span>

                                <p
                                    // href={`mailto:${student?.student?.email}`}
                                    className={`hover:text-blue-600 transition-all duration-300 truncate`}
                                >
                                    {course?.total_amount}
                                </p>
                            </div>

                            {/* المبلغ المتبقي */}
                            <div className="flex items-center gap-2 text-gray-600 text-2xl">
                                <BanknoteX size={20} className="ml-2" />
                                <span>(المبلغ المتبقي)</span>

                                <p
                                    // href={`mailto:${student?.student?.email}`}
                                    className={`hover:text-blue-600 transition-all duration-300 truncate`}
                                >
                                    {course?.remaining_amount}
                                </p>
                            </div>

                            {/* المبلغ المدفوع */}
                            <div className="flex items-center gap-2 text-gray-600 text-2xl">
                                <BanknoteArrowDown size={20} className="ml-2" />
                                <span>(المبلغ المدفوع)</span>

                                <p
                                    // href={`mailto:${student?.student?.email}`}
                                    className={`hover:text-blue-600 transition-all duration-300 truncate`}
                                >
                                    {course?.paid_amount}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-lg">
                            {/* <div
                                className={`flex items-center gap-1 text-blue-600`}
                            >
                                <BookOpen size={16} />
                                <span>{course?.total_lesson} دروس</span>
                            </div> */}

                            {/* {course?.progress !== undefined && (
                                <div className="relative w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute top-0 left-0 h-full bg-blue-500 rounded-full`}
                                        style={{
                                            width: `${course?.progress}%`,
                                        }}
                                    ></div>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default CourseCard;
