/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    ArrowRight,
    Video,
    FileText,
    Upload,
    Plus,
    Trash,
    AlertTriangle,
    Eye,
    EyeOff,
    Save,
    Check,
    MessageSquare,
    Unlock,
    Lock,
    X,
} from "lucide-react";

// api
import { publicCreateLessonInCourse } from "../../../../../../api/public/authPublic";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";

function CourseLessonsCreate() {
    const navigate = useNavigate();
    const { courseId, sectionId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isFree, setIsFree] = useState(false);

    const [videoPreview, setVideoPreview] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [questions, setQuestions] = useState([
        {
            id: `q-${Date.now()}`,
            question_type: "text",
            text: "",
            image_url: "",
            image: null,
            choices: [
                { text: "a", is_correct: true },
                { text: "b", is_correct: false },
                { text: "c", is_correct: false },
                { text: "d", is_correct: false },
            ],
            correct_answer: 0,
        },
    ]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const filePDFInputRef = useRef(null);
    const [uploadedFilePDF, setUploadedFilePDF] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        // defaultValues: {
        //     title: "",
        //     type: "video",
        //     duration: "",
        //     description: "",
        //     url: "",
        //     videoSource: "url",
        // },
    });

    const selectedType = watch("type");
    const selectedVideoSource = watch("videoSource");

    // Video
    const handleVideoFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
            setVideoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
            // تنظيف URLs الصور في الأسئلة
            questions.forEach((q) => {
                if (q.image_url && q.image) {
                    URL.revokeObjectURL(q.image_url);
                }
            });
        };
    }, [videoPreview, questions]);

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

    // Question
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: `q-${Date.now()}`,
                question_type: "text",
                text: "",
                image_url: "",
                image: null,
                // options: ["", "", "", ""],
                choices: [
                    { text: "a", is_correct: true },
                    { text: "b", is_correct: false },
                    { text: "c", is_correct: false },
                    { text: "d", is_correct: false },
                ],
                correct_answer: 0,
            },
        ]);
    };

    const confirmDeleteQuestion = (questionId) => {
        if (questions.length <= 1) return;
        setQuestionToDelete(questionId);
        setShowDeleteConfirm(true);
    };

    const handleDeleteQuestion = () => {
        if (!questionToDelete) return;
        setQuestions(questions.filter((q) => q.id !== questionToDelete));
        setShowDeleteConfirm(false);
        setQuestionToDelete(null);
    };

    const handleQuestionChange = (questionId, field, value) => {
        setQuestions(
            questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
        );
        // console.log(`questionId, field, value`, questionId, field, value);
    };

    const handleQuestionTypeChange = (questionId, question_type) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    let updatedQuestion = { ...q, question_type };
                    if (question_type === "text") {
                        updatedQuestion.image_url = "";
                        updatedQuestion.image = null;
                    } else if (question_type === "image-url") {
                        updatedQuestion.image = null;
                    } else if (question_type === "image-upload") {
                        updatedQuestion.image_url = "";
                    }
                    return updatedQuestion;
                }
                return q;
            })
        );
    };

    const handleQuestionImageUpload = (questionId, e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log(`file----`, file);

            setQuestions(
                questions.map((q) => {
                    // console.log(`q`, q);
                    if (q.id === questionId) {
                        return {
                            ...q,
                            image: file,
                            // image: imagefile,
                            image_url: URL.createObjectURL(file),
                            // image_url: imageUrl,
                        };
                    }
                    return q;
                })
            );
        }
    };

    const handleOptionChange = (questionId, optionIndex, value) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = [...q.choices];
                    newOptions.forEach((option) => (option.is_correct = false));
                    newOptions[optionIndex].text = value;
                    newOptions[optionIndex].is_correct = true;
                    return { ...q, choices: newOptions };
                }
                return q;
            })
        );
        // console.log(`q`, questions);
    };

    const handleCorrectAnswerChange = (questionId, correctAnswer) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newQuestion = {
                        ...q,
                    };
                    // correct_answer: parseInt(correctAnswer),
                    newQuestion.correct_answer = parseInt(correctAnswer);
                    newQuestion.choices.forEach(
                        (option) => (option.is_correct = false)
                    );
                    newQuestion.choices[correctAnswer].is_correct = true;

                    return { ...newQuestion };
                }
                return q;
            })
        );
    };

    const handleFilePDFUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFilePDF(file);
        // console.log(`file`, file);
    };

    // 1;
    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const formData = new FormData();

            // البيانات الأساسية
            // formData.append("course", courseId);
            formData.append("section", sectionId);
            formData.append("type", data.type || "video");

            formData.append("title", data.title);
            formData.append("description", data.description || "");
            formData.append("duration", data.duration || "");

            formData.append(
                "warning_message_user",
                data.warning_message_user || ""
            );
            formData.append(
                "rush_watch_lessons",
                data.rush_watch_lessons || ""
            );

            formData.append("is_visible", isVisible);
            formData.append("is_free", isFree);

            formData.append("video_url", data.video_url || "");
            if (videoFile) {
                formData.append("video_file", videoFile);
            }

            if (uploadedFilePDF) {
                formData.append("answer_form_pdf", uploadedFilePDF);
            }
            formData.append(
                "answer_form_pdf_url",
                formData.answer_form_pdf_url || ""
            );

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

            if (
                questions[0].text.trim() !== "" ||
                questions[0].image_url.trim() !== "" ||
                questions[0].image
            ) {
                // console.log(``);
                formData.append("questions", JSON.stringify(questions));
            }
            formData.append(
                "questions_google_iframe",
                data.questions_google_iframe || ""
            );
            formData.append(
                "questions_google_url",
                data.questions_google_url || ""
            );

            // console.log(`questions`, questions);
            // formData.append("questions", JSON.stringify(questions));

            // for (let [key, value] of formData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            // إرسال البيانات
            const { data: responseData, error } =
                await publicCreateLessonInCourse(sectionId, formData);

            // console.log(`error`, error);
            // console.log(`responseData`, responseData);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء إنشاء الدرس");
            } else {
                Toast("success", "تم إنشاء الدرس بنجاح");
                // navigate(-1);
                navigate(
                    `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
                );
            }
        } catch (error) {
            console.error("Error:", error);
            Toast("error", "حدث خطأ غير متوقع");
            navigate(
                `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
            );
        } finally {
            setIsLoading(false);
        }
    };

    // console.log(`questions`, questions);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() =>
                                navigate(
                                    `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة درس جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Type */}
                            {/* <div>
                                <label
                                    htmlFor="type"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    نوع الدرس*
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("type", {
                                        required: "نوع الدرس مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="video">فيديو</option>
                                    <option value="assessment">اختبار</option>
                                    <option value="document">مستند</option>
                                </select>
                            </div> */}

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    عنوان الدرس*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: الشرح - الجزء الأول"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "عنوان الدرس مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors?.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors?.title?.message}
                                    </p>
                                )}
                            </div>

                            {/* description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    وصف الدرس
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    placeholder="مثال: مقدمة في أساسيات المنطق والتفكير المنطقي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-40 resize-none`}
                                    {...register("description")}
                                    disabled={isSubmitting || isLoading}
                                />
                            </div>

                            {/* Warning Message User */}
                            <div>
                                <label
                                    htmlFor="warning_message_user"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    رسالة تحذير المستخدم عدم تسجيل الفيديو
                                </label>
                                <textarea
                                    id="warning_message_user"
                                    name="warning_message_user"
                                    rows={3}
                                    placeholder="مثال: ما تفعله مخالف للدين والاخلاق"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-40 resize-none`}
                                    {...register("warning_message_user")}
                                    disabled={isSubmitting || isLoading}
                                />
                            </div>

                            {/* Rush Watch Lessons */}
                            <div>
                                <label
                                    htmlFor="rush_watch_lessons"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    رسالة عدم الاستعجال في مشاهدة الددروس
                                </label>
                                <textarea
                                    id="rush_watch_lessons"
                                    name="rush_watch_lessons"
                                    rows={3}
                                    placeholder="مثال: تذكر الصبر مفتاح الفرج"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-40 resize-none`}
                                    {...register("rush_watch_lessons")}
                                    disabled={isSubmitting || isLoading}
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label
                                    htmlFor="duration"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    المدة
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="مثال: 00:30:00"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("duration")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                <p className="text-gray-500 text-xs mt-1">
                                    صيغة الوقت: ساعة:دقيقة:ثانية
                                </p>
                            </div>

                            {/* {selectedType === "video" && ( */}
                            <div className="space-y-3 flex flex-col gap-6 mb-4">
                                <div>
                                    <label
                                        htmlFor="video_url"
                                        className="block text-lg font-bold text-gray-700 mb-2"
                                    >
                                        رابط الفيديو
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="video_url"
                                            id="video_url"
                                            name="video_url"
                                            placeholder="مثال: https://youtube.com/watch?v=..."
                                            className={`w-full p-3 border ${
                                                errors.video_url
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                            {...register("video_url", {
                                                validate: {
                                                    validVideoUrl: (value) => {
                                                        if (
                                                            !value ||
                                                            selectedType !==
                                                                "video"
                                                        )
                                                            return true;
                                                        const youtubeRegex =
                                                            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
                                                        const vimeoRegex =
                                                            /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;
                                                        const generalVideoRegex =
                                                            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
                                                        return (
                                                            youtubeRegex.test(
                                                                value
                                                            ) ||
                                                            vimeoRegex.test(
                                                                value
                                                            ) ||
                                                            generalVideoRegex.test(
                                                                value
                                                            ) ||
                                                            "يرجى إدخال رابط فيديو صالح (YouTube أو Vimeo أو منصة أخرى)"
                                                        );
                                                    },
                                                },
                                            })}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                    </div>
                                    {errors?.video_url && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.video_url.message}
                                        </p>
                                    )}
                                    <p className="text-gray-500 text-xs mt-1">
                                        يمكنك إضافة رابط من YouTube أو Vimeo أو
                                        أي منصة أخرى
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor="video_file"
                                        className="block text-lg font-bold mb-2 text-black"
                                    >
                                        فيديو الدورة
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            {videoPreview ? (
                                                <div className="mb-3">
                                                    <video
                                                        src={videoPreview}
                                                        controls
                                                        className="mx-auto h-32 w-auto object-cover rounded-md"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mx-auto h-20 w-20 text-gray-400">
                                                    <Upload
                                                        size={40}
                                                        className="mx-auto"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="video_file"
                                                    className={`relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 transition-all`}
                                                >
                                                    <span>قم برفع فيديو</span>
                                                    <input
                                                        type="file"
                                                        id="video_file"
                                                        name="video_file"
                                                        className="sr-only"
                                                        accept="video/*"
                                                        onChange={
                                                            handleVideoFileChange
                                                        }
                                                        autoComplete="off"
                                                        disabled={
                                                            isSubmitting ||
                                                            isLoading
                                                        }
                                                    />
                                                </label>
                                                <p className="pr-1">
                                                    {" "}
                                                    أو اسحب وأفلت{" "}
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {" "}
                                                الحد الأقصى لحجم الملف: 500
                                                ميجابايت{" "}
                                            </p>
                                        </div>
                                    </div>
                                    {errors.video && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {" "}
                                            {errors.video.message}{" "}
                                        </p>
                                    )}
                                </div>

                                {/* <div>
                                        <label
                                            htmlFor="video-file"
                                            className="block text-lg font-bold text-gray-700 mb-2"
                                        >
                                            ملف الفيديو
                                        </label>
                                        <input
                                            type="file"
                                            id="video-file"
                                            accept="video/*"
                                            onChange={handleVideoFileChange}
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700 
                                                file:cursor-pointer file:transition-all 
                                                file:duration-500
                                                hover:file:bg-blue-100 cursor-pointer 
                                                p-2 border border-gray-300 rounded-lg 
                                                focus:ring-2 focus:border-blue-500 
                                                outline-none transition-all duration-500"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        <p className="text-gray-500 text-xs mt-1">
                                            الحد الأقصى لحجم الملف: 500 ميجابايت
                                        </p>
                                    </div> */}
                            </div>
                            {/* )} */}

                            {/* {selectedType === "assessment" && ( */}
                            <div className="space-y-6 border-t border-gray-200 pt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black flex gap-2">
                                        الأسئلة
                                    </h4>
                                </div>

                                {questions?.map((question, qIndex) => (
                                    <div
                                        key={qIndex}
                                        className="border border-gray-200 rounded-lg p-5 space-y-5 shadow-sm hover:shadow-md transition-shadow mb-4"
                                    >
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                                            <h5 className="font-medium flex items-center">
                                                <span
                                                    className={`inline-block bg-blue-100 text-blue-700 rounded-full w-7 h-7 text-center leading-7 ml-2`}
                                                >
                                                    {qIndex + 1}
                                                </span>
                                                سؤال {qIndex + 1}
                                            </h5>

                                            {questions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        confirmDeleteQuestion(
                                                            question.id
                                                        )
                                                    }
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"
                                                    disabled={
                                                        isSubmitting ||
                                                        isLoading
                                                    }
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`${question?.id}-q-text`}
                                                    className="block text-lg font-bold mb-1"
                                                >
                                                    نص السؤال
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`${question?.id}-q-text`}
                                                    name={`${question?.id}-q-text`}
                                                    value={question?.text}
                                                    placeholder="مثال: ما هو تعريف المنطق؟"
                                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                                    onChange={(e) =>
                                                        handleQuestionChange(
                                                            question?.id,
                                                            "text",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        isSubmitting ||
                                                        isLoading
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`${question?.id}-q-url`}
                                                    className="block text-lg font-bold mb-1"
                                                >
                                                    رابط صورة الاختبار
                                                </label>
                                                <div className="space-y-2">
                                                    <input
                                                        type="url"
                                                        id={`${question?.id}-q-url`}
                                                        name={`${question?.id}-q-url`}
                                                        placeholder="مثال: https://example.com/image.jpg"
                                                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                                        value={
                                                            question?.image_url
                                                        }
                                                        onChange={(e) =>
                                                            handleQuestionChange(
                                                                question?.id,
                                                                "image_url",
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            isSubmitting ||
                                                            isLoading
                                                        }
                                                    />
                                                    {/* {question?.image_url && (
                                                            <div className="mt-2 border rounded-lg p-2">
                                                                <img
                                                                    src={
                                                                        question?.image_url
                                                                    }
                                                                    alt="معاينة الصورة"
                                                                    // onError={(
                                                                    //     e
                                                                    // ) =>
                                                                    //     (e.target.style.display =
                                                                    //         "none")
                                                                    // }
                                                                    className="  min-h-40 w-full mx-auto object-fill"
                                                                />
                                                            </div>
                                                        )} */}
                                                </div>
                                            </div>

                                            {/* <div className="hidden">
                                                    <label className="block text-lg font-bold mb-1">
                                                        ملف الصورة
                                                    </label>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleQuestionImageUpload(
                                                                        question?.id,
                                                                        e
                                                                    );
                                                                    // console.log(
                                                                    //     `question?.id,`,
                                                                    //     question?.id,
                                                                    //     `e`,
                                                                    //     e
                                                                    // );
                                                                }}
                                                                className="block w-full text-sm text-gray-500
                                                                    file:mr-4 file:py-2 file:px-4
                                                                    file:rounded-md file:border-0
                                                                    file:text-sm file:font-semibold
                                                                    file:bg-blue-50 file:text-blue-700
                                                                    hover:file:bg-blue-100 
                                                                    file:cursor-pointer file:transition-all 
                                                                    file:duration-500 cursor-pointer
                                                                    p-2 border border-gray-300 rounded-lg 
                                                                    focus:ring-2 focus:border-blue-500 
                                                                    outline-none transition-all duration-500"
                                                                disabled={
                                                                    isSubmitting ||
                                                                    isLoading
                                                                }
                                                            />
                                                        </div>

                                                        {question?.image && (
                                                            <div className="mt-2 border rounded-lg p-2">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <p className="text-sm">
                                                                        <span className="font-medium">
                                                                            {
                                                                                question
                                                                                    .image
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                        <span className="text-xs text-gray-500 mr-2">
                                                                            (
                                                                            {Math.round(
                                                                                question
                                                                                    .image
                                                                                    .size /
                                                                                    1024
                                                                            )}{" "}
                                                                            كيلوبايت)
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <img
                                                                    src={
                                                                        question?.image_url
                                                                    }
                                                                    alt="معاينة الصورة"
                                                                    className="max-h-40 w-full mx-auto object-fill rounded-md"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div> */}
                                        </div>

                                        <div className="mt-4">
                                            <span className="block text-lg font-bold mb-2">
                                                الخيارات
                                            </span>

                                            <div className="flex flex-col gap-4">
                                                {question?.choices?.map(
                                                    (choice, oIndex) => (
                                                        <div
                                                            key={oIndex}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <label
                                                                    htmlFor={`${question.id}-${oIndex}-radio`}
                                                                    className="hidden"
                                                                ></label>
                                                                <input
                                                                    type="radio"
                                                                    id={`${question.id}-${oIndex}-radio`}
                                                                    name={`${question.id}-${oIndex}-radio`}
                                                                    className="ml-2 w-6 h-6"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                    checked={
                                                                        question?.correct_answer ===
                                                                        oIndex
                                                                    }
                                                                    onChange={() => {
                                                                        handleCorrectAnswerChange(
                                                                            question?.id,
                                                                            oIndex
                                                                        );
                                                                        // console.log(
                                                                        //     `question?.id,`,
                                                                        //     question?.id,
                                                                        //     `oIndex`,
                                                                        //     oIndex
                                                                        // );
                                                                    }}
                                                                    disabled={
                                                                        isSubmitting ||
                                                                        isLoading
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="flex-grow flex items-center">
                                                                <div
                                                                    className={`w-8 h-8 rounded-full flex items-center justify-center me-4
                                                                        ${
                                                                            question?.correct_answer ===
                                                                            oIndex
                                                                                ? "bg-green-600 text-white"
                                                                                : "bg-gray-200 text-gray-600"
                                                                        }`}
                                                                    onClick={() =>
                                                                        handleCorrectAnswerChange(
                                                                            question?.id,
                                                                            oIndex
                                                                        )
                                                                    }
                                                                >
                                                                    {String.fromCharCode(
                                                                        65 +
                                                                            oIndex
                                                                    )}
                                                                </div>
                                                                <label
                                                                    htmlFor={`${question.id}-${oIndex}-input`}
                                                                    className="hidden"
                                                                ></label>
                                                                <input
                                                                    type="text"
                                                                    id={`${question.id}-${oIndex}-input`}
                                                                    name={`${question.id}-${oIndex}-input`}
                                                                    placeholder={`الخيار ${
                                                                        oIndex +
                                                                        1
                                                                    }`}
                                                                    className={`flex-1 p-3 border rounded-lg
                                                                        ${
                                                                            question?.correct_answer ===
                                                                            oIndex
                                                                                ? "border-green-300 bg-green-50"
                                                                                : "border-gray-300"
                                                                        }`}
                                                                    value={
                                                                        choice.text
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleOptionChange(
                                                                            question?.id,
                                                                            oIndex,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                        // console.log(
                                                                        //     `choice.text`,
                                                                        //     choice.text,
                                                                        //     `question?.id`,
                                                                        //     question?.id,
                                                                        //     `oIndex`,
                                                                        //     oIndex,
                                                                        //     `e`,
                                                                        //     e
                                                                        //         .target
                                                                        //         .value
                                                                        // );
                                                                    }}
                                                                    disabled={
                                                                        isSubmitting ||
                                                                        isLoading
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                اختر الإجابة الصحيحة بالنقر على
                                                الدائرة المقابلة للخيار
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end items-center mb-2 mt-10">
                                    <button
                                        type="button"
                                        onClick={addQuestion}
                                        className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm`}
                                        disabled={isSubmitting || isLoading}
                                    >
                                        <Plus size={16} className="ml-1" />
                                        إضافة سؤال
                                    </button>
                                </div>
                            </div>
                            {/* )} */}

                            {/* Questions Google Iframe */}
                            <div>
                                <label
                                    htmlFor="questions_google_iframe"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    أسئلة Google Iframe
                                </label>
                                <textarea
                                    id="questions_google_iframe"
                                    name="questions_google_iframe"
                                    rows={3}
                                    placeholder={`مثال: <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc0YoyqI7Lg2nJT8B5a_efYlv0xx27bFAVQPAm3aXTOXQ3hmg/viewform?embedded=true" width="640" height="1322" frameborder="0" marginheight="0" marginwidth="0">جارٍ التحميل…</iframe>`}
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-40 resize-none`}
                                    {...register("questions_google_iframe")}
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.questions_google_iframe && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.questions_google_iframe.message}
                                    </p>
                                )}
                            </div>

                            {/* Questions Google URL */}
                            <div>
                                <label
                                    htmlFor="questions_google_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط أسئلة Google Form
                                </label>
                                <input
                                    type="text"
                                    id="questions_google_url"
                                    name="questions_google_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("questions_google_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.questions_google_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.questions_google_url.message}
                                    </p>
                                )}
                            </div>

                            {/* File PDF */}
                            <div className="border-t border-gray-200 pt-4 mt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        نموذج الاجابة PDF
                                    </h4>
                                </div>

                                <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                    <input
                                        type="file"
                                        id="answer_form_pdf"
                                        name="answer_form_pdf"
                                        className="hidden"
                                        accept=".pdf"
                                        ref={filePDFInputRef}
                                        {...register("answer_form_pdf", {
                                            // validate: validateImageUrl,
                                        })}
                                        onChange={(e) => {
                                            // console.log(`ee`);
                                            handleFilePDFUpload(e);
                                        }}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
                                    />
                                    <label
                                        htmlFor="answer_form_pdf"
                                        className="flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        {uploadedFilePDF ? (
                                            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-400 rounded shadow-sm w-full">
                                                <div className="flex items-center truncate">
                                                    <FileText
                                                        size={16}
                                                        className={`ml-2 text-blue-500`}
                                                    />
                                                    <span
                                                        className={`text-lg truncate text-blue-500`}
                                                    >
                                                        {uploadedFilePDF.name}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setUploadedFilePDF(
                                                            null
                                                        );
                                                    }}
                                                    className="p-1 text-gray-500 hover:text-red-600 rounded"
                                                    disabled={
                                                        isSubmitting ||
                                                        isLoading
                                                    }
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload
                                                    size={24}
                                                    className="text-gray-400 mb-2"
                                                />
                                                <span
                                                    className={`text-sm font-medium text-blue-600`}
                                                >
                                                    اختر ملف للرفع
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* File PDF URL */}
                            <div>
                                <label
                                    htmlFor="answer_form_pdf_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط نموذج الاجابة PDF
                                </label>
                                <input
                                    type="text"
                                    id="answer_form_pdf_url"
                                    name="answer_form_pdf_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("answer_form_pdf_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.answer_form_pdf_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.answer_form_pdf_url.message}
                                    </p>
                                )}
                            </div>

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
                                        multiple
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
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
                                            يمكنك اختيار عدة ملفات في نفس الوقت
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
                                                                className={`ml-2 text-blue-500`}
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
                                                            <Trash size={16} />
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
                                    onClick={() => setIsFree(!isFree)}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                                        isFree
                                            ? `bg-blue-100 text-blue-800`
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {isFree === false ? (
                                        <Lock
                                            size={16}
                                            className="text-gray-600"
                                        />
                                    ) : (
                                        <Unlock
                                            size={16}
                                            className={`text-blue-600`}
                                        />
                                    )}
                                    {isFree === false ? "مدفوع" : "مجاني"}
                                </button>

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
                                            `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
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
                                        ? "جاري الإضافة..."
                                        : "إضافة درس"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-[60] bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-black">
                                    حذف السؤال
                                </h3>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <AlertTriangle
                                        size={24}
                                        className="text-red-500 ml-3"
                                    />
                                    <p className="text-gray-700">
                                        هل أنت متأكد من حذف هذا السؤال؟
                                    </p>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() =>
                                            setShowDeleteConfirm(false)
                                        }
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        onClick={handleDeleteQuestion}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CourseLessonsCreate;
