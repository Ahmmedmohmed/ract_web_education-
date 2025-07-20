/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    BookText,
    CalendarDays,
    Clock,
    Edit,
    LinkIcon,
    Plus,
    Trash,
} from "lucide-react";

// utils
import { App_Admin } from "../../../../../utils/constants";

function LiveQuranCirclesList({
    quranpathId,
    chapterinquranId,
    chapterInQuran,
}) {
    const navigate = useNavigate();
    // console.log(`========================================`, chapterInQuran);

    return (
        <>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 shadow-md ">
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-blue-100">
                    <h4 className="text-2xl font-bold text-blue-700">
                        مَوْعِدُ الحَلَقَةِ القَادِمَةِ
                    </h4>

                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
                        onClick={() => {
                            // openZoomModal();
                            navigate(
                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/livequrancircles/create`
                            );
                        }}
                    >
                        <Plus size={16} />
                        إِضَافَةُ مَوْعِدٍ
                    </button>
                </div>

                {chapterInQuran?.live_quran_circles &&
                chapterInQuran?.live_quran_circles?.length > 0 ? (
                    <div className="space-y-4 flex flex-col gap-4 shadow-sm overflow-y-auto max-h-96">
                        {chapterInQuran?.live_quran_circles?.map(
                            (meeting, index) => {
                                const now = new Date();
                                const meetingTime = new Date(
                                    meeting?.date_time
                                );
                                const isLinkActive = now >= meetingTime;

                                // console.log(
                                //     `e---------------------------------`
                                // );
                                // console.log(`now,`, now);
                                // console.log(`now,`, meeting?.id);
                                // console.log(
                                //     `meetingTime,`,
                                //     meetingTime
                                // );
                                // console.log(
                                //     `meeting?.date_time,`,
                                //     meeting?.date_time
                                // );
                                // console.log(
                                //     `meeting?.date_time,`,
                                //     meeting?.date_time
                                // );

                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg border border-slate-200 p-4"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="text-lg font-semibold text-slate-800">
                                                {meeting?.title}
                                            </h5>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        // openZoomModal(
                                                        //     meeting
                                                        // )
                                                        navigate(
                                                            `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/livequrancircles/update/${meeting?.id}`
                                                        );
                                                    }}
                                                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                    title="تعديل"
                                                >
                                                    <Edit size={14} />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        // onDeleteMeeting(
                                                        //     meeting
                                                        // )
                                                    }}
                                                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                    title="حذف"
                                                >
                                                    <Trash size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="flex items-center gap-2 text-slate-600 mb-4">
                                            <BookText size={16} />{" "}
                                            {meeting?.description ||
                                                "لا توجد تفاصيل."}
                                        </p>

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                            <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                                                <div className="flex items-center gap-2 ">
                                                    <CalendarDays size={16} />
                                                    {/* {meetingTime.toLocaleDateString(
                                                                          "ar-EG-u-nu-latn",
                                                                          {
                                                                              year: "numeric",
                                                                              month: "long",
                                                                              day: "numeric",
                                                                          }
                                                                      )} */}
                                                    {/* {formatDateTimeLiveQuran(
                                                                          meeting?.date_time
                                                                      )} */}
                                                    {/* {moment(
                                                                          meeting?.date_time
                                                                      ).format(
                                                                          "YYYY-MM-DD"
                                                                      )} */}
                                                    {new Date(
                                                        meeting?.date_time
                                                    ).toLocaleDateString(
                                                        "ar-EG",
                                                        {
                                                            timeZone:
                                                                "Asia/Riyadh",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 ">
                                                    <Clock size={16} />
                                                    {/* {meetingTime.toLocaleTimeString(
                                                                          "ar-EG-u-nu-latn",
                                                                          {
                                                                              hour: "2-digit",
                                                                              minute: "2-digit",
                                                                          }
                                                                      )} */}
                                                    {/* {
                                                                          formatDateTimeLiveQuran(
                                                                              meeting?.date_time
                                                                          ).split(
                                                                              " "
                                                                          )[1]
                                                                      } */}
                                                    {/* {moment(
                                                                          meeting?.date_time
                                                                      ).format(
                                                                          "HH:mm"
                                                                      )} */}
                                                    {new Date(
                                                        meeting?.date_time
                                                    ).toLocaleTimeString(
                                                        "ar-EG",
                                                        {
                                                            timeZone:
                                                                "Asia/Riyadh",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </div>
                                            </div>

                                            {isLinkActive ? (
                                                <a
                                                    href={meeting?.zoom_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm cursor-pointer"
                                                >
                                                    <LinkIcon size={16} />
                                                    <span>انْضِمْ الآنَ</span>
                                                </a>
                                            ) : (
                                                <span className="px-3 py-2 bg-slate-200 text-slate-500 rounded-lg flex items-center gap-2 text-sm">
                                                    <Clock size={16} /> لَمْ
                                                    يَحِنْ الوَقْتُ بَعْدُ
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                        لا تُوجَدُ مَوَاعِيدُ زُومٍ مُجْدْوَلَةٍ لِهَذَا
                        الفَصْلِ.
                    </p>
                )}
            </div>
        </>
    );
}

export default LiveQuranCirclesList;
