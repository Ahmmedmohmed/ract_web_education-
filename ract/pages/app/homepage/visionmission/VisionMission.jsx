/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Eye, Goal } from "lucide-react";

// style

// utils

// assets

function VisionMission() {
    const VisionAndMission = [
        {
            icon: <Eye size={60} className=" text-blue-800" />,
            title: `رؤيتنا`,
            description: `أن نكون رواداً في توفير تعليم مبتكر ومتميز يعزز المهارات الإبداعية والقدرات التحليلية، ويؤهل الطلاب لمواكبة متطلبات العصر الرقمي، والمساهمة في بناء مجتمع المعرفة وتحقيق التنمية المستدامة.`,
        },
        {
            icon: <Goal size={60} className=" text-red-500" />,
            title: `رسالتنا`,
            description: `تقديم تعليم نوعي ومبتكر يعزز المهارات الفكرية والعملية للطلاب، ويسهم في تطوير شخصياتهم وتمكينهم من المساهمة الفاعلة في بناء مجتمع المعرفة والاقتصاد الرقمي.`,
        },
    ];

    return (
        <>
            <section className=" category pb-80">
                <div className="container  max-w-full">
                    <div className="px-8 py-8">
                        <ul
                            className={
                                "grid grid-cols-1 md:grid-cols-2  gap-12"
                            }
                        >
                            {VisionAndMission &&
                                VisionAndMission?.map((vam, index) => (
                                    <li
                                        key={index}
                                        className=""
                                        data-aos="zoom-in-up"
                                    >
                                        <div
                                            className={`group min-h-full bg-white   rounded-2xl overflow-hidden shadow-lg 
                                                transform hover:scale-105 hover:transition-all 
                                                hover:duration-500 transition-all duration-500 
                                            `}
                                        >
                                            <div className="h-6 bg-gradient-to-r from-amber-600 to-amber-400"></div>
                                            <div className=" py-8 px-8 text-center flex flex-col items-center gap-4  ">
                                                <div className="card-icon bg-blue-900/10  rounded-full flex items-center justify-center mb-6 w-36 h-36  shadow-lg ">
                                                    {/* <img
                                                src={
                                                    vam?.image || category1
                                                }
                                                width="40"
                                                height="40"
                                                loading="lazy"
                                                alt={`${vam?.title}`}
                                                className="img"
                                            /> */}
                                                    {vam?.icon}
                                                </div>

                                                <h3 className="h3 text-3xl font-bold text-blue-900 pb-4 border-b-4 border-transparent  group-hover:border-b-4 group-hover:border-fuchsia-600 transition-all duration-500">
                                                    <Link
                                                        // to={`/`}
                                                        // href="#"
                                                        className="card-title"
                                                    >
                                                        {vam?.title}
                                                    </Link>
                                                </h3>

                                                <p className="card-text text-3xl    text-gray-700 leading-relaxed">
                                                    {vam?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 opacity-100 translate-y-0 mt-10 hidden">
                            {VisionAndMission &&
                                VisionAndMission?.map((vam, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-md transform hover:scale-105 transition-all duration-500"
                                        style={{ animationDelay: "0ms" }}
                                    >
                                        <div className="flex-shrink-0 me-4 p-4 bg-white rounded-full shadow-lg">
                                            {vam?.icon}
                                        </div>

                                        <div>
                                            <h3 className="text-4xl font-semibold text-gray-800 mb-2">
                                                {vam?.title}
                                            </h3>

                                            <p className="text-2xl text-gray-600  leading-relaxed">
                                                {vam?.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VisionMission;
