/* eslint-disable no-unused-vars */
// https://chat.deepseek.com/a/chat/s/385d9026-55eb-401d-9eca-41b6f605708c
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    ArrowRight,
    Loader,
    Loader2,
    LoaderCircle,
    Mail,
    Save,
    Send,
} from "lucide-react";

// api
import {
    publicGetMessageTeacherStudentChat,
    publicGetUserPK,
    publicSendMessageTeacherStudentChat,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

const StudentChatPage = () => {
    const { courseId, teacherId, studentId } = useParams();
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [studentInfo, setStudentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [msgData, setMsgData] = useState({ msg_to: "" });
    const [messages, setMessages] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        const fetchPublicUserPK = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetUserPK(teacherId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الطالب");
                    navigate(`/${App_User}/courses/${courseId}/students`);
                } else {
                    setStudentInfo(data);
                }
            } catch (error) {
                // setError(
                //     error.response?.data?.message ||
                //         "حدث خطأ أثناء جلب الطلاب المشتركين في الدورة"
                // );
                setIsLoading(false);
                navigate(`/${App_User}/courses/${courseId}/students`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublicUserPK();

        // Load messages
        fetchMessages();

        // const interval = setInterval(fetchMessages, 1000); // Update every 5 seconds
        // return () => clearInterval(interval);
    }, [teacherId]);

    const fetchMessages = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await publicGetMessageTeacherStudentChat(
                teacherId,
                studentId
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast(
                    "error",
                    error.message ||
                        "حدث خطأ أثناء جلب الطلاب المشتركين في الدورة"
                );
                navigate(`/${App_User}/courses/${courseId}/students`);
            } else {
                setMessages(data);
                scrollToBottom();
            }
        } catch (error) {
            // setError(
            //     error.response?.data?.message ||
            //         "حدث خطأ أثناء جلب الطلاب المشتركين في الدورة"
            // );
            setIsLoading(false);
            navigate(`/${App_User}/courses/${courseId}/students`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setMsgData({ ...msgData, [e.target.name]: e.target.value });
    };

    const formSubmit = async (formData) => {
        try {
            setIsLoading(true);

            if (formData.msg_to?.length > 0 === false) {
                return;
            }

            const _formData = new FormData();
            _formData.append("msg_to", formData.msg_to);
            _formData.append("msg_from", "teacher");

            const { data, error } = await publicSendMessageTeacherStudentChat(
                teacherId,
                studentId,
                _formData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", "حدث خطأ أثناء إضافة الطالب الي الدورة");
                // navigate(`/${App_User}/courses/${courseId}/students`);
            } else {
                // Toast("success", "تم إضافة الطالب الي الدورة بنجاح");
                setMsgData({ msg_to: "" });
                setSuccessMsg(data.msg);
                setErrorMsg("");
                scrollToBottom();
                fetchMessages();
            }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إضافة الطالب الي الدورة");
            navigate(`/${App_User}/courses/${courseId}/students`);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToBottom = () => {
        const objDiv = document.getElementById("msgList");
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
    };

    // console.log(`msgData`, msgData);
    // console.log(`successMsg`, successMsg);
    // console.log(`errorMsg`, errorMsg);
    // console.log(`messages`, messages);

    return (
        <>
            <div className="  mx-auto  ">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8 border-b border-gray-300  pb-4">
                        <div className="flex items-center justify-center   ">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/${App_User}/courses/${courseId}`
                                    );
                                    // moveBack();
                                }}
                                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold mr-2 text-black ">
                                محادثة مع الطالب: {studentInfo?.full_name}
                            </h1>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="mb-10">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : messages?.length === 0 ? (
                            <div className="text-center p-8">
                                <p className="text-gray-500">
                                    لا توجد رسائل في هذه المحادثه
                                </p>
                            </div>
                        ) : (
                            <div
                                id="msgList"
                                className=" rounded-lg p-4 pb-20  h-96 overflow-y-auto mb-4 "
                            >
                                {messages?.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 ${
                                            msg.msg_from === "teacher"
                                                ? "text-left"
                                                : "text-right"
                                        }`}
                                    >
                                        <div
                                            className={`inline-block p-3 rounded-lg ${
                                                msg.msg_from === "teacher"
                                                    ? `bg-blue-100 text-blue-800`
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {msg.msg_to}
                                        </div>

                                        {/* <div className="text-xs text-gray-500 mt-1">
                                        {msg.msg_time}
                                    </div> */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Message Form */}
                    <div className="border-t border-gray-300 pt-4">
                        <form
                            onSubmit={handleSubmit(formSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="msg_to"
                                    className="block text-lg font-medium text-black mb-2 hidden"
                                >
                                    وصف الدورة*
                                </label>
                                <textarea
                                    id="msg_to"
                                    name="msg_to"
                                    rows={4}
                                    placeholder="مثال: مرحبا"
                                    className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 focus:border-blue-500 resize-none`}
                                    {...register("msg_to", {
                                        required: "الرسالة مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.msg_to && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.msg_to.message}
                                    </p>
                                )}
                            </div>

                            <div className=" flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="flex items-center gap-2  px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() => {
                                        // navigate(`/${App_User}/courses`)
                                        fetchMessages();
                                    }}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <span>تحديث</span>
                                    <LoaderCircle size={18} />
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    {isSubmitting || isLoading
                                        ? "جاري إرسال..."
                                        : "إرسال"}
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentChatPage;
