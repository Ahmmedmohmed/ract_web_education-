/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    ArrowRight,
    FileText,
    Upload,
    Trash,
    Eye,
    EyeOff,
    Save,
    Loader2,
    Download,
    File,
    Paperclip,
} from "lucide-react";

// api
import {
    userCreateLessonsStudentAnswer,
    userFetchStudentAnswerInLessonStatus,
} from "../../../../api/user/authUser";
import { publicGetLessonInCourseById } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function Duties() {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();

    let { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [lesson, setLesson] = useState([]);
    const [enrolledStatus, setEnrolledStatus] = useState([]);

    const [isVisible, setIsVisible] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({});

    // Stuts
    useEffect(() => {
        const fetchStudentAnswerInessonStatus = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await userFetchStudentAnswerInLessonStatus(
                        userData?.id,
                        lessonId
                    );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب حالة ارسال الواجب"
                    );
                    navigate(`/${App_User}/courses/${courseId}`);
                    // console.log();
                } else {
                    // console.log(``);
                    if (data.bool == true) {
                        setEnrolledStatus("success");
                    }
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب حالة ارسال الواجب"
                );
                navigate(`/${App_User}/courses/${courseId}`);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudentAnswerInessonStatus();
    }, [courseId, lessonId, navigate, userData?.id]);

    // Lesson
    useEffect(() => {
        const fetchGetLessonInCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetLessonInCourseById(
                    lessonId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدرس");
                    navigate(`/${App_User}/courses/${courseId}`);
                } else {
                    // Set form values
                    setLesson(data);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدرس");
                navigate(`/${App_User}/courses/${courseId}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGetLessonInCourse();
    }, [courseId, lessonId, navigate, userData?.id]);

    // Files
    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                id: `file-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                name: file.name,
                size: file.size,
                type: file.type,
                file: file,
                url: URL.createObjectURL(file),
            }));
            setUploadedFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const handleDeleteFile = (fileId) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
    };

    // 1;
    const onSubmit = async (dataForm) => {
        try {
            setIsLoading(true);

            const formData = new FormData();

            // البيانات الأساسية
            formData.append("student", userData?.id);
            formData.append("lesson", lessonId);

            formData.append("is_visible", isVisible);

            // تحويل الملفات إلى Base64
            const filesBase64 = await Promise.all(
                uploadedFiles.map((file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () =>
                            resolve({
                                id: file.id,
                                name: file.name,
                                type: file.type,
                                content: reader.result,
                            });
                        reader.onerror = reject;
                        reader.readAsDataURL(file.file);
                    });
                })
            );

            // إضافة الملفات كـ JSON
            formData.append("uploaded_files", JSON.stringify(filesBase64));

            // for (let [key, value] of formData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            // إرسال البيانات
            const { data, error } = await userCreateLessonsStudentAnswer(
                formData
            );

            // console.log(`error`, error);
            // console.log(`responseData`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء إرسال الواجب");
            } else {
                Toast("success", "تم إرسال الواجب بنجاح");
                // navigate(-1);
                navigate(`/${App_User}/courses/${courseId}`);
            }
        } catch (error) {
            console.error("Error:", error);
            Toast("error", "حدث خطأ غير متوقع");
            navigate(`/${App_User}/courses/${courseId}`);
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
    // console.log(`courseId`, courseId);
    // console.log(`lessonId`, lessonId);
    // console.log(`userData`, userData?.id);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() =>
                                navigate(`/${App_User}/courses/${courseId}`)
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إرسال الواجب - تحميل نموذج الاجابة
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        {enrolledStatus === "success" ? (
                            <div>
                                {/*  */}
                                {lesson?.answer_form_pdf && (
                                    <li>
                                        <a
                                            href={lesson?.answer_form_pdf}
                                            target="_blank"
                                            download={true}
                                            className={`w-max flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                        >
                                            <span>تحميل ملف الاجابات PDF</span>

                                            <Download size={18} />
                                        </a>
                                    </li>
                                )}

                                {/*  */}
                                {lesson?.answer_form_pdf_url && (
                                    <li>
                                        <a
                                            href={lesson?.answer_form_pdf_url}
                                            target="_blank"
                                            download={true}
                                            className={`w-max flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                        >
                                            <span>تحميل ملف الاجابات PDF</span>

                                            <Download size={18} />
                                        </a>
                                    </li>
                                )}

                                {/* <div className="flex items-center justify-center gap-2">
                                    {lesson?.answer_form_pdf ? (
                                        <a
                                            href={lesson?.answer_form_pdf}
                                            target="_blank"
                                            download={true}
                                            className="flex items-center justify-center gap-2 font-bold text-black transition-all duration-500 hover:text-blue-500 hover:transition-all hover:duration-500"
                                        >
                                            <Download
                                                size={16}
                                                // className="ml-1"
                                            />

                                            <span>تحميل ملف ال PDF</span>
                                        </a>
                                    ) : (
                                        <>
                                            <File
                                                size={16}
                                                // className="ml-1"
                                            />
                                            <span>لا يوجد ملف PDF</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    {lesson?.answer_form_pdf_url ? (
                                        <a
                                            href={lesson?.answer_form_pdf_url}
                                            target="_blank"
                                            download={true}
                                            className="flex items-center justify-center gap-2 font-bold text-black transition-all duration-500 hover:text-blue-500 hover:transition-all hover:duration-500"
                                        >
                                            <Download
                                                size={16}
                                                // className="ml-1"
                                            />

                                            <span>تحميل رابط ال PDF</span>
                                        </a>
                                    ) : (
                                        <>
                                            <Paperclip
                                                size={16}
                                                // className="ml-1"
                                            />
                                            <span>لا يوجد رابط PDF</span>
                                        </>
                                    )}
                                </div> */}
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6 flex flex-col gap-6"
                            >
                                {/* uploaded_files */}
                                <div className="border-t border-gray-200 pt-4 mt-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-black">
                                            الملفات المرفقة
                                        </h4>
                                    </div>

                                    <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file-upload"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                            multiple
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="flex flex-col items-center justify-center cursor-pointer"
                                        >
                                            <Upload
                                                size={24}
                                                className="text-gray-400 mb-2"
                                            />
                                            <span
                                                className={`text-sm font-medium text-blue-600`}
                                            >
                                                اختر ملفات للرفع
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">
                                                يمكنك اختيار عدة ملفات في نفس
                                                الوقت
                                            </span>
                                        </label>
                                    </div>

                                    {uploadedFiles.length > 0 && (
                                        <div className="space-y-2 my-2">
                                            <h5 className="text-black text-md font-medium mt-5 mb-2">
                                                الملفات المختارة:
                                            </h5>

                                            <div className="flex flex-col gap-4">
                                                {uploadedFiles?.map(
                                                    (file, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between p-2 bg-gray-50 border border-gray-400 rounded shadow-sm"
                                                        >
                                                            <div className="flex items-center truncate">
                                                                <FileText
                                                                    size={16}
                                                                    className={`ml-2 text-blue-500 `}
                                                                />

                                                                <span
                                                                    className={`text-sm truncate text-blue-500`}
                                                                >
                                                                    {file.name}
                                                                </span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDeleteFile(
                                                                        file.id
                                                                    )
                                                                }
                                                                className="p-1 text-gray-500 hover:text-red-600 rounded"
                                                                disabled={
                                                                    isSubmitting ||
                                                                    isLoading
                                                                }
                                                            >
                                                                <Trash
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Reply and Visibility Toggles */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsVisible(!isVisible)}
                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                                            isVisible
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {isVisible ? (
                                            <Eye
                                                size={16}
                                                className="text-blue-600"
                                            />
                                        ) : (
                                            <EyeOff
                                                size={16}
                                                className="text-gray-600"
                                            />
                                        )}
                                        {/* {console.log(`isVisible`,isVisible)} */}
                                        {isVisible ? "ظاهر" : "مخفي"}
                                    </button>
                                </div>

                                <div className="mt-8 flex justify-end gap-4  pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                        onClick={() => {
                                            // navigate(-1);
                                            navigate(
                                                `/${App_User}/courses/${courseId}`
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
                                            ? "جاري الارسال..."
                                            : "إرسال الواجب"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Duties;
