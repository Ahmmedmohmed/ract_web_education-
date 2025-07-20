/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BadgeAlert, Loader2 } from "lucide-react";

// api
import {
    appCreateStudentQuranSchoolEnrollment,
    appGetInterviewDatesApp,
} from "../../../../../../api/app/authApp";

// store
import UserDataStore from "../../../../../../store/UserDataStore";

// data
import {
    countries,
    exchangeRates,
    pricingConfig,
    testAppointments,
} from "../../../../../../data/quranschoolDate";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { PAGE_SIZE } from "../../../../../../utils/constants";
import { formatDateDay } from "../../../../../../utils/helpers";

function MurajaaForm({ path }) {
    const navigate = useNavigate();
    const { userData, userProfile } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm();

    const [activeTab, setActiveTab] = useState("level1");
    const trackConfig = {
        type: "murajaa",
        formTitle: "اسْتِمَارَةُ طَلَبِ مُقَابَلَةٍ لِمَسَارِ المُرَاجَعَةِ",
        submitText: "حَجْزُ مَوْعِدِ المُقَابَلَةِ",
        depositText:
            "بَعْدَ قَبُولِكَ، سَيُطْلَبُ مِنْكَ دَفْعُ رسومِ تأكيدِ الحجزِ بقيمة <strong>{amount} {currency}</strong>.",
    };

    //
    const [selectedLevel, setSelectedLevel] = useState("");
    const [countryInfo, setCountryInfo] = useState(null);
    const [showPricing, setShowPricing] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState("annual");
    const [selectedCountry, setSelectedCountry] = useState("");

    //
    let selectedCountryFind = countries.find(
        (country) => country.name === selectedCountry
    );
    // console.log(`x`,x);

    // const { zone, currency } = selectedCountry;
    const { zone, currency } = selectedCountryFind || "";
    // const basePrice = pricingConfig[trackType][zone];
    const basePrice = pricingConfig["murajaa"][zone];

    let rate = 1;
    if (zone === "egp" && currency !== "EGP")
        rate = exchangeRates.egp[currency] || 1;
    else if (zone === "sar" && currency !== "SAR")
        rate = exchangeRates.sar[currency] || 1;
    else if (zone === "usd" && currency !== "USD")
        rate = exchangeRates.usd[currency] || 1;

    const localPrice = Math.round(basePrice * rate);
    const deposit = Math.round(localPrice * 0.1);
    const remaining = localPrice - deposit;

    const firstInstallment = Math.ceil(remaining / 2);
    const secondInstallment = remaining - firstInstallment;

    //
    const [interviewDates, setInterviewDates] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchInterviewDate = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetInterviewDatesApp(
                    currentPage,
                    selectedStatus
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                    navigate(`/`);
                } else {
                    setInterviewDates(data);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
                navigate(`/`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterviewDate();
    }, [currentPage, selectedStatus]);

    //
    const handleSubmitEnrollment = async (formData) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();
            courseData.append("student", userData?.id || null);
            courseData.append("quran_path", path?.id || null);

            courseData.append("full_name", formData.full_name);
            courseData.append("age", formData.age);
            courseData.append("phone_number", formData.phone_number);
            courseData.append("whatsapp_number", formData.whatsapp_number);
            courseData.append("email", formData.email);

            courseData.append("country", formData.country);
            courseData.append("about_level", formData.about_level);

            courseData.append("classroom", formData.classroom);
            courseData.append("review_level", formData.review_level);

            courseData.append("chapter_in_quran", formData.chapter_in_quran);

            courseData.append("interview_date", formData.interview_date);

            // courseData.append("total_amount", formData.total_amount);
            // courseData.append("remaining_amount", formData.remaining_amount);
            // courseData.append("paid_amount", formData.paid_amount);

            courseData.append("total_amount", localPrice);
            courseData.append("remaining_amount", remaining);
            courseData.append("paid_amount", deposit);

            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            // const { data, error } = await appCreateStudentQuranSchoolEnrollment(courseData);

            // if (error) {
            //     if (error.image) {
            //         setErrorsMessage(error.image);
            //         Toast("error", error.image);
            //     } else if (error.message) {
            //         Toast("error", error.message);
            //     }
            // } else {
            //     Toast("success", "تم إنشاء الدورة بنجاح");
            //     navigate(`/`);
            // }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الدورة");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCountry && selectedLevel) {
            setShowPricing(true);
        } else {
            setShowPricing(false);
        }
    }, [countryInfo, selectedLevel, selectedCountry]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`interviewDates`, interviewDates);

    return (
        <>
            <div
                id="murajaa-details"
                className=" rounded-lg border border-gray-200"
            >
                <div className="bg-white rounded-lg shadow-md  p-6 ">
                    <h4 className="text-4xl font-bold text-center mb-8 text-blue-800">
                        اسْتِمَارَةُ طَلَبِ مُقَابَلَةٍ لِمَسَارِ المُرَاجَعَةِ
                    </h4>

                    {/* <RegistrationForm */}
                    <form
                        // trackType="murajaa"
                        // {...trackConfig}
                        // onSubmit={(e) => alert("تم حجز موعد المقابلة بنجاح!")}
                        onSubmit={handleSubmit(handleSubmitEnrollment)}
                        className="space-y-6 flex flex-col gap-6"
                    >
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                الاسْمُ الكَامِلُ*
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                placeholder="مثال: محمد احمد"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("full_name", {
                                    required: "الاسم مطلوب",
                                    value:
                                        userData?.first_name +
                                        " " +
                                        userData?.last_name,
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.full_name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="age"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                العُمْرُ*
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                min={0}
                                placeholder="مثال: 20"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("age", {
                                    required: "العمر مطلوب",
                                    min: {
                                        value: 0,
                                        message: "العمر لا يمكن أن يكون سالباً",
                                    },
                                    value: userProfile?.age,
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.age && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.age.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="phone_number"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                رَقْمُ الهَاتِفِ*
                            </label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                placeholder="مثال: 0201256449"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("phone_number", {
                                    required: "رَقْمُ الهَاتِفِ مطلوب",
                                    value: userProfile?.phone_number,
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.phone_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone_number.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="whatsapp_number"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                رَقْمُ الوَاتس آب*
                            </label>
                            <input
                                type="text"
                                id="whatsapp_number"
                                name="whatsapp_number"
                                placeholder="مثال: 0201256449"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("whatsapp_number", {
                                    required: " رَقْمُ الوَاتس آب مطلوب",
                                    value: userProfile?.phone_number,
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.whatsapp_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.whatsapp_number.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                البَرِيدُ الإلِكْتُرُونِيُّ*
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="مثال: محمد احمد"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("email", {
                                    required: `هذا الحقل مطلوب.`,
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: `الرجاء تقديم عنوان بريد إلكتروني صالح.`,
                                    },
                                    value: userData?.email,
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="about_level"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                نُبْذَةٌ عَنْ مُسْتَوَاكَ الحَالِيِّ*
                            </label>
                            <textarea
                                id="about_level"
                                name="about_level"
                                rows="4"
                                placeholder="مثال: ختمتُ القرآن منذ سنة، وحفظي متقن بنسبة 70%..."
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("about_level", {
                                    required: "نُبْذَةٌ مطلوبة",
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            ></textarea>
                            {errors.about_level && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.about_level.message}
                                </p>
                            )}
                        </div>

                        <hr className="border-t-2 border-gray-200 my-8" />

                        <div>
                            <label
                                htmlFor="country"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                الدَّوْلَةُ*
                            </label>
                            <select
                                id="country"
                                {...register("country", {
                                    required: "الدولة مطلوبة",
                                    onChange: (e) => {
                                        //
                                        // console.log(`e`, e.target);
                                        setSelectedCountry(e.target.value);
                                    },
                                })}
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            >
                                <option value="">اختر الدولة</option>
                                {countries?.map((country, index) => (
                                    <option
                                        key={index}
                                        value={country.name}
                                        className="text-black"
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.country.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="review_level"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                المستوي المطلوب*
                            </label>
                            <select
                                id="review_level"
                                name="review_level"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("review_level", {
                                    required: "المستوي مطلوب",
                                    onChange: (e) => {
                                        setSelectedLevel(e.target.value);
                                        // setCurriculumIndex(
                                        //     parseInt(
                                        //         e.target.dataset.index || "0"
                                        //     )
                                        // );
                                    },
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            >
                                <option value="">
                                    اخْتَرِ المستوي الدِّرَاسِيَّ
                                </option>
                                {path?.review_levels?.map((level, index) => (
                                    <option key={index} value={level.id}>
                                        {level.id}) ({level.title})
                                    </option>
                                ))}
                            </select>
                            {errors.review_level && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.review_level.message}
                                </p>
                            )}
                        </div>

                        {selectedLevel ? (
                            <div>
                                <label
                                    htmlFor="interview_date"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    موعد الاختبار*
                                </label>
                                <select
                                    id="interview_date"
                                    name="interview_date"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("interview_date", {
                                        required: "الفصل مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">
                                        اخْتَرْ مَوْعِدًا لِاخْتِبَارِ تَحْدِيدِ
                                        المُسْتَوَى
                                    </option>
                                    {interviewDates?.map((interview, index) => (
                                        <option
                                            key={index}
                                            value={interview.id}
                                        >
                                            {interview.id}) (
                                            {formatDateDay(
                                                interview.schedule_time
                                            )}
                                            )
                                        </option>
                                    ))}
                                </select>
                                {errors.interview_date && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.interview_date.message}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}

                        {showPricing ? (
                            <div className="bg-blue-50 border border-blue-500 rounded-lg p-5 text-center my-4">
                                <h4 className="text-2xl font-bold text-blue-800 mb-4">
                                    تَكَالِيفُ المَسَارِ وَخُطَطُ الدَّفْعِ
                                </h4>

                                <p className="text-lg mb-2">
                                    <strong>المَبْلَغُ الإِجْمَالِيُّ:</strong>{" "}
                                    {localPrice.toLocaleString()} {currency}
                                </p>

                                <div className="border-t border-blue-500 pt-4 mt-4">
                                    {paymentPlan === "annual" ? (
                                        <p className="font-bold text-blue-800">
                                            المَبْلَغُ المُتَبَقِّي يُدْفَعُ
                                            مَرَّةً وَاحِدَةً:{" "}
                                            {remaining.toLocaleString()}{" "}
                                            {currency} (قَبْلَ بَدْءِ
                                            الدِّرَاسَةِ)
                                        </p>
                                    ) : (
                                        <>
                                            <p className="font-bold text-blue-800">
                                                الدُّفْعَةُ الأُولَى:{" "}
                                                {firstInstallment.toLocaleString()}{" "}
                                                {currency} (قَبْلَ الفَصْلِ
                                                الدِّرَاسِيِّ الأَوَّلِ)
                                            </p>
                                            <p className="font-bold text-blue-800">
                                                الدُّفْعَةُ الثَّانِيَةُ:{" "}
                                                {secondInstallment.toLocaleString()}{" "}
                                                {currency} (قَبْلَ الفَصْلِ
                                                الدِّرَاسِيِّ الثَّانِي)
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 justify-center items-center bg-orange-50 border border-orange-200 text-gray-800 font-medium rounded-lg p-3 mt-4 text-sm">
                                    <BadgeAlert className="fas fa-info-circle text-orange-500 mr-2" />

                                    <div className="flex items-center justify-center gap-4">
                                        <span>
                                            لِتَأْكِيدِ الحَجْزِ، يُطْلَبُ
                                            دَفْعُ رسوم تأكيد الحجز بقيمة
                                        </span>

                                        <strong>
                                            {deposit.toLocaleString()}{" "}
                                            {currency}.
                                        </strong>
                                    </div>

                                    {/* <span
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: depositText,
                                                                            }}
                                                                        /> */}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                            >
                                حَجْزُ مَوْعِدِ المُقَابَلَةِ
                            </button>
                        </div>

                        {/* <div className="mb-5">
                        <label className="block font-semibold mb-3">
                            اخْتَرْ مَوْعِدًا لِلمُقَابَلَةِ (مواعيد مُتاحة)
                        </label>
                        <div className="space-y-3 flex flex-col gap-4">
                            {testAppointments.map((slot, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="radio"
                                        name="murajaa_test_slot"
                                        value={`${slot.day} - ${slot.time}`}
                                        required
                                        className="hidden"
                                    />
                                    <div className="p-4 border-2 border-gray-300 transition-all duration-500 rounded-lg cursor-pointer hover:border-blue-500">
                                        <div>
                                            <h5 className="text-lg font-semibold">
                                                {slot.day}
                                            </h5>
                                            <p className="text-gray-600">
                                                الساعة: {slot.time}
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div> */}
                    </form>
                </div>
            </div>
        </>
    );
}

export default MurajaaForm;
