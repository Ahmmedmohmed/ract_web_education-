/* eslint-disable no-unused-vars */

// Importing the axios library for making HTTP requests
import axios from "../axios";

// Importing jwt_decode to decode JSON Web Tokens
import { jwtDecode } from "jwt-decode";

// Importing the Cookies library to handle browser cookies
import Cookies from "js-cookie";

// Importing Swal (SweetAlert2) for displaying toast notifications
import Swal from "sweetalert2";

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
// Function to handle user logout
export const userRemoveData = () => {
    // Removing access and refresh tokens from cookies, resetting user state, and displaying success toast
    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("userData");
    Cookies.remove("userProfile");
    Cookies.remove("userEmail");
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle user public login
export const userPublicLogin = async (email, password) => {
    try {
        // Making a POST request to login a new user
        const { data, status } = await axios.post("auth/public/login/", {
            email,
            password,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Login Successfully.",
        });

        // console.log(`ee->`, data);

        if (status === 200 || data?.code === 0) {
            let userData = JSON.stringify(data?.data);

            let userDataProfile = JSON.stringify(data?.profile);

            // setAuthUser(
            //     userData,
            //     userDataProfile,
            //     data?.access_token,
            //     data?.refresh_token
            // );
            setDataAuthUser(userData);
            setProfileAuthUser(userDataProfile);
            setAccessTokenAuthUser(data?.access_token);
            setRefreshTokenAuthUser(data?.refresh_token);
        }

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || "Something went wrong",
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle verification account
export const publicVerifyAccount = async (otp_code) => {
    try {
        // Making a POST request to verify account
        const { data } = await axios.post("auth/public/verify-account/", {
            otp_code,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Verify Account Successfully.",
        });

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle Resend OTP
export const publicResendOTP = async (email) => {
    try {
        // Making a POST request to resend OTP
        const { data } = await axios.post("auth/public/resend-otp/", {
            email,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "OTP has been resent to your email.",
        });

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle user update data
export const userPublicUpdateData = async (id, first_name, last_name) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.patch(`auth/public/user/${id}/`, {
            first_name,
            last_name,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "User Update Data Successfully.",
        });

        let userData = JSON.stringify(data);
        setDataAuthUser(userData);

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle user change password
export const userPublicChangePassword = async (
    refresh_token,
    old_password,
    new_password,
    confirm_password
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/public/change-password/", {
            refresh_token,
            old_password,
            new_password,
            confirm_password,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Change Password Successfully.",
        });

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Logout  *** //
export const userPublicLogout = async (refresh_token) => {
    try {
        // Making a POST request to logout
        const { data } = await axios.post("auth/public/logout/", {
            refresh_token,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Logout Successfully.",
        });

        userRemoveData();

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle user Reset password
export const userPublicResetPassword = async (email) => {
    try {
        // Making a POST request to Reset password
        const { data } = await axios.post("auth/public/reset-password/", {
            email,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Reset Password Successfully",
        });

        // if (data) {
        //     let userData = localStorage.setItem(
        //         "userData",
        //         JSON.stringify(data?.data)
        //     );
        // }

        if (data) {
            Cookies.set("userData", JSON.stringify(data?.data), {
                expires: 1, // Refresh token expires in 7 days
                secure: true,
            });
        }

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle user Confirm Reset Password
export const userPublicConfirmResetPassword = async (
    otp,
    password,
    password2
) => {
    try {
        // Making a POST request to Confirm Reset Password
        const { data } = await axios.post(
            "auth/public/confirm-reset-password/",
            {
                otp,
                password,
                password2,
            }
        );

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Confirm Reset Password Successfully.",
        });

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || `لقد حدث خطأ ما`,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  User  *** //
export const publicGetUserPK = async (userId) => {
    try {
        const { data } = await axios.get(`auth/public/user/${userId}/`);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المستخدم",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Auth Google  *** //
export const publicAuthGoogleLogin = async (access_token) => {
    try {
        // Making a POST request to login a new user
        const { data, status } = await axios.post(
            "auth/google/login/",

            {
                access_token,
            }
        );

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Login Successfully.",
        });

        // console.log(`ee->`, data);

        if (status === 200 || data?.code === 0) {
            let userData = JSON.stringify(data?.data);

            let userDataProfile = JSON.stringify(data?.profile);

            setDataAuthUser(userData);
            setProfileAuthUser(userDataProfile);
            setAccessTokenAuthUser(data?.access_token);
            setRefreshTokenAuthUser(data?.refresh_token);
        }

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data || "Something went wrong",
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Courses  *** //
export const publicGetCourses = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`course/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetCoursesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`course/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchCourses = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`courses/search/${searchString}/`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateCourse = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `course/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetCourseById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`course/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdateCourse = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `course/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdateCourseStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `course/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateCourseVisibility = async (courseId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `course/${courseId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteCourse = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`course/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Courses Is Live  *** //
export const publicGetCoursesIsLive = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`course-islive/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchCoursesIsLive = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `courses-islive/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Course Sections  *** //
export const publicGetSectionsInCourse = async (
    courseId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`courses/${courseId}/sections/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
                "Content-Type": "multipart/form-data",
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

export const publicSearchSectionsInCourse = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/questions/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicSearchSectionsInCourseId = async (
    courseId,
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/${courseId}/questions/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateSectionInCourse = async (courseId, createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `courses/${courseId}/sections/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء القسم",
            },
        };
    }
};

export const publicGetSectionInCourseById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`courses/sections/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdateSectionInCourse = async (sectionId, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/${sectionId}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث القسم",
            },
        };
    }
};

export const publicUpdateSectionInCourseStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateSectionInCourseVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteSectionInCourse = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`courses/sections/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Course Lessons  *** //
export const publicGetLessonsInCourse = async (
    sectionId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `courses/sections/${sectionId}/lessons/`,
            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الدروس",
            },
        };
    }
};

export const publicSearchLessonsInCourse = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/questions/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicSearchLessonsInCourseId = async (
    courseId,
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/${courseId}/questions/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateLessonInCourse = async (sectionId, createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            // `courses/sections/${sectionId}/lessons/`,
            `courses/sections/lessons/list/`,
            // `courses/sections/list/${sectionId}/lessons/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدرس",
            },
        };
    }
};

export const publicGetLessonInCourseById = async (lessonId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `courses/sections/lessons/${lessonId}/`,

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
                message: "حدث خطأ أثناء جلب الدرس",
            },
        };
    }
};

export const publicUpdateLessonInCourse = async (lessonId, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/lessons/${lessonId}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدرس",
            },
        };
    }
};

