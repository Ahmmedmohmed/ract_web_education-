/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2, Save } from "lucide-react";

// api
import {
    publicGetStudentsListAdmin,
    publicPostAddStudentEnrollCourse,
} from "../../../../../../api/public/authPublic";
import { adminGetCoursesAdmin } from "../../../../../../api/admin/authAdmin";
import { appGetCourseFetchEnrollStatus } from "../../../../../../api/app/authApp";

// store
import UserDataStore from "../../../../../../store/UserDataStore";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";

function StudentsEnrolledCreate() {
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolledStatus, setEnrolledStatus] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchCoursesAdmin = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await adminGetCoursesAdmin();

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب الدورات"
                    );
                } else {
                    setCourses(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message || "حدث خطأ أثناء جلب الدورات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchStudentsAdmin = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetStudentsListAdmin();

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الطلاب");
                } else {
                    setStudents(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message || "حدث خطأ أثناء جلب الطلاب"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoursesAdmin();
        fetchStudentsAdmin();
    }, []);

    const fetchCourseEnrollStatus = async (studentId, courseId) => {
        try {
            setIsLoading(true);
            setEnrolledStatus(null);

            const { data, error } = await appGetCourseFetchEnrollStatus(
                studentId,
                courseId
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
                    Toast("error", "هذا الطالب مشترك في هذه الدورة بالفعل ");
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

    const handleAddStudentCourse = async (formData) => {
        try {
            setIsLoading(true);
            // setEnrolledStatus("");

            // First check enrollment status
            const canEnroll = await fetchCourseEnrollStatus(
                formData.student,
                formData.course
            );

            if (!canEnroll) {
                Toast("error", "هذا الطالب مشترك في هذه الدورة بالفعل ");
                return;
            }

            const sectionData = new FormData();
            sectionData.append("student", formData.student);
            sectionData.append("course", formData.course);

            const { data, error } = await publicPostAddStudentEnrollCourse(
                sectionData
            );

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                } else if (error.message) {
                    Toast("error", error.message);
                }
                Toast("error", "حدث خطأ أثناء إضافة الطالب الي الدورة");
            } else {
                Toast("success", "تم إضافة الطالب الي الدورة بنجاح");
                navigate(`/${App_Admin}/courses`);
            }

            // console.log(`formData`, formData);
            // if (enrolledStatus === "success") {
            //     Toast("error", "هذا الطالب مشترك في هذه الدورة بالفعل ");
            //     // console.log(`enrolledStatus`, enrolledStatus);
            // } else if (enrolledStatus === "failure") {
            //     const { data, error } = await publicPostAddStudentEnrollCourse(
            //         sectionData
            //     );

            //     // console.log(`error`, error);
            //     // console.log(`data`, data);

            //     if (error) {
            //         if (error.image) {
            //             setErrorsMessage(error.image);
            //             Toast("error", error.image);
            //         } else if (error.message) {
            //             Toast("error", error.message);
            //         }
            //         Toast("error", "حدث خطأ أثناء إضافة الطالب الي الدورة");
            //         navigate(`/${App_Admin}/courses`);
            //     } else {
            //         Toast("success", "تم إضافة الطالب الي الدورة بنجاح");
            //         navigate(`/${App_Admin}/courses`);
            //     }
            // }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إضافة الطالب الي الدورة");
            navigate(`/${App_Admin}/courses`);
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

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() => navigate(`/${App_Admin}/courses`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة طالب الي دورة
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleAddStudentCourse)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Courses */}
                            <div>
                                <label
                                    htmlFor="course"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    الدورات*
                                </label>
                                <select
                                    id="course"
                                    name="course"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("course", {
                                        required: "مطلوب اختيار دورة",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">اختر الدورة</option>
                                    {courses?.map((course, index) => (
                                        <option key={index} value={course?.id}>
                                            {course?.id}) {course?.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.course && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.course.message}
                                    </p>
                                )}
                            </div>

                            {/* Students */}
                            <div>
                                <label
                                    htmlFor="student"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    الطلاب*
                                </label>
                                <select
                                    id="student"
                                    name="student"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("student", {
                                        required: "مطلوب اختيار طالب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">اختر الطالب</option>
                                    {students?.map((student, index) => (
                                        <option key={index} value={student?.id}>
                                            {student?.id}){" "}
                                            {student?.first_name +
                                                " " +
                                                student?.last_name}{" "}
                                            - ({student?.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.student && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.student.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() =>
                                        navigate(`/${App_Admin}/courses`)
                                    }
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
