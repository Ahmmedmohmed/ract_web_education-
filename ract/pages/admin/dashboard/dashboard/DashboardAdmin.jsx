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
    Code,
    Radio,
    Package,
    LibraryBig,
    BookCheck,
    Images,
    Languages,
    NotebookText,
    NotebookPen,
    Ampersand,
    Youtube,
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
import { getAdminDashboardStats } from "../../../../api/admin/authAdmin";

// store
import UserDataStore from "../../../../store/UserDataStore";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";

// components
import StatCard from "./StatCard";
import ProblemData from "../../../error/ProblemData";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function DashboardAdmin() {
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

                const { data, error } = await getAdminDashboardStats(userId);

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
    const chartData = [
        { name: "المستخدمين", value: stats?.users_count },
        { name: "مطوريين", value: stats?.superuser_count },
        { name: "المسؤلين", value: stats?.admins_count },
        // { name: "المعلمين", value: stats?.teachers_count },
        // { name: "المساعدين", value: stats?.staffs_count },
        { name: "الطلاب", value: stats?.students_count },
    ];

    const coursesData = [
        { name: "التصنيفات", value: stats?.sections_course_count },
        { name: "الدورات", value: stats?.courses_count },
        // { name: "الدروس", value: stats?.lessons_count },
        { name: "الطلاب المسجلين", value: stats?.total_enrolled_students },
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-start mb-8">
                    <button
                        onClick={() => {
                            navigate(`/${App_Admin}/home`);
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
                                المستخدمين
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي المستخدمين`}
                                value={stats?.users_count || 0}
                                to={`/${App_Admin}/dashboard`}
                                icon={<Users size={24} />}
                                color="bg-amber-100 text-amber-700"
                            />

                            <StatCard
                                title={`مطور`}
                                value={stats?.superuser_count || 0}
                                to={`/${App_Admin}/admins`}
                                icon={<Code size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />

                            <StatCard
                                title={`إجمالي المسؤلين`}
                                value={stats?.admins_count || 0}
                                to={`/${App_Admin}/admins`}
                                icon={<ShieldUser size={24} />}
                                color="bg-blue-100 text-blue-700"
                            />

                            {/* <StatCard
                                title={`إجمالي المدرسين`}
                                value={stats?.teachers_count || 0}
                                to={`/${App_Admin}/teachers`}
                                icon={<FaUserTie size={24} />}
                                color="bg-cyan-100 text-cyan-700"
                            />

                            <StatCard
                                title={`إجمالي المساعدين`}
                                value={stats?.staffs_count || 0}
                                to={`/${App_Admin}/staffs`}
                                icon={<UserRoundPen size={24} />}
                                color="bg-blue-100 text-blue-700"
                            /> */}

                            <StatCard
                                title={`إجمالي الطلاب`}
                                value={stats?.students_count || 0}
                                to={`/${App_Admin}/students`}
                                icon={<FaUserGraduate size={24} />}
                                color="bg-fuchsia-100 text-fuchsia-700"
                            />
                        </div>

                        {/* <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                التصنيفات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي التصنيفات`}
                                value={stats?.categories_section_count || 0}
                                to={`/${App_Admin}/categories`}
                                icon={<Layers size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />

                            <StatCard
                                title={`التصنيفات التي أنشأتها`}
                                value={
                                    stats?.admin_categories_section_count || 0
                                }
                                to={`/${App_Admin}/categories`}
                                icon={<Layers size={24} />}
                                color="bg-pink-100 text-pink-700"
                            />
                        </div> */}

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                أقسام الدورات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الأقسام`}
                                value={stats?.sections_course_count || 0}
                                to={`/${App_Admin}/sections`}
                                icon={<TableOfContents size={24} />}
                                color="bg-green-100 text-green-700"
                            />

                            <StatCard
                                title={`الأقسام التي أنشأتها`}
                                value={stats?.admin_sections_course_count || 0}
                                to={`/${App_Admin}/sections`}
                                icon={<TableOfContents size={24} />}
                                color="bg-purple-100 text-purple-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الدورات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الدورات`}
                                value={stats?.courses_count || 0}
                                to={`/${App_Admin}/courses`}
                                icon={<BookOpen size={24} />}
                                color="bg-indigo-100 text-indigo-700"
                            />

                            <StatCard
                                title={`إجمالي الدورات المباشرة`}
                                value={stats?.courses_is_live_count || 0}
                                to={`/${App_Admin}/coursesislive`}
                                icon={<Radio size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />

                            <StatCard
                                title={`إجمالي المشتركين في الدورات`}
                                value={stats?.total_enrolled_students || 0}
                                to={`/${App_Admin}/dashboard`}
                                icon={<FileQuestion size={24} />}
                                color="bg-orange-100 text-orange-700"
                            />

                            <StatCard
                                title={`الدورات التي أنشأتها`}
                                value={stats?.admin_courses_count || 0}
                                to={`/${App_Admin}/courses`}
                                icon={<BookOpen size={24} />}
                                color="bg-red-100 text-red-700"
                            />
                        </div>

                        {/* <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الدورات المباشرة
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الدورات المباشرة`}
                                value={stats?.courses_is_live_count || 0}
                                to={`/${App_Admin}/coursesislive`}
                                icon={<Radio size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />

                            <StatCard
                                title={`الدورات التي أنشأتها`}
                                value={stats?.admin_courses_is_live_count || 0}
                                to={`/${App_Admin}/courses`}
                                icon={<BookOpen size={24} />}
                                color="bg-red-100 text-red-700"
                            />
                        </div> */}

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الباقات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الباقات`}
                                value={stats?.packages_course_count || 0}
                                to={`/${App_Admin}/packages`}
                                icon={<Package size={24} />}
                                color="bg-lime-100 text-lime-700"
                            />

                            <StatCard
                                title={`الباقات التي أنشأتها`}
                                value={stats?.admin_packages_course_count || 0}
                                to={`/${App_Admin}/packages`}
                                icon={<Package size={24} />}
                                color="bg-stone-100 text-stone-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                أقسام الكتب
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الاقسام`}
                                value={stats?.categories_book_count || 0}
                                to={`/${App_Admin}/sectionsbooks`}
                                icon={<LibraryBig size={24} />}
                                color="bg-neutral-100 text-neutral-700"
                            />

                            <StatCard
                                title={`الاقسام التي أنشأتها`}
                                value={stats?.admin_categories_book_count || 0}
                                to={`/${App_Admin}/sectionsbooks`}
                                icon={<LibraryBig size={24} />}
                                color="bg-teal-100 text-teal-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الكتب
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الكتب`}
                                value={stats?.books_count || 0}
                                to={`/${App_Admin}/books`}
                                icon={<BookCheck size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />

                            <StatCard
                                title={`الكتب التي أنشأتها`}
                                value={stats?.admin_books_count || 0}
                                to={`/${App_Admin}/books`}
                                icon={<BookCheck size={24} />}
                                color="bg-pink-100 text-pink-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                البوربوينت
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي البوربوينت`}
                                value={stats?.powerpoints_count || 0}
                                to={`/${App_Admin}/powerpoints`}
                                icon={<Images size={24} />}
                                color="bg-lime-100 text-lime-700"
                            />

                            <StatCard
                                title={`البوربوينت التي أنشأتها`}
                                value={stats?.admin_powerpoints_count || 0}
                                to={`/${App_Admin}/powerpoints`}
                                icon={<Images size={24} />}
                                color="bg-stone-100 text-stone-700"
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
                                value={stats?.powerpointservice_count || 0}
                                to={`/${App_Admin}/powerpointservices`}
                                icon={<Images size={24} />}
                                color="bg-lime-100 text-lime-700"
                            />

                            <StatCard
                                title={`البوربوينت التي تم الرد عليها`}
                                value={
                                    stats?.powerpointservice_replay_count || 0
                                }
                                to={`/${App_Admin}/powerpointservices`}
                                icon={<Images size={24} />}
                                color="bg-stone-100 text-stone-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                التدقيق اللغوي
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي التدقيق اللغوي`}
                                value={stats?.proofreadingservices_count || 0}
                                to={`/${App_Admin}/proofreadingservices`}
                                icon={<Languages size={24} />}
                                color="bg-amber-100 text-amber-700"
                            />

                            <StatCard
                                title={`تدقيق تم الرد عليه`}
                                value={
                                    stats?.proofreadingservices_replay_count ||
                                    0
                                }
                                to={`/${App_Admin}/proofreadingservices`}
                                icon={<Languages size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                أقسام المقالات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الاقسام`}
                                value={stats?.categories_blogs_count || 0}
                                to={`/${App_Admin}/sectionsblogs`}
                                icon={<NotebookText size={24} />}
                                color="bg-blue-100 text-blue-700"
                            />

                            <StatCard
                                title={`الاقسام التي أنشأتها`}
                                value={stats?.admin_categories_blogs_count || 0}
                                to={`/${App_Admin}/sectionsblogs`}
                                icon={<NotebookText size={24} />}
                                color="bg-cyan-100 text-cyan-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                المقالات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي المقالات`}
                                value={stats?.blogs_count || 0}
                                to={`/${App_Admin}/blogs`}
                                icon={<NotebookPen size={24} />}
                                color={`bg-blue-100 text-blue-700`}
                            />

                            <StatCard
                                title={`المقالات التي أنشأتها`}
                                value={stats?.admin_blogs_count || 0}
                                to={`/${App_Admin}/blogs`}
                                icon={<NotebookPen size={24} />}
                                color="bg-fuchsia-100 text-fuchsia-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الاقتراحات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الاقتراحات`}
                                value={stats?.youTubesuggestions_count || 0}
                                to={`/${App_Admin}/youTubesuggestions`}
                                icon={<Youtube size={24} />}
                                color="bg-gray-100 text-gray-700"
                            />

                            <StatCard
                                title={`الاقتراحات التي أنشأتها`}
                                value={
                                    stats?.admin_youTubesuggestions_count || 0
                                }
                                to={`/${App_Admin}/youTubesuggestions`}
                                icon={<Youtube size={24} />}
                                color="bg-pink-100 text-pink-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                أقوال مأثورة
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الأقوال المأثورة`}
                                value={stats?.famoussayings_count || 0}
                                to={`/${App_Admin}/famoussayings`}
                                icon={<Ampersand size={24} />}
                                color="bg-lime-100 text-lime-700"
                            />

                            <StatCard
                                title={`الأقوال التي أنشأتها`}
                                value={stats?.admin_famoussayings_count || 0}
                                to={`/${App_Admin}/famoussayings`}
                                icon={<Ampersand size={24} />}
                                color="bg-stone-100 text-stone-700"
                            />
                        </div>

                        {/* <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الكوبونات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الكوبونات`}
                                value={stats?.coupons_course_count || 0}
                                to={`/${App_Admin}/coupons`}
                                icon={<TicketPercent size={24} />}
                                color="bg-lime-100 text-lime-700"
                            />

                            <StatCard
                                title={`الكوبونات التي أنشأتها`}
                                value={stats?.admin_coupon_course_count || 0}
                                to={`/${App_Admin}/coupons`}
                                icon={<TicketPercent size={24} />}
                                color="bg-stone-100 text-stone-700"
                            />
                        </div> */}

                        {/* <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                الاختبارات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي الاختبارات`}
                                value={stats?.questionbanks_count || 0}
                                to={`/${App_Admin}/questions-banks`}
                                icon={<FileQuestion size={24} />}
                                color="bg-neutral-100 text-neutral-700"
                            />

                            <StatCard
                                title={`الاختبارات التي أنشأتها`}
                                value={stats?.admin_banks_count || 0}
                                to={`/${App_Admin}/questions-banks`}
                                icon={<FileQuestion size={24} />}
                                color="bg-teal-100 text-teal-700"
                            />
                        </div> */}

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                التواصل
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي التواصل`}
                                value={stats?.contacts_count || 0}
                                to={`/${App_Admin}/contact`}
                                icon={<Send size={24} />}
                                color="bg-sky-100 text-sky-700"
                            />
                        </div>

                        <div data-aos="fade-left">
                            <h2 className="text-2xl font-bold mr-2 text-black">
                                التقييمات
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            <StatCard
                                title={`إجمالي التقييمات`}
                                value={stats?.reviews_count || 0}
                                to={`/${App_Admin}/review`}
                                icon={<Star size={24} />}
                                color="bg-slate-100 text-slate-700"
                            />
                        </div>

                        {/* الرسوم البيانية */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12">
                            <div className="bg-white py-6 ps-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">
                                    توزيع المستخدمين
                                </h3>

                                <div className="h-96">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={chartData}
                                            className="w-full"
                                            width="100%"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="value"
                                                fill="#10b981"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

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
                {/* Chart */}
                {/* <div className="card p-6 my-8 hidden" data-aos="fade-down">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-black">
                            إحصائيات التسجيل
                        </h2>

                        <div className="flex items-center text-blue-600 text-2xl">
                            <BarChart2 size={16} className="ml-1" />
                            عرض التقرير الكامل
                        </div>
                    </div>

                    <div className="h-96 min-h-96 max-h-96">
                        {chartData.labels.length > 0 &&
                        chartData.datasets[0].data.length > 0 ? (
                            <Bar
                                key={JSON.stringify(chartData)}
                                data={chartData}
                                options={chartOptions}
                                className="  min-w-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                لا توجد بيانات متاحة لعرض المخطط
                            </div>
                        )}
                        // <Bar data={chartData} options={chartOptions} />  
                    </div>
                </div> */}

                {/* Recent courses */}
                {/* <div className=" mt-12">
                    <div
                        className="flex justify-between items-center mb-8"
                        data-aos="fade-down"
                    >
                        <h2 className="text-3xl font-bold text-black">
                            الدورات الأخيرة
                        </h2>

                        <Link
                            to={`/${App_Admin}/courses`}
                            className="text-blue-600 text-sm flex items-center"
                        >
                            عرض الكل
                            <ChevronLeft size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stats?.recentCourses?.map((course, index) => (
                            <Link
                                to={`/${App_Admin}/courses/${course?.id}`}
                                key={index}
                                data-aos="flip-right"
                            >
                                <div className="card h-full hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                    <div className="w-full h-48 overflow-hidden rounded-t-lg  -mt-4 mb-3">
                                        <img
                                            src={course?.image || noimage}
                                            alt={course?.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className=" p-4">
                                        <h3 className="font-bold mb-2 text-black">
                                            {course?.title}
                                        </h3>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users size={14} className="ml-1" />
                                            {course?.studentsCount} طالب
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default DashboardAdmin;