export const publicUpdateLessonInCourseStatus = async (lessonId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/lessons/${lessonId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateLessonInCourseVisibility = async (
    lessonId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/lessons/${lessonId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteLessonInCourse = async (lessonId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `courses/sections/lessons/${lessonId}/`,

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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Answer  *** //
export const publicUpdateStudentAnswerInCourseStatus = async (
    lessonId,
    status
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `courses/sections/lessons/student-answer/${lessonId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicFetchStudentAnswerInCourseStatus = async (
    studentId,
    lessonId
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `fetch-student-answer-in-course-status/${studentId}/${lessonId}/`,

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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Packages  *** //
export const publicGetPackages = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`package-course/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetPackagesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`package-course/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchPackages = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `package-courses/search/${searchString}/`,

            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreatePackages = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `package-course/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetPackageById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`package-course/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdatePackage = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `package-course/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdatePackageStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `package-course/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdatePackageVisibility = async (courseId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `package-course/${courseId}/`,

            {
                is_visible,
            },

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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeletePackage = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `package-course/${courseId}/`,

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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Package Course Discount  *** //
export const publicGetPackageCourseDiscountById = async () => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`package-course-discount/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdatePackageCourseDiscount = async (updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `package-course-discount/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Fetch Enrolled Students  *** //
export const publicGetFetchEnrolledStudentsCourse = async (courseId) => {
    try {
        const { data } = await axios.get(
            `fetch-enrolled-students/${courseId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المشتركين في الدورة",
            },
        };
    }
};

export const publicPostAddStudentEnrollCourse = async (enrollData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `student-enroll-course/list/`,

            enrollData,

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
                message: "حدث خطأ أثناء الاشتراك في الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Chat  *** //
export const publicGetMessageTeacherStudentChat = async (
    teacherId,
    studentId
) => {
    try {
        const { data } = await axios.get(
            `get-message-teacher-student-chat/${teacherId}/${studentId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المشتركين في الدورة",
            },
        };
    }
};

export const publicSendMessageTeacherStudentChat = async (
    teacherId,
    studentId,
    chatData
) => {
    try {
        const { data } = await axios.post(
            `send-message-teacher-student-chat/${teacherId}/${studentId}/`,
            chatData
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المشتركين في الدورة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Books  *** //
export const publicGetBooks = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`book/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetBooksAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`book/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchBooks = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`book/search/${searchString}/`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateBook = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `book/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetBookById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`book/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdateBook = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `book/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdateBookStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `book/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateBookVisibility = async (courseId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `book/${courseId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteBook = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`book/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Blogs  *** //
export const publicGetBlogs = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`blog/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetBlogsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`blog/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchBlogs = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`blogs/search/${searchString}/`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateBlog = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `blog/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetBlogById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`blog/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdateBlog = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `blog/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdateBlogStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `blog/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateBlogVisibility = async (courseId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `blog/${courseId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteBlog = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`blog/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  YouTube Suggestions Blog  *** //
export const publicGetYouTubeSuggestionsBlog = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`youTube-suggestions-blog/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetYouTubeSuggestionsBlogAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `youTube-suggestions-blog/list-admin/`,
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
                message: "حدث خطأ أثناء جلب الدورات",
            },
        };
    }
};

export const publicSearchYouTubeSuggestionsBlog = async (
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `youTube-suggestions-blog/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateYouTubeSuggestionsBlog = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `youTube-suggestions-blog/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetYouTubeSuggestionBlogById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `youTube-suggestions-blog/${courseId}/`,
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
                message: "حدث خطأ أثناء جلب الدورة",
            },
        };
    }
};

export const publicUpdateYouTubeSuggestionBlog = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `youTube-suggestions-blog/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdateYouTubeSuggestionBlogStatus = async (
    courseId,
    status
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `youTube-suggestions-blog/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateYouTubeSuggestionBlogVisibility = async (
    courseId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `youTube-suggestions-blog/${courseId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteYouTubeSuggestionBlog = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `youTube-suggestions-blog/${courseId}/`,
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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Powerpoints  *** //
export const publicGetPowerpoints = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`powerpoint/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetPowerpointsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`powerpoint/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchPowerpoints = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `powerpoints/search/${searchString}/`,

            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreatePowerpoint = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `powerpoint/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetPowerpointById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`powerpoint/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdatePowerpoint = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `powerpoint/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdatePowerpointStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `powerpoint/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdatePowerpointVisibility = async (
    courseId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `powerpoint/${courseId}/`,

            {
                is_visible,
            },

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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeletePowerpoint = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`powerpoint/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Powerpoints Services  *** //
export const publicGetPowerpointsServices = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`powerpoint-service/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetPowerpointsServicesAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`powerpoint-service/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchPowerpointsServices = async (
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `powerpoints-services/search/${searchString}/`,

            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreatePowerpointsService = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `powerpoint-service/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetPowerpointServiceById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`powerpoint-service/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdatePowerpointService = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `powerpoint-service/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdatePowerpointServiceStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `powerpoint-service/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdatePowerpointServiceVisibility = async (
    courseId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `powerpoint-service/${courseId}/`,

            {
                is_visible,
            },

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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeletePowerpointService = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`powerpoint-service/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Proofreading Services  *** //
export const publicGetProofreadingServices = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`proofreading-service/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetProofreadingServicesAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`proofreading-service/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchProofreadingServices = async (
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `proofreading-services/search/${searchString}/`,

            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateProofreadingService = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `proofreading-service/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetProofreadingServiceById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`proofreading-service/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdateProofreadingService = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `proofreading-service/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdateProofreadingServiceStatus = async (
    courseId,
    status
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `proofreading-service/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateProofreadingServiceVisibility = async (
    courseId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `proofreading-service/${courseId}/`,

            {
                is_visible,
            },

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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteProofreadingService = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `proofreading-service/${courseId}/`,
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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  FamousSayings  *** //
export const publicGetFamousSayings = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`famous-saying/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetFamousSayingsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`famous-saying/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchFamousSayings = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `famous-sayings/search/${searchString}/`,

            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateFamousSaying = async (createData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `famous-saying/list/`,

            createData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الدورة",
            },
        };
    }
};

export const publicGetFamousSayingById = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`famous-saying/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const publicUpdateFamousSaying = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `famous-saying/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الدورة",
            },
        };
    }
};

export const publicUpdateFamousSayingStatus = async (courseId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `famous-saying/${courseId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateFamousSayingVisibility = async (
    courseId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `famous-saying/${courseId}/`,

            {
                is_visible,
            },

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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteFamousSaying = async (courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`famous-saying/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Question Banks  *** //
export const publicGetQuestionBanks = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`question-bank/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب بنوك الاختبارات",
            },
        };
    }
};

export const publicGetQuestionBanksAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`question-bank/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب بنوك الاختبارات",
            },
        };
    }
};

export const publicSearchQuestionBanks = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateQuestionBank = async (banktData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `question-bank/list/`,

            banktData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء بنك الاختبار",
            },
        };
    }
};

export const publicGetQuestionBankById = async (bankId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`question-bank/${bankId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب بنك الاختبار",
            },
        };
    }
};

export const publicUpdateQuestionBank = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `question-bank/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث بنك الاختبار",
            },
        };
    }
};

export const publicUpdateQuestionBankStatus = async (bankId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `question-bank/${bankId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateQuestionBankVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `question-bank/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteQuestionBank = async (bankId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`question-bank/${bankId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ****  Question In Banks *** //
export const publicGetQuestionInBankQuestionBanks = async (
    bankId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`question-bank/${bankId}/questions/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
                "Content-Type": "multipart/form-data",
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

export const publicSearchQuestionInBank = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/questions/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicSearchBanksQuestionInBank = async (
    bankId,
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/${bankId}/questions/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateQuestionInBank = async (banktData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `question-bank/questions/list/`,

            banktData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء بنك الاختبار",
            },
        };
    }
};

export const publicGetQuestionInBankById = async (questionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/questions/${questionId}/`,
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
                message: "حدث خطأ أثناء جلب بنك الاختبار",
            },
        };
    }
};

export const publicUpdateQuestionInBank = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `question-bank/questions/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث بنك الاختبار",
            },
        };
    }
};

export const publicUpdateQuestionInBankStatus = async (questionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `question-bank/questions/${questionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateQuestionInBankVisibility = async (
    questionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `question-bank/questions/${questionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteQuestionInBank = async (questionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `question-bank/questions/${questionId}/`,
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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Choices  *** //
export const publicGetChoicesQuestionInBank = async (
    questionId,
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `question-bank/questions/${questionId}/choices/`,
            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الاختيارات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Question Bank Result Bank  *** //
export const publicGetStudentQuestionBankResultBank = async (
    bankId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(`question-bank/${bankId}/results/`);

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
// ***  Students  *** //
export const publicGetStudentsListAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/student/students-list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الطلاب",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Reviews  *** //
export const getReviewsList = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`review-user/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الرسائل",
            },
        };
    }
};

