/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style
import "./StatsHome.scss";

// api
import { getAppStats } from "../../../../api/app/authApp";

// data
import { statsData } from "../../../../data/data";

// components
import Stat from "./Stat";
import { nameMainColor } from "../../../../utils/constants";

function StatsHome() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [isVisible, setIsVisible] = useState(false);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await getAppStats();

                if (error) {
                    setError(error?.message);
                } else {
                    setStats(data);
                }
            } catch (error) {
                setError("حدث خطأ أثناء جلب البيانات");
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);
    // console.log(`eeee`, stats);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
    //             {error}
    //         </div>
    //     );
    // }

    // console.log(`eee`, stats);

    return (
        <>
            <section
                className="section stats"
                aria-label="stats"
                ref={sectionRef}
            >
                <div className="container">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : stats?.length === 0 || !stats ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {" "}
                            <Stat title={`نجاح`} value={100} />
                            <Stat title={`سنوات الخبرة`} value={5} />
                        </ul>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Stat title={`نجاح`} value={100} />
                            <Stat
                                title={`دورات`}
                                value={stats?.courses_count}
                                to={`/courses`}
                            />
                            <Stat
                                title={`طلاب مسجلين`}
                                value={stats?.students_count}
                            />
                            <Stat title={`سنوات الخبرة`} value={5} />

                            {/* {stats?.map((stat, index) => (
                            <li key={index} data-aos="flip-left">
                                <div className="stats-card">
                                    <h3 className="card-title">
                                        <Counter
                                            value={stat.value || 0}
                                            duration={
                                                (stat.value || 0) > 500
                                                    ? 3000
                                                    : (stat.value || 0) > 100
                                                    ? 2500
                                                    : 2000
                                            }
                                            startCounting={isVisible}
                                        />
                                    </h3>
                                    <p className="card-text">
                                        {stat.label || ""}
                                    </p>
                                </div>
                            </li>
                        ))} */}
                        </ul>
                    )}
                </div>
            </section>
        </>
    );
}

export default StatsHome;
