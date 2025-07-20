/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    Layers,
    TrendingUp,
    ChevronLeft,
    BarChart2,
    TableOfContents,
    ArrowRight,
    ShieldUser,
    UserRoundPen,
    TicketPercent,
    FileQuestion,
    Send,
    Star,
    Heart,
    Package,
    Languages,
    Images,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";

// api
import { getStudentDashboardStats } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

// components
import StatCard from "./StatCard";
import ProblemData from "../../../error/ProblemData";

// assets
import courseimage from "../../../../assets/images/courses/course-1.jpeg";
import book from "../../../../assets/images/sectionsall/book.gif";
import computer from "../../../../assets/images/sectionsall/computer.gif";
import live from "../../../../assets/images/sectionsall/live.gif";
import opengift from "../../../../assets/images/sectionsall/open-gift.gif";
import packageA from "../../../../assets/images/sectionsall/package.gif";
import translator from "../../../../assets/images/sectionsall/translator.gif";
import lovebooks from "../../../../assets/images/sectionsall/love-books.gif";

function UserDashboard() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    let { userData, userProfile } = UserDataStore();
    let userId = userData?.id;

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await getStudentDashboardStats(userId);

                if (error) {
                    setError(error?.message);
                } else {
                    setStats(data);
                }
            } catch (error) {
                setError("حدث خطأ أثناء جلب البيانات");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [userId]);
    // console.log(`eeee`, stats);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    // if (!stats) return null;

    // تحضير بيانات للرسم البياني
    // const chartData = [
    //     { name: "المستخدمين", value: stats?.users_count },
    //     { name: "المسؤلين", value: stats?.admins_count },
    //     { name: "المعلمين", value: stats?.teachers_count },
    //     { name: "المساعدين", value: stats?.staffs_count },
    //     { name: "الطلاب", value: stats?.students_count },
    // ];

    const coursesData = [
        { name: "الدورات", value: stats?.student_courses_enrollment_count },
        { name: "المفضلات", value: stats?.student_favorite_course_count },
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-start mb-8">
                    <button
                        onClick={() => {
                            navigate(`/${App_User}/home`);
                            // moveBack();
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <h1 className="text-3xl font-bold mr-2 text-black">
                        لوحة التحكم
                    </h1>
                </div>

                {stats ? (
                    <>
                        {/* Stats cards */}

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الدورات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`الدورات المشترك بها`}
                                value={
                                    stats?.student_courses_enrollment_count || 0
                                }
                                to={`/${App_User}/courses`}
                                // icon={<BookOpen size={24} />}
                                icon={book}
                                // color="bg-indigo-100 text-indigo-700"
                                color="bg-indigo-700 text-indigo-700"
                            />

                            <StatCard
                                title={`الدورات المفضلات`}
                                value={
                                    stats?.student_favorite_course_count || 0
                                }
                                to={`/${App_User}/favoritecourses`}
                                // icon={<Heart size={24} />}
                                icon={lovebooks}
                                color="bg-pink-700 text-pink-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الباقات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`الباقات التي أنشأتها`}
                                value={
                                    stats?.student_packages_course_count || 0
                                }
                                to={`/${App_User}/packages`}
                                // icon={<Package size={24} />}
                                icon={packageA}
                                // color="bg-stone-100 text-stone-700"
                                color="bg-stone-700 text-stone-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                البوربوينت
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`البوربوينت المشترك بها`}
                                value={
                                    stats?.student_powerpoints_enrollment_count ||
                                    0
                                }
                                to={`/${App_User}/powerpoints`}
                                // icon={<Images size={24} />}
                                icon={computer}
                                // color="bg-amber-100 text-amber-700"
                                color="bg-amber-700 text-amber-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                طلبات البوربوينت
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي طلبات البوربوينت`}
                                value={
                                    stats?.student_powerpointservices_count || 0
                                }
                                to={`/${App_User}/powerpointservices`}
                                // icon={<Images size={24} />}
                                icon={computer}
                                // color="bg-lime-100 text-lime-700"
                                color="bg-lime-700 text-lime-700"
                            />

                            <StatCard
                                title={`طلبات تم الرد عليه`}
                                value={
                                    stats?.student_powerpointservices_replay_count ||
                                    0
                                }
                                to={`/${App_User}/powerpointservices`}
                                // icon={<Images size={24} />}
                                icon={computer}
                                // color="bg-stone-100 text-stone-700"
                                color="bg-stone-700 text-stone-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                التدقيق اللغوي
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`التدقيق اللغوي التي أنشاتها`}
                                value={
                                    stats?.student_proofreadingservices_count ||
                                    0
                                }
                                to={`/${App_User}/proofreadingservices`}
                                // icon={<Languages size={24} />}
                                icon={translator}
                                // color="bg-amber-100 text-amber-700"
                                color="bg-amber-700 text-amber-700"
                            />

                            <StatCard
                                title={`تدقيق تم الرد عليه`}
                                value={
                                    stats?.student_proofreadingservices_replay_count ||
                                    0
                                }
                                to={`/${App_User}/proofreadingservices`}
                                // icon={<Languages size={24} />}
                                icon={translator}
                                // color="bg-gray-100 text-gray-700"
                                color="bg-gray-700 text-gray-700"
                            />
                        </div>

                        {/* الرسوم البيانية */}
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 my-12">
                            <div className="bg-white py-6 ps-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">
                                    إحصائيات الدورات
                                </h3>

                                <div className="h-96">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={coursesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="value"
                                                fill="#3b82f6"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <ProblemData />
                    </>
                )}
            </div>
        </>
    );
}

export default UserDashboard;
