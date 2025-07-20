import React from "react";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import { nameMainColor } from "../../../../utils/constants";

function QuestionBankCard({ questionbank }) {
    return (
        <>
            <div
                //
                data-aos="flip-right"
                className={`
                
                    ${questionbank.is_visible === false ? "hidden" : ""}    
                `}
            >
                <div
                    // key={index}
                    className={`card transition-all duration-500  
                    hover:transition-all hover:duration-500
                    hover:shadow-lg hover:-translate-y-4
                    group p-8 rounded-4xl 
                     
                `}
                >
                    <div className="aspect-video min-h-80 max-h-80 w-full overflow-hidden rounded-3xl mb-4 ">
                        <img
                            src={
                                questionbank?.image_url ||
                                questionbank?.image ||
                                noimage
                                // || defaultImage
                            }
                            alt={questionbank?.title}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-110 overflow-hidden min-h-80 max-h-80"
                        />
                    </div>

                    <h3 className="text-3xl font-semibold text-gray-800 mb-2 truncate ">
                        {questionbank?.title}
                    </h3>

                    <p className="text-lg text-gray-600 mb-4 line-clamp-2 truncate">
                        {questionbank?.description}
                    </p>

                    <p className="text-md text-fuchsia-500 mb-2 flex items-center gap-4">
                        {questionbank?.section_name}
                    </p>

                    <div className="flex items-center justify-between">
                        <div>
                            <span
                                className={`text-lg font-medium text-blue-500`}
                            >
                                عدد الاسئلة (
                                {questionbank?.total_question_in_bank || 0})
                            </span>
                        </div>

                        <Link
                            to={`/questions-banks/${questionbank?.id}`}
                            // className=" flex items-center space-x-1"
                            className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2`}
                        >
                            <span>أبداء الاختبار</span>

                            <FiExternalLink size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionBankCard;
