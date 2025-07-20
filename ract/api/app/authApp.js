/* eslint-disable no-unused-vars */
// Importing the userAuthStore hook from the '../store/auth' file to manage authentication state
// import { userAuthStore } from "../../../store/userAuthStore";

// Importing the axios library for making HTTP requests
import axios from "../axios";

// Importing jwt_decode to decode JSON Web Tokens
import { jwtDecode } from "jwt-decode";

// Importing the Cookies library to handle browser cookies
import Cookies from "js-cookie";

// Importing Swal (SweetAlert2) for displaying toast notifications
import Swal from "sweetalert2";

//
import { getRefreshToken, setProfileAuthUser } from "../public/authPublic";

// Configuring global toast notifications using Swal.mixin
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  App Stats  *** //
export const getAppStats = async () => {
    try {
        const { data } = await axios.get(`app-stats/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب البيانات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Categories  *** //
export const appGetCategories = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`category-section/list/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const appGetCategoriesApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`category-section/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const appGetCategoriesResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `category-section/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const appGetCategoryById = async (categoryId) => {
    try {
        const { data } = await axios.get(`category-section/${categoryId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيف",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Sections Course  *** //
export const appGetSectionsCourse = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`section-course/list/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionsCourseApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`section-course/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionsCourseResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `section-course/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionCourseById = async (sectioncourseId) => {
    try {
        const { data } = await axios.get(`section-course/${sectioncourseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب القسم",
            },
        };
    }
};

export const appGetSectionCourseCategory = async (
    categoryId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `section-course/category/${categoryId}/`
            // ,
            // {
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     withCredentials: true,
            // }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Course  *** //
export const appGetCourses = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`course/list/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetCoursesApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`course/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetCoursesResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(`course/result/?result=${numResult}`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetCourseById = async (courseId) => {
    try {
        const { data } = await axios.get(`course/${courseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

export const appGetCourseAllById = async (courseId) => {
    try {
        const { data } = await axios.get(`course/all/${courseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

export const appGetCourseSectionCourse = async (
    sectioncourseId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `course/section-course/${sectioncourseId}/`
            // ,
            // {
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     withCredentials: true,
            // }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Courses Is Free  *** //
export const appGetCoursesIsFree = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`course-isfree/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Courses Is Live  *** //
export const appGetCoursesIsLive = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`course-islive/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Favorite Course  *** //
export const appPostStudentFavoriteCourse = async (enrollData) => {
    try {
        const { data } = await axios.post(
            `student-add-favorte-course/list/`,
            enrollData
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء الاشتراك في الدورة",
            },
        };
    }
};

export const appGetCourseFetchFavoriteStatus = async (studentId, courseId) => {
    try {
        const { data } = await axios.get(
            `fetch-favorite-course-status/${studentId}/${courseId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب حالة الاشتراك في الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Enroll Course  *** //
export const appPostStudentEnrollCourse = async (enrollData) => {
    try {
        const { data } = await axios.post(
            `student-enroll-course/list/`,
            enrollData
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء الاشتراك في الدورة",
            },
        };
    }
};

export const appGetCourseFetchEnrollStatus = async (studentId, courseId) => {
    try {
        const { data } = await axios.get(
            `fetch-enroll-status/${studentId}/${courseId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب حالة الاشتراك في الدورة",
            },
        };
    }
};

export const appPostCouponCourseSearchApp = async (couponSearch) => {
    try {
        const { data } = await axios.get(
            `coupon-course/search-app/${couponSearch}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء البحث عن الكوبون",
            },
        };
    }
};

export const appPostCourseCreateCheckout = async (
    courseId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `create-checkout/`,

            {
                courseId,
            },

            {
                params: {
                    page,
                    status,
                },
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const appGetCoursePaymentResult = async (
    courseId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `create-checkout/`,

            {
                courseId,
            },

            {
                params: {
                    page,
                    status,
                },
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Sections Books  *** //
export const appGetSectionsBooksApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(
            `category-book/list-app/`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionsBooksResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `category-book/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionBookById = async (sectioncourseId) => {
    try {
        const { data } = await axios.get(`category-book/${sectioncourseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب القسم",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Books  *** //
export const appGetBooksApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`book/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetBooksResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(`book/result/?result=${numResult}`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetBookById = async (courseId) => {
    try {
        const { data } = await axios.get(`book/${courseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Powerpoints  *** //
export const appGetPowerpointsApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`powerpoint/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetPowerpointsResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `powerpoint/result/?result=${numResult}`,
            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetPowerpointById = async (courseId) => {
    try {
        const { data } = await axios.get(`powerpoint/${courseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***   Student Enrolled Powerpoint  *** //
export const appPostStudentEnrollPowerpoint = async (enrollData) => {
    try {
        const { data } = await axios.post(
            `student-enroll-powerpoint/list/`,
            enrollData
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء الاشتراك في الدورة",
            },
        };
    }
};

export const appGetPowerpointFetchEnrollStatus = async (
    studentId,
    courseId
) => {
    try {
        const { data } = await axios.get(
            `fetch-enroll-status-powerpoint/${studentId}/${courseId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب حالة الاشتراك في الدورة",
            },
        };
    }
};

// export const appPostCouponCourseSearchApp = async (couponSearch) => {
//     try {
//         const { data } = await axios.get(
//             `coupon-course/search-app/${couponSearch}/`
//         );

//         return { data, error: null };
//     } catch (error) {
//         return {
//             data: null,
//             error: error.response?.data || {
//                 message: "حدث خطأ أثناء البحث عن الكوبون",
//             },
//         };
//     }
// };

export const appPostPowerpointCreateCheckout = async (
    courseId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `create-checkout/`,

            {
                courseId,
            },

            {
                params: {
                    page,
                    status,
                },
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const appGetPowerpointPaymentResult = async (
    courseId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `create-checkout/`,

            {
                courseId,
            },

            {
                params: {
                    page,
                    status,
                },
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Packages  *** //
export const appGetPackagesApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`package-course/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetPackagesResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `package-course/result/?result=${numResult}`,
            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetPackageById = async (courseId) => {
    try {
        const { data } = await axios.get(`package-course/${courseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

export const appGetPackagesCoursesIds = async (
    idsString,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(`course-ids/list/?ids=${idsString}`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Famous Sayings  *** //
export const appGetFamousSayingsResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `famous-saying/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const appGetFamousSayingsRandomResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `famous-saying/random/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Questions Banks  *** //
export const appGetQuestionsBanks = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`question-bank/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختبارات",
            },
        };
    }
};

export const appGetQuestionsBanksApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`question-bank/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختبارات",
            },
        };
    }
};

export const appGetQuestionsBanksResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `question-bank/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختبارات",
            },
        };
    }
};

export const appGetQuestionBankById = async (bankId) => {
    try {
        const { data } = await axios.get(`question-bank/${bankId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختبار",
            },
        };
    }
};

export const appGetQuestionInBankQuestionBanks = async (
    bankId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(`question-bank/${bankId}/questions/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختبارات",
            },
        };
    }
};

export const appGetQuestionBankSectionCourse = async (
    sectioncourseId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `question-bank/section-course/${sectioncourseId}/`
            // ,
            // {
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     withCredentials: true,
            // }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختبارات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Questions Banks Results  *** //
export const appPostQuestionResults = async (bankId, answers) => {
    try {
        const { data } = await axios.post(
            `question-bank/results/${bankId}/`,
            answers
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ",
            },
        };
    }
};

export const appPostQuestionResultsSave = async (resultData) => {
    try {
        const { data } = await axios.post(
            `student-questionbank/result/list-app/`,
            resultData
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Sections Blogs  *** //
export const appGetSectionsBlogsApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`category-blog/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionsBlogsResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `category-blog/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetSectionBlogById = async (sectioncourseId) => {
    try {
        const { data } = await axios.get(`category-blog/${sectioncourseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب القسم",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Blogs  *** //
export const appGetBlogsApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(
            `blog/list-app/`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const appGetBlogsResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `blog/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetBlogById = async (courseId) => {
    try {
        const { data } = await axios.get(`blog/${courseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  YouTube Suggestions Blog  *** //
export const appGetYouTubeSuggestionsBlogResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `youTube-suggestions-blog/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Contact Message  *** //
export const appCreateContactMessage = async (contactData) => {
    try {
        const { data } = await axios.post(
            `contactus-user/list/`,

            contactData
            // {
            //     headers: {
            //         Authorization: `Bearer`,
            //     },
            // }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الرسالة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Review User  *** //
export const appGetReviewUserResults = async (numResult) => {
    try {
        const { data } = await axios.get(
            `review-user/result/?result=${numResult}`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Interview Date  *** //
export const appGetInterviewDatesApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`interview-date/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسارات",
            },
        };
    }
};

export const appGetInterviewDatesResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `interview-date/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetInterviewDateById = async (sectioncourseId) => {
    try {
        const { data } = await axios.get(`interview-date/${sectioncourseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب القسم",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Sections Blog  *** //
export const appGetQuranPathsApp = async (page = 1, status = "") => {
    try {
        const { data } = await axios.get(`quran-path/list-app/`, {
            params: {
                page,
                status,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسارات",
            },
        };
    }
};

export const appGetQuranPathsResult = async (
    numResult = 9,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `quran-path/result/?result=${numResult}`,

            {
                params: {
                    page,
                    status,
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const appGetQuranPathById = async (sectioncourseId) => {
    try {
        const { data } = await axios.get(`quran-path/${sectioncourseId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب القسم",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Quran School Enrollment  *** //
export const appCreateStudentQuranSchoolEnrollment = async (contactData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `student-quran-school-enrollment/list/`,

            contactData,
            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                },
            }
        );
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء ألارسال",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================

// *****************************************************************************************************************************
// =============================================================================================================================
