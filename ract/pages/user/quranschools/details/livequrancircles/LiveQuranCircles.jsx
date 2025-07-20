import { useEffect, useState } from "react";
import { Clock, Video } from "lucide-react";

// components
import { SectionTitle } from "../com";

const LiveQuranCircles = ({ lectures }) => {
    const now = new Date();

    // 1. فلترة المحاضرات المستقبلية
    const upcomingLectures = lectures
        ?.filter((lecture) => new Date(lecture.date_time) > now)
        .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

    const nextLecture = upcomingLectures?.[0]; // أقرب محاضرة

    // 2. حساب الوقت المتبقي
    const calculateTimeLeft = (lecture) => {
        const difference = +new Date(lecture?.date_time) - +new Date();

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(nextLecture));

    // 3. تحديث العد التنازلي كل ثانية
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(nextLecture));
        }, 1000);

        return () => clearInterval(timer);
    }, [nextLecture]);

    const isLive = Object.keys(timeLeft).length === 0;

    if (!nextLecture) return null;

    return (
        <>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <SectionTitle
                    icon={
                        // <i className="fas fa-clock"></i>
                        <Clock />
                    }
                    title="المُحاضرة القادمة"
                    colorClass="bg-orange-50"
                />

                <div className="border-t border-gray-200">
                    <div className="p-5 mb-5">
                        <h4 className="text-xl font-bold text-emerald-800 mb-2">
                            {nextLecture?.title}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {nextLecture?.description}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 ">
                        {isLive ? (
                            <a
                                href={nextLecture?.zoom_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
                            >
                                {/* <i className="fas fa-video"></i> */}
                                <Video />
                                <span>الدخول للقاعة الآن</span>
                            </a>
                        ) : (
                            <>
                                <div className="flex gap-4 text-center flex-row-reverse">
                                    {timeLeft.days > 0 && (
                                        <div className="flex flex-col">
                                            <span className="text-3xl font-bold text-orange-600 leading-none">
                                                {timeLeft.days}
                                            </span>

                                            <label className="text-xs text-gray-600">
                                                يوم
                                            </label>
                                        </div>
                                    )}

                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold text-orange-600 leading-none">
                                            {String(timeLeft.hours).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <label className="text-xs text-gray-600">
                                            ساعة
                                        </label>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold text-orange-600 leading-none">
                                            {String(timeLeft.minutes).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <label className="text-xs text-gray-600">
                                            دقيقة
                                        </label>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold text-orange-600 leading-none">
                                            {String(timeLeft.seconds).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <label className="text-xs text-gray-600">
                                            ثانية
                                        </label>
                                    </div>
                                </div>

                                <button
                                    className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gray-200 text-gray-500 font-bold cursor-not-allowed"
                                    disabled
                                >
                                    {/* <i className="fas fa-video"></i> */}
                                    <Video size={20} />
                                    <span>يبدأ العد التنازلي</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveQuranCircles;

// const NextLectureCard = ({ lectures }) => {
//     console.log(`lecture`, lectures);

//     const calculateTimeLeft = (lecture) => {
//         const difference = +new Date(lecture?.dateTime) - +new Date();

//         let timeLeft = {};
//         if (difference > 0) {
//             timeLeft = {
//                 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//                 minutes: Math.floor((difference / 1000 / 60) % 60),
//                 seconds: Math.floor((difference / 1000) % 60),
//             };
//         }
//         return timeLeft;
//     };

//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//     const isLive = Object.keys(timeLeft).length === 0;

//     console.log(`timeLeft`, timeLeft);
//     console.log(`isLive`, isLive);
//     console.log(`calculateTimeLeft`, calculateTimeLeft());

//     return (
//         <div
//             className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden `}
//         >
//             <SectionTitle
//                 icon={<i className="fas fa-clock"></i>}
//                 title="المُحاضرة القادمة"
//                 colorClass="bg-orange-50"
//             />

//             {lectures?.map((lecture, index) => (
//                 <div key={index} className="border-t border-gray-200">
//                     <div className="p-5 mb-5">
//                         <h4 className="text-xl font-bold text-emerald-800 mb-2">
//                             {lecture?.title}
//                         </h4>

//                         <p className="text-gray-700 leading-relaxed">
//                             {lecture?.description}
//                         </p>
//                     </div>

//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 ">
//                         {isLive ? (
//                             <a
//                                 href={lecture?.zoom_url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
//                             >
//                                 <i className="fas fa-video"></i>
//                                 <span>الدخول للقاعة الآن</span>
//                             </a>
//                         ) : (
//                             <>
//                                 <div className="flex gap-4 text-center">
//                                     {timeLeft.days > 0 && (
//                                         <div className="flex flex-col">
//                                             <span className="text-3xl font-bold text-orange-600 leading-none">
//                                                 {timeLeft.days}
//                                             </span>

//                                             <label className="text-xs text-gray-600">
//                                                 يوم
//                                             </label>
//                                         </div>
//                                     )}

//                                     <div className="flex flex-col">
//                                         <span className="text-3xl font-bold text-orange-600 leading-none">
//                                             {String(timeLeft.hours).padStart(
//                                                 2,
//                                                 "0"
//                                             )}
//                                         </span>

//                                         <label className="text-xs text-gray-600">
//                                             ساعة
//                                         </label>
//                                     </div>

//                                     <div className="flex flex-col">
//                                         <span className="text-3xl font-bold text-orange-600 leading-none">
//                                             {String(timeLeft.minutes).padStart(
//                                                 2,
//                                                 "0"
//                                             )}
//                                         </span>

//                                         <label className="text-xs text-gray-600">
//                                             دقيقة
//                                         </label>
//                                     </div>

//                                     <div className="flex flex-col">
//                                         <span className="text-3xl font-bold text-orange-600 leading-none">
//                                             {String(timeLeft.seconds).padStart(
//                                                 2,
//                                                 "0"
//                                             )}
//                                         </span>

//                                         <label className="text-xs text-gray-600">
//                                             ثانية
//                                         </label>
//                                     </div>
//                                 </div>

//                                 <button
//                                     className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gray-200 text-gray-500 font-bold cursor-not-allowed"
//                                     disabled
//                                 >
//                                     <i className="fas fa-video"></i>
//                                     <span>يبدأ العد التنازلي</span>
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

//
// const NextLectureCard = ({ lectures }) => {
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//     const isLive = Object.keys(timeLeft).length === 0;

//     // فلترة المحاضرات القادمة فقط (التي لم تحدث بعد)
//     const upcomingLectures = lectures?.filter((lecture) => {
//         const lectureTime = new Date(lecture.date_time);
//         const now = new Date();
//         return lectureTime > now;
//     });

//     // إذا لم يكن هناك محاضرات قادمة، نعرض رسالة
//     if (!upcomingLectures || upcomingLectures.length === 0) {
//         return (
//             <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
//                 <SectionTitle
//                     icon={<i className="fas fa-clock"></i>}
//                     title="المُحاضرة القادمة"
//                     colorClass="bg-orange-50"
//                 />
//                 <div className="p-5 text-center text-gray-600">
//                     لا توجد محاضرات قادمة في الوقت الحالي
//                 </div>
//             </div>
//         );
//     }

//     // نرتب المحاضرات حسب الأقرب زمنياً
//     const sortedLectures = [...upcomingLectures].sort((a, b) => {
//         return new Date(a.date_time) - new Date(b.date_time);
//     });

//     // نأخذ المحاضرة الأقرب (الأولى في المصفوفة بعد الترتيب)
//     const nextLecture = sortedLectures[0];

//     const calculateTimeLeft = () => {
//         const difference = +new Date(nextLecture.date_time) - +new Date();
//         let timeLeft = {};
//         if (difference > 0) {
//             timeLeft = {
//                 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//                 minutes: Math.floor((difference / 1000 / 60) % 60),
//                 seconds: Math.floor((difference / 1000) % 60),
//             };
//         }
//         return timeLeft;
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);
//         return () => clearTimeout(timer);
//     });

//     return (
//         <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
//             <SectionTitle
//                 icon={<i className="fas fa-clock"></i>}
//                 title="المُحاضرة القادمة"
//                 colorClass="bg-orange-50"
//             />

//             <div className="p-5 mb-5">
//                 <h4 className="text-xl font-bold text-emerald-800 mb-2">
//                     {nextLecture.title}
//                 </h4>

//                 <p className="text-gray-700 leading-relaxed">
//                     {nextLecture.description}
//                 </p>

//                 <div className="mt-4 text-sm text-gray-500">
//                     <i className="fas fa-calendar-alt mr-2"></i>
//                     {new Date(nextLecture.date_time).toLocaleString("ar-EG", {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                     })}
//                 </div>
//             </div>

//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
//                 {isLive ? (
//                     <a
//                         href={nextLecture.zoom_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
//                     >
//                         <i className="fas fa-video"></i>
//                         <span>الدخول للقاعة الآن</span>
//                     </a>
//                 ) : (
//                     <>
//                         <div className="flex gap-4 text-center">
//                             {timeLeft.days > 0 && (
//                                 <div className="flex flex-col">
//                                     <span className="text-3xl font-bold text-orange-600 leading-none">
//                                         {timeLeft.days}
//                                     </span>
//                                     <label className="text-xs text-gray-600">
//                                         يوم
//                                     </label>
//                                 </div>
//                             )}
//                             <div className="flex flex-col">
//                                 <span className="text-3xl font-bold text-orange-600 leading-none">
//                                     {String(timeLeft.hours).padStart(2, "0")}
//                                 </span>
//                                 <label className="text-xs text-gray-600">
//                                     ساعة
//                                 </label>
//                             </div>
//                             <div className="flex flex-col">
//                                 <span className="text-3xl font-bold text-orange-600 leading-none">
//                                     {String(timeLeft.minutes).padStart(2, "0")}
//                                 </span>
//                                 <label className="text-xs text-gray-600">
//                                     دقيقة
//                                 </label>
//                             </div>
//                             <div className="flex flex-col">
//                                 <span className="text-3xl font-bold text-orange-600 leading-none">
//                                     {String(timeLeft.seconds).padStart(2, "0")}
//                                 </span>
//                                 <label className="text-xs text-gray-600">
//                                     ثانية
//                                 </label>
//                             </div>
//                         </div>
//                         <button
//                             className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gray-200 text-gray-500 font-bold cursor-not-allowed"
//                             disabled
//                         >
//                             <i className="fas fa-video"></i>
//                             <span>يبدأ العد التنازلي</span>
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };
