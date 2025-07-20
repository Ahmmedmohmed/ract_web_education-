import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, Edit, Plus, Trash } from "lucide-react";

// utils
import { App_Admin } from "../../../../../utils/constants";

function FileAndLibrarysList({
    quranpathId,
    chapterinquranId,
    chapterInQuran,
}) {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-teal-50 rounded-xl border border-slate-200 p-6 shadow-md  ">
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
                    <h4 className="text-2xl font-bold text-slate-800">
                        ملفات ومكتبة الفصل
                    </h4>

                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
                        onClick={() => {
                            // openFileModal();
                            navigate(
                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/fileandlibrary/create`
                            );
                        }}
                    >
                        <Plus size={16} />
                        <span>إضافة ملف</span>
                    </button>
                </div>

                {chapterInQuran?.file_and_librarys &&
                chapterInQuran?.file_and_librarys.length > 0 ? (
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-white">
                                <tr className="border-b border-slate-200">
                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        اسم الملف
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الوصف
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {chapterInQuran?.file_and_librarys?.map(
                                    (file, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                        >
                                            <td className="p-3 text-slate-800 ">
                                                {file.title}
                                            </td>

                                            <td className="p-3 text-slate-800 ">
                                                {file.description}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2 justify-start">
                                                    <a
                                                        href={
                                                            file.file_url ||
                                                            file.file
                                                        }
                                                        target="_blank"
                                                        download={true}
                                                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full"
                                                        title="تنزيل"
                                                    >
                                                        <Download size={14} />
                                                    </a>

                                                    <button
                                                        onClick={() => {
                                                            // openFileModal(
                                                            //     file
                                                            // )
                                                            navigate(
                                                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/fileandlibrarys/update/${file.id}`
                                                            );
                                                        }}
                                                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                        title="تعديل"
                                                    >
                                                        <Edit size={14} />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            // onDeleteFile(
                                                            //     file
                                                            // )
                                                        }}
                                                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                        title="حذف"
                                                    >
                                                        <Trash size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                        لا توجد ملفات مرفقة لهذا الفصل بعد.
                    </p>
                )}
            </div>
        </>
    );
}

export default FileAndLibrarysList;
