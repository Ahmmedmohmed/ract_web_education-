/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styled from "styled-components";
import quotes from "quotesy";
import translate from "translate";

// store
import UserDataStore from "../../../store/UserDataStore";

// utils
import { SERVER_URL } from "../../../utils/constants";

// ui
import Row from "../../../ui/global/Row";

// assets
import imageuser from "../../../assets/images/user/default-user.jpg";

function UserHome() {
    let { userData, userProfile } = UserDataStore();

    //
    const { author, text } = quotes.random();

    // دالة للترجمة
    const [translatedText, setTranslatedText] = useState("");
    const [translatedAuthor, setTranslatedAuthor] = useState("");

    const translateQuote = async (text, author) => {
        try {
            const translatedText = await translate(text, { to: "ar" }); // ترجمة النص إلى العربية
            const translatedAuthor = await translate(author, { to: "ar" }); // ترجمة المؤلف إلى العربية
            setTranslatedText(translatedText);
            setTranslatedAuthor(translatedAuthor);
        } catch (error) {
            console.error("Error translating quote:", error);
            setTranslatedText(text); // إذا فشلت الترجمة، استخدم النص الأصلي
            setTranslatedAuthor(author); // إذا فشلت الترجمة، استخدم المؤلف الأصلي
        }
    };

    // استخدام useEffect لجلب الاقتباس وترجمته عند تحميل المكون
    useEffect(() => {
        const { author, text } = quotes.random();
        translateQuote(text, author);
    }, []);

    return (
        <>
            <div
                data-aos="fade-down"
                className={`
                    mt-16 flex flex-col items-center justify-center gap-6
                    relative font-bold text-3xl
                    text-gray-100 text-center w-full
                `}
            >
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full  ">
                        {userProfile?.image.startsWith("/media/user/") ? (
                            <img
                                // src={avatar || `images/user/default-user.jpg`}
                                // src={`${
                                //     `${SERVER_URL}` + userProfile?.image || imageuser
                                // }`}
                                src={
                                    `${SERVER_URL}${userProfile?.image}` ||
                                    imageuser
                                }
                                alt={`Avatar of 
                                    ${userData?.first_name || `Mazen`} 
                                    ${userData?.last_name || `Saad`}
                                `}
                                onError={(e) => {
                                    e.target.src = imageuser;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className=" w-full h-1/2
                                    block aspect-square object-cover object-center rounded-full 
                                    border-2 border-gray-700 relative shadow-2xl
                                "
                                data-aos="fade-down"
                            />
                        ) : (
                            <img
                                // src={avatar || `images/user/default-user.jpg`}
                                // src={`${
                                //     `${SERVER_URL}` + userProfile?.image || imageuser
                                // }`}
                                src={userProfile?.image || imageuser}
                                alt={`Avatar of 
                                    ${userData?.first_name || `Mazen`} 
                                    ${userData?.last_name || `Saad`}
                                `}
                                onError={(e) => {
                                    e.target.src = imageuser;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className=" w-full h-1/2
                                    block aspect-square object-cover object-center rounded-full 
                                    border-2 border-gray-700 relative shadow-2xl
                                "
                                data-aos="fade-down"
                            />
                        )}
                    </div>

                    <span
                        className="text-blue-500 text-8xl my-10 text-wrap"
                        data-aos="fade-down"
                    >
                        {`
                            ${userData?.first_name || `محمد `} 
                            ${userData?.last_name || ` العمري`}
                        `}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    {/* <Blockquote data-aos="fade-down">
                        <Text>{text}</Text>
                        <Cite>-{author}</Cite>
                    </Blockquote> */}

                    <blockquote
                        data-aos="fade-down"
                        className="w-full flex flex-col gap-6 text-center text-3xl
                        bg-gray-900 rounded-2xl shadow-md p-5 border border-gray-700
                        transition-all duration-500
                        "
                    >
                        <h4 className="text-4xl">
                            {translatedText || `الصعوبات هي طريق النجاح`}
                        </h4>

                        <cite className="text-2xl">
                            - {translatedAuthor || `مازن سعد`}
                        </cite>
                    </blockquote>
                </div>
            </div>
        </>
    );
}

export default UserHome;