export const searchReviews = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `review-user/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const updateReviewStatus = async (messageId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `review-user/${messageId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const deleteReview = async (messageId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`review-user/${messageId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Functions to handle Contact Messages
export const getContactMessages = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`contactus-user/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الرسائل",
            },
        };
    }
};

export const searchContactMessages = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `contactus-user/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const updateMessageStatus = async (messageId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `contactus-user/${messageId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const deleteContactMessage = async (messageId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`contactus-user/${messageId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Interview Date  *** //
export const publicGetInterviewDates = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`interview-date/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetInterviewDatesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`interview-date/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchInterviewDates = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `interview-date/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateInterviewDate = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `interview-date/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetInterviewDateById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`interview-date/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateInterviewDate = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `interview-date/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateInterviewDateStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `interview-date/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateInterviewDateVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `interview-date/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteInterviewDate = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`interview-date/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Quran Path  *** //
export const publicGetQuranPaths = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-path/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetQuranPathsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-path/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchQuranPaths = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-path/search/${searchString}/`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateQuranPath = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `quran-path/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetQuranPathById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-path/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateQuranPath = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-path/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateQuranPathStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-path/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateQuranPathVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-path/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteQuranPath = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`quran-path/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Class Room  *** //
export const publicGetClassRooms = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`class-room/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetClassRoomsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`class-room/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchClassRooms = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`class-room/search/${searchString}/`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateClassRoom = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `class-room/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetClassRoomById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`class-room/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateClassRoom = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `class-room/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateClassRoomStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `class-room/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateClassRoomVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `class-room/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteClassRoom = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`class-room/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Review Level  *** //
export const publicGetReviewLevels = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`review-level/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetReviewLevelsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`review-level/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchReviewLevels = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `review-level/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateReviewLevel = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `review-level/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetReviewLevelById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`review-level/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateReviewLevel = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `review-level/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateReviewLevelStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `review-level/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateReviewLevelVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `review-level/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteReviewLevel = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`review-level/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Chapter In Quran  *** //
export const publicGetChapterInQurans = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`chapter-in-quran/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetChapterInQuransAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`chapter-in-quran/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchChapterInQurans = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `chapter-in-quran/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateChapterInQuran = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `chapter-in-quran/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetChapterInQuranById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`chapter-in-quran/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateChapterInQuran = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `chapter-in-quran/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateChapterInQuranStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `chapter-in-quran/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateChapterInQuranVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `chapter-in-quran/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteChapterInQuran = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`chapter-in-quran/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Quran Circle  *** //
export const publicGetQuranCircles = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-circle/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetQuranCirclesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-circle/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchQuranCircles = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `quran-circle/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateQuranCircle = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `quran-circle/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetQuranCircleById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-circle/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateQuranCircle = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-circle/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateQuranCircleStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-circle/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateQuranCircleVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-circle/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteQuranCircle = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`quran-circle/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Degree Quran Circle  *** //
export const publicGetDegreeQuranCircles = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-quran-circle/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetDegreeQuranCirclesAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-quran-circle/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchDegreeQuranCircles = async (
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `degree-quran-circle/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateDegreeQuranCircle = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `degree-quran-circle/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetDegreeQuranCircleById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-quran-circle/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateDegreeQuranCircle = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-quran-circle/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateDegreeQuranCircleStatus = async (
    sectionId,
    status
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-quran-circle/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateDegreeQuranCircleVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-quran-circle/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteDegreeQuranCircle = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `degree-quran-circle/${sectionId}/`,
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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Live Quran Circle  *** //
export const publicGetLiveQuranCircles = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`live-quran-circle/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetLiveQuranCirclesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`live-quran-circle/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchLiveQuranCircles = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `live-quran-circle/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateLiveQuranCircle = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `live-quran-circle/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetLiveQuranCircleById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`live-quran-circle/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateLiveQuranCircle = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `live-quran-circle/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateLiveQuranCircleStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `live-quran-circle/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateLiveQuranCircleVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `live-quran-circle/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteLiveQuranCircle = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`live-quran-circle/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Quran Exam  *** //
export const publicGetQuranExams = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-exam/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetQuranExamsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-exam/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchQuranExams = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-exam/search/${searchString}/`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateQuranExam = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `quran-exam/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetQuranExamById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`quran-exam/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateQuranExam = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-exam/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateQuranExamStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-exam/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateQuranExamVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `quran-exam/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteQuranExam = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`quran-exam/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Degree Quran Exam  *** //
export const publicGetDegreeQuranExams = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-quran-exam/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetDegreeQuranExamsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-quran-exam/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchDegreeQuranExams = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `degree-quran-exam/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateDegreeQuranExam = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `degree-quran-exam/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetDegreeQuranExamById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-quran-exam/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateDegreeQuranExam = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-quran-exam/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateDegreeQuranExamStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-quran-exam/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateDegreeQuranExamVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-quran-exam/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteDegreeQuranExam = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`degree-quran-exam/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Presence And Absence  *** //
export const publicGetPresenceAndAbsences = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`presence-and-absence/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetPresenceAndAbsencesAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`presence-and-absence/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchPresenceAndAbsences = async (
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `presence-and-absence/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreatePresenceAndAbsence = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `presence-and-absence/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetPresenceAndAbsenceById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`presence-and-absence/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdatePresenceAndAbsence = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `presence-and-absence/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdatePresenceAndAbsenceStatus = async (
    sectionId,
    status
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `presence-and-absence/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdatePresenceAndAbsenceVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `presence-and-absence/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeletePresenceAndAbsence = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `presence-and-absence/${sectionId}/`,
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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Degree Presence And Absence  *** //
export const publicGetDegreePresenceAndAbsences = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`degree-presence-and-absence/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetDegreePresenceAndAbsencesAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `degree-presence-and-absence/list-admin/`,
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
                message: "حدث خطأ أثناء جلب المسارات",
            },
        };
    }
};

