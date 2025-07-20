/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2, Save } from "lucide-react";

// api
import {
    publicGetChapterInQuranFetchEnrollStatus,
    publicGetEnrollmentStuentQuranPathById,
    publicUpdateStudentQuranSchoolEnrollment,
} from "../../../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../../../store/UserDataStore";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";

function StudentsEnrolledCreate() {
    const { quranpathId, chapterinquranId } = useParams();
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [enrollments, setEnrollments] = useState([]);
    const [enrolledStatus, setEnrolledStatus] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    //
    useEffect(() => {
        const fetchEnrollmentStuentQuranPath = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await publicGetEnrollmentStuentQuranPathById(quranpathId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب المشتركين"
                    );
                    navigate(
                        `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                    );
                } else {
                    setEnrollments(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب المشتركين"
                );
                setIsLoading(false);
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnrollmentStuentQuranPath();
    }, [chapterinquranId, navigate, quranpathId]);

    //
    const fetchCourseEnrollStatus = async (studentId, chapterinquranId) => {
        try {
            setIsLoading(true);
            setEnrolledStatus(null);

            const { data, error } =
                await publicGetChapterInQuranFetchEnrollStatus(
                    studentId,
                    chapterinquranId
                );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast(
                    "error",
                    error.message || "حدث خطأ أثناء جلب حالة الاشتراك"
                );
                return false;
                // console.log();
            } else {
                // console.log(``);
                if (data.bool === true) {
                    Toast("error", "هذا الطالب مشترك في هذه الفصل بالفعل ");
                    setEnrolledStatus("success");
                    return false;
                } else {
                    setEnrolledStatus("failure");
                    return true;
                }
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "حدث خطأ أثناء جلب حالة الاشتراك"
            );
            setIsLoading(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    //
    const handleAddStudentChapterInQuran = async (formData) => {
        try {
            setIsLoading(true);

            // First check enrollment status
            const canEnroll = await fetchCourseEnrollStatus(
                formData.enrollment,
                chapterinquranId
            );

            if (!canEnroll) {
                Toast("error", "هذا الطالب مشترك في هذه الفصل بالفعل ");
                return;
            }

            const sectionData = new FormData();
            // sectionData.append("enrollment", formData.enrollment);
            // sectionData.append("chapter_in_quran", +chapterinquranId || "");

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            const { data, error } =
                await publicUpdateStudentQuranSchoolEnrollment(
                    formData.enrollment,
                    chapterinquranId
                    // sectionData
                );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                } else if (error.message) {
                    Toast("error", error.message);
                }
                Toast("error", "حدث خطأ أثناء إضافة الطالب الي الفصل");
            } else {
                Toast("success", "تم إضافة الطالب الي الفصل بنجاح");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
            }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إضافة الطالب الي الفصل");
            navigate(
                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`enrollments`, enrollments);
    // console.log(`chapterinquranId`, typeof +chapterinquranId);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() =>
                                navigate(
                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة طالب الي الفصل
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(
                                handleAddStudentChapterInQuran
                            )}
                            className="space-y-6 flex flex-col gap-6"
                            encType="multipart/form-data"
                        >
                            {/* Students */}
                            <div>
                                <label
                                    htmlFor="enrollment"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    المشتركين*
                                </label>
                                <select
                                    id="enrollment"
                                    name="enrollment"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("enrollment", {
                                        required: "مطلوب اختيار طالب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">اختر الطالب</option>
                                    {enrollments?.map((enrollment, index) => (
                                        <option
                                            key={index}
                                            value={enrollment?.id}
                                        >
                                            {enrollment?.id}) - (
                                            {enrollment?.full_name}) - (
                                            {enrollment?.student?.full_name}) -
                                            ({enrollment?.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.enrollment && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.enrollment.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() => {
                                        navigate(
                                            `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                                        );
                                    }}
                                    disabled={isSubmitting || isLoading}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Save size={18} />
                                    {isSubmitting || isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ الاشتراك"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentsEnrolledCreate;
