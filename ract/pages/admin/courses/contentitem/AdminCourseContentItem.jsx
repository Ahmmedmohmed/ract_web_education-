/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Video,
    FileText,
    Edit,
    Trash,
    File,
    Download,
    Link as LinkIcon,
    UploadCloud,
} from "lucide-react";

//
// import { coursesApi } from "../../lib/api";

function AdminCourseContentItem({ item, courseId, sectionId, onUpdate }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const getItemIcon = () => {
        switch (item.type) {
            case "video":
                return <Video size={20} className="text-primary-600" />;
            case "assessment":
                return <FileText size={20} className="text-yellow-600" />;
            default:
                return <File size={20} className="text-gray-600" />;
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleFileUpload = () => {
        setShowFileUpload(!showFileUpload);
    };

    const handleFileUpload = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            try {
                setIsUploading(true);
                const files = Array.from(e.target.files);

                // Upload each file
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("title", file.name);

                    // await coursesApi.uploadFile(
                    //     courseId,
                    //     sectionId,
                    //     item.id,
                    //     formData
                    // );
                }

                // Refresh item data
                onUpdate?.();
                setShowFileUpload(false);
            } catch (error) {
                console.error("Error uploading files:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleVideoUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            try {
                setIsUploading(true);
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("video_file", file);

                // await coursesApi.updateItem(
                //     courseId,
                //     sectionId,
                //     item.id,
                //     formData
                // );
                onUpdate?.();
            } catch (error) {
                console.error("Error uploading video:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleVideoUrlUpdate = async (url) => {
        try {
            // await coursesApi.updateItem(courseId, sectionId, item.id, {
            //     video_url: url,
            // });
            onUpdate?.();
        } catch (error) {
            console.error("Error updating video URL:", error);
        }
    };

    return (
        <>
            <div className="p-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={toggleExpand}
                >
                    <div className="flex items-center">
                        <div className="ml-3">{getItemIcon()}</div>
                        <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-500">
                                {item.duration && `${item.duration} • `}
                                {item.type === "video"
                                    ? "فيديو"
                                    : item.type === "assessment"
                                    ? "اختبار"
                                    : "محتوى"}
                            </p>
                        </div>
                    </div>

                    <div
                        className="flex items-center space-x-2 space-x-reverse"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded">
                            <Edit size={18} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded">
                            <Trash size={18} />
                        </button>
                    </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                    <div className="mt-4 pt-3 border-t">
                        {item.description && (
                            <p className="text-gray-600 mb-3">
                                {item.description}
                            </p>
                        )}

                        {/* Video content section */}
                        {item.type === "video" && (
                            <div className="mb-4">
                                <h5 className="font-medium mb-2">
                                    محتوى الفيديو
                                </h5>

                                {/* Video URL input */}
                                <div className="mb-3">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        رابط الفيديو
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            value={item.video_url || ""}
                                            onChange={(e) =>
                                                handleVideoUrlUpdate(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="أدخل رابط الفيديو (YouTube, etc.)"
                                            className="flex-1 p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                {/* Video file upload */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        أو قم برفع ملف فيديو
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-50 file:text-primary-700
                    hover:file:bg-primary-100"
                                    />
                                </div>

                                {/* Preview current video */}
                                {(item.video_url || item.video_file) && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                        {item.video_url ? (
                                            <div className="flex items-center">
                                                <LinkIcon
                                                    size={16}
                                                    className="ml-2 text-gray-500"
                                                />
                                                <a
                                                    href={item.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary-600 text-sm hover:underline truncate"
                                                >
                                                    {item.video_url}
                                                </a>
                                            </div>
                                        ) : (
                                            item.video_file && (
                                                <video
                                                    controls
                                                    className="w-full rounded-md"
                                                    src={item.video_file}
                                                >
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* File management section */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium">الملفات المرفقة</h5>
                                <button
                                    className="text-sm text-primary-600 flex items-center hover:text-primary-700"
                                    onClick={toggleFileUpload}
                                >
                                    <UploadCloud size={16} className="ml-1" />
                                    إضافة ملف
                                </button>
                            </div>

                            {/* File upload area */}
                            {showFileUpload && (
                                <div className="border border-dashed rounded-md p-4 mb-3">
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        id={`file-upload-${item.id}`}
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                    />
                                    <label
                                        htmlFor={`file-upload-${item.id}`}
                                        className="flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        <UploadCloud
                                            size={24}
                                            className="text-gray-400 mb-2"
                                        />
                                        <span className="text-sm font-medium text-primary-600">
                                            {isUploading
                                                ? "جاري الرفع..."
                                                : "اختر ملفات للرفع"}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            أو اسحب الملفات وأفلتها هنا
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Uploaded files list */}
                            {item.files && item.files.length > 0 ? (
                                <div className="space-y-2">
                                    {item?.files?.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                        >
                                            <div className="flex items-center truncate">
                                                <File
                                                    size={16}
                                                    className="ml-2 text-gray-500"
                                                />
                                                <span className="text-sm truncate">
                                                    {file.title}
                                                </span>
                                            </div>
                                            <div className="flex space-x-1 space-x-reverse">
                                                <button className="p-1 text-gray-500 hover:text-primary-600 rounded">
                                                    <Download size={16} />
                                                </button>
                                                <button className="p-1 text-gray-500 hover:text-red-600 rounded">
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">
                                    لا توجد ملفات مرفقة
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminCourseContentItem;