export const publicSearchDegreePresenceAndAbsences = async (
    searchString,
    page = 1
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `degree-presence-and-absence/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateDegreePresenceAndAbsence = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `degree-presence-and-absence/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetDegreePresenceAndAbsenceById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `degree-presence-and-absence/${sectionId}/`,
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
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateDegreePresenceAndAbsence = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-presence-and-absence/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateDegreePresenceAndAbsenceStatus = async (
    sectionId,
    status
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-presence-and-absence/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateDegreePresenceAndAbsenceVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `degree-presence-and-absence/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteDegreePresenceAndAbsence = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `degree-presence-and-absence/${sectionId}/`,
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
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  File And Library  *** //
export const publicGetFileAndLibrarys = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`file-and-library/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetFileAndLibrarysAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`file-and-library/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchFileAndLibrarys = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `file-and-library/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateFileAndLibrary = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `file-and-library/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetFileAndLibraryById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`file-and-library/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateFileAndLibrary = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `file-and-library/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateFileAndLibraryStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `file-and-library/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateFileAndLibraryVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `file-and-library/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteFileAndLibrary = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`file-and-library/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Teacher Note  *** //
export const publicGetTeacherNotes = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`teacher-note/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetTeacherNotesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`teacher-note/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchTeacherNotes = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `teacher-note/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateTeacherNote = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `teacher-note/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetTeacherNoteById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`teacher-note/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateTeacherNote = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `teacher-note/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateTeacherNoteStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `teacher-note/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateTeacherNoteVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `teacher-note/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteTeacherNote = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`teacher-note/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Certificate Quran  *** //
export const publicGetCertificateQurans = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`certificate-quran/list/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicGetCertificateQuransAdmin = async (
    page = 1,
    status = ""
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`certificate-quran/list-admin/`, {
            params: {
                page,
                status,
            },
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
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

export const publicSearchCertificateQurans = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `certificate-quran/search/${searchString}/`,
            {
                params: {
                    page,
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
            error: error.response?.data || { message: "حدث خطأ أثناء البحث" },
        };
    }
};

export const publicCreateCertificateQuran = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `certificate-quran/list/`,

            categorytData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء أنشاء الاقسام",
            },
        };
    }
};

export const publicGetCertificateQuranById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`certificate-quran/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسار",
            },
        };
    }
};

export const publicUpdateCertificateQuran = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `certificate-quran/${id}/`,

            updateData,

            {
                headers: {
                    Authorization: `Bearer ${dataaccess?.access}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث المسار",
            },
        };
    }
};

export const publicUpdateCertificateQuranStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `certificate-quran/${sectionId}/`,
            {
                status,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicUpdateCertificateQuranVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `certificate-quran/${sectionId}/`,
            {
                is_visible,
            },
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
                message: "حدث خطأ أثناء تحديث الحالة",
            },
        };
    }
};

export const publicDeleteCertificateQuran = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`certificate-quran/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || { message: "حدث خطأ أثناء الحذف" },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Enrollment Stuent Quran Path  *** //
export const publicGetEnrollmentStuentQuranPathById = async (quranpathId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `enrollment-stuent-quran-path-list/${quranpathId}/`,

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
                message: "حدث خطأ أثناء جلب البيانات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Enrollment Stuent Chapter In Quran  *** //
export const publicGetChapterInQuranFetchEnrollStatus = async (studentId, chapterinquranId) => {
    try {
        const { data } = await axios.get(
            `fetch-enrollment-chapter-in-quran-status/${studentId}/${chapterinquranId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب حالة الاشتراك في الفصل",
            },
        };
    }
};

export const publicGetEnrollmentStuentChapterInQuranById = async (
    sectionId
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `enrollment-stuent-chapter-in-quran-list/${sectionId}/`,

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
                message: "حدث خطأ أثناء جلب البيانات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***   Student Quran School Enrollment *** //
export const publicUpdateStudentQuranSchoolEnrollment = async (
    enrollmentId,
    chapterinquranId
    // contactData
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `student-quran-school-enrollment/${enrollmentId}/`,

            {
                chapter_in_quran: chapterinquranId,
            },
            // contactData,
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
// ***  Refresh Token  *** //
export const getRefreshToken = async () => {
    try {
        // Retrieving refresh token from cookies and making a POST request to refresh the access token
        const refresh_token = Cookies.get("refresh_token");
        const access_token = Cookies.get("access_token");
        const userData = Cookies.get("userData");
        const userProfile = Cookies.get("userProfile");

        if (
            !refresh_token ||
            refresh_token === "undefined" ||
            refresh_token === null ||
            !access_token ||
            access_token === undefined ||
            access_token === null ||
            !userData ||
            !userProfile
        ) {
            userRemoveData();
        }

        if (access_token === undefined) {
            userRemoveData();
        }

        const { data, error } = await axios.post("auth/token/refresh/", {
            refresh: refresh_token,
        });

        // console.log(`00-2-4-`, data, error);

        // Returning the refreshed access token
        return { data, error: null }; // Return the access token
    } catch (error) {
        console.error("Error refreshing access token:", error);
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Set Data *** //
export const setDataAuthUser = (data) => {
    if (data) {
        // Setting access and refresh tokens in cookies with expiration dates
        Cookies.set("userData", data, {
            expires: 7, // Refresh token expires in 7 days
            secure: true,
        });
    }
};

export const setProfileAuthUser = (userDataProfile) => {
    if (userDataProfile) {
        Cookies.set("userProfile", userDataProfile, {
            expires: 7, // Refresh token expires in 7 days
            secure: true,
        });
    }
};

export const setAccessTokenAuthUser = (access_token) => {
    if (access_token) {
        Cookies.set("access_token", access_token, {
            expires: 1, // Access token expires in 1 day
            secure: true,
        });
    }
    // Decoding access token to get user information
    const user = jwtDecode(access_token) ?? null;
};

export const setRefreshTokenAuthUser = (refresh_token) => {
    if (refresh_token) {
        Cookies.set("refresh_token", refresh_token, {
            expires: 7, // Refresh token expires in 7 days
            secure: true,
        });
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
//

// *****************************************************************************************************************************
// =============================================================================================================================
//

// *****************************************************************************************************************************
// =============================================================================================================================
