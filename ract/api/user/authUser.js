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
// Function to handle user registration
export const userRegister = async (
    first_name,
    last_name,
    email,
    password,
    password2
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/student/register/", {
            first_name,
            last_name,
            email,
            password,
            password2,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Sign Up Successfully.",
        });

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
// Function to handle user profile id
export const userProfileID = async (id) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.get(`auth/student/profile/${id}/`);

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Student Profile retrieved Successfully.",
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
// Function to handle user Profile Update
export const userProfileUpdate = async (
    userId,
    profileDate
    // image,
    // bio,
    // phone_number,
    // gender,
    // age
) => {
    try {
        // console.log(`-------->`, image, bio, phone_number, gender, age, userId);
        // Making a POST request to register a new user
        const { data, status } = await axios.put(
            `auth/student/profile/${userId}/`,

            profileDate,

            // {
            //     image,
            //     bio,
            //     phone_number,
            //     gender,
            //     age,
            // },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Student Profile Updated Successfully.",
        });

        if (status === 200 || data?.code === 0) {
            let userDataProfile = JSON.stringify(data);
            setProfileAuthUser(userDataProfile);
        }

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error?.response?.data,
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle verification account
export const userVerifyAccount = async (otp_code) => {
    try {
        // Making a POST request to verify account
        const { data } = await axios.post("auth/student/verify-account/", {
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
export const userResendOTP = async (email) => {
    try {
        // Making a POST request to resend OTP
        const { data } = await axios.post("auth/student/resend-otp/", {
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
// Function to handle user login
export const userLogin = async (email, password) => {
    try {
        // Making a POST request to login a new user
        const { data, status } = await axios.post("auth/student/login/", {
            email,
            password,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Login Successfully.",
        });

        if (status === 200 || data?.code === 0) {
            let userData = JSON.stringify(data?.data);

            let userProfile = await userProfileID(data?.data?.id);
            let userDataProfile = JSON.stringify(userProfile?.data?.data);

            setAuthUser(
                userData,
                userDataProfile,
                data?.access_token,
                data?.refresh_token
            );
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
// Function to set the authenticated user and update user state
export const setAuthUser = (
    data,
    userDataProfile,
    access_token,
    refresh_token
) => {
    // console.log(`data`, data);
    // console.log(`userDataProfile`, userDataProfile);
    // console.log(`access_token`, access_token);
    // console.log(`refresh_token`, refresh_token);
    if (data) {
        // Setting access and refresh tokens in cookies with expiration dates
        Cookies.set("userData", data, {
            expires: 7, // Refresh token expires in 7 days
            secure: true,
        });
    }

    if (userDataProfile) {
        Cookies.set("userProfile", userDataProfile, {
            expires: 7, // Refresh token expires in 7 days
            secure: true,
        });
    }

    if (access_token) {
        Cookies.set("access_token", access_token, {
            expires: 1, // Access token expires in 1 day
            secure: true,
        });
    }

    if (refresh_token) {
        Cookies.set("refresh_token", refresh_token, {
            expires: 7, // Refresh token expires in 7 days
            secure: true,
        });
    }

    // Decoding access token to get user information
    const user = jwtDecode(access_token) ?? null;
    // const user = jwt_decode(access_token) ?? null;
    // console.log(`--`, user);
    // console.log(`user`, user); // user_id: 9
    // let user;
    // if (access_token) {
    //     user = jwt_decode(access_token);
    //     console.log(`user`, user);
    // } else {
    //     console.error("Access token is missing");
    // }

    // If user information is present, update user state; otherwise, set loading state to false
    // if (user) {
    //     userAuthStore.getState().setUser(user);
    // }
    // userAuthStore.getState().setLoading(false);
};

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to handle user change password
export const userChangePassword = async (
    refresh_token,
    old_password,
    new_password,
    confirm_password
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/student/change-password/", {
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
// Function to handle user logout
export const userRemoveData = () => {
    // Removing access and refresh tokens from cookies, resetting user state, and displaying success toast
    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("userData");
    Cookies.remove("userProfile");
    Cookies.remove("userEmail");
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Logout  *** //
export const userLogout = async (refresh_token) => {
    try {
        // Making a POST request to logout
        const { data } = await axios.post("auth/student/logout/", {
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
export const userResetPassword = async (email) => {
    try {
        // Making a POST request to Reset password
        const { data } = await axios.post("auth/student/reset-password/", {
            email,
        });

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Reset Password Successfully",
        });

        if (data) {
            let userData = localStorage.setItem(
                "userData",
                JSON.stringify(data?.data)
            );
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
export const userConfirmResetPassword = async (otp, password, password2) => {
    try {
        // Making a POST request to Confirm Reset Password
        const { data } = await axios.post(
            "auth/student/confirm-reset-password/",
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
// Function to refresh the access token using the refresh token
// export const getRefreshToken = async () => {
//     // Retrieving refresh token from cookies and making a POST request to refresh the access token
//     const refresh_token = Cookies.get("refresh_token");

//     if (refresh_token === "undefined") {
//         userRemoveData();
//     }

//     const response = await axios.post("auth/token/refresh/", {
//         refresh: refresh_token,
//     });

//     // Returning the refreshed access token
//     return response?.data; // Return the access token
// };

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to set the authenticated user on page load
// export const setUser = async () => {
//     // Retrieving access and refresh tokens from cookies
//     const accessToken = Cookies.get("access_token");
//     const refreshToken = Cookies.get("refresh_token");

//     // Checking if tokens are present
//     if (!accessToken || !refreshToken) {
//         return;
//     }

//     // If access token is expired, refresh it; otherwise, set the authenticated user
//     if (isAccessTokenExpired(accessToken)) {
//         const response = await getRefreshToken(refreshToken);
//         setAuthUser(response.access, response.refresh);
//     } else {
//         setAuthUser(accessToken, refreshToken);
//     }
// };

// *****************************************************************************************************************************
// =============================================================================================================================
// Function to check if the access token is expired
export const isAccessTokenExpired = (accessToken) => {
    try {
        // Decoding the access token and checking if it has expired
        // const decodedToken = jwt_decode(accessToken);
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
        // console.log(error);
        // Returning true if the token is invalid or expired
        return true;
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Dashboard Stats  *** //
export const getStudentDashboardStats = async (userId) => {
    try {
        const { data } = await axios.get(
            `student-dashboard-stats/?user_id=${userId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الإحصائيات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Enrolled Courses  *** //
export const userGetStudentEnrolledCourses = async (
    studentId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `fetch-enrolled-courses/${studentId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الكورسات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student Favorite Course  *** //
export const userGetStudentFavoriteCourses = async (studentId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `fetch-favorite-courses-student/${studentId}/`,

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
                message: "حدث خطأ أثناء جلب الدورات المفضلة",
            },
        };
    }
};

export const userDeleteStudentFavoriteCourse = async (studentId, courseId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(
            `student-remove-favorite-course/${studentId}/${courseId}/`,

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
// ***  Student Enrolled Quran School  *** //
export const userGetStudentEnrolledQuranSchools = async (
    studentId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `enrollment-quran-school-stuent-pk-list/${studentId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الكورسات",
            },
        };
    }
};

// export const userGetQuranSchoolFetchEnrolledStatus = async (studentId, courseId) => {
//     try {
//         const { data } = await axios.get(
//             `fetch-enroll-status/${studentId}/${courseId}/`
//         );

//         return { data, error: null };
//     } catch (error) {
//         return {
//             data: null,
//             error: error.response?.data || {
//                 message: "حدث خطأ أثناء جلب حالة الاشتراك في الدورة",
//             },
//         };
//     }
// };

export const userGetStudentEnrolledQuranSchoolById = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `student-quran-school-enrollment/${id}/`,
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
// ***  Powerpoints  *** //
export const userGetStudentEnrolledPowerpoints = async (
    studentId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(
            `fetch-enrolled-powerpoints/${studentId}/`
        );

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الكورسات",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Courses Lessons Student Answer  *** //
export const userCreateLessonsStudentAnswer = async (answerData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `courses/sections/lessons/student-answer/list/`,

            answerData,

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
                message: "حدث خطأ أثناء أنشاء الرسالة",
            },
        };
    }
};

export const userFetchStudentAnswerInLessonStatus = async (
    studentId,
    lessonId
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
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

// export const userGetStudentAnswerInLesson = async (studentId, lessonId) => {
//     try {
//         let { data: dataaccess } = await getRefreshToken();

//         const { data } = await axios.get(
//             `fetch-student-answer-in-lesson/${studentId}/${lessonId}/`,

//             {
//                 headers: {
//                     Authorization: `Bearer ${dataaccess?.access}`,
//                 },
//             }
//         );

//         return { data, error: null };
//     } catch (error) {
//         return {
//             data: null,
//             error: error.response?.data || {
//                 message: "حدث خطأ أثناء جلب البيانات",
//             },
//         };
//     }
// };

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Student QuestionBank Result User  *** //
export const userGetStudentQuestionBankResultUser = async (
    userId,
    page = 1,
    status = ""
) => {
    try {
        const { data } = await axios.get(`question-bank/results/${userId}/`);

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
// ***  User Review  *** //
export const userCreateUserReview = async (reviewData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `review-user/list/`,

            reviewData,
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
                message: "حدث خطأ أثناء أنشاء الرسالة",
            },
        };
    }
};

export const userGetReviewById = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`review-user/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الرسالة",
            },
        };
    }
};

export const userUpdateReview = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();
        const { data } = await axios.patch(`review-user/${id}/`, updateData, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء تحديث الرسالة",
            },
        };
    }
};

export const userDeleteReview = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(`review-user/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الرسالة",
            },
        };
    }
};

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Contact Message  *** //
export const userCreateContactMessage = async (contactData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `contactus-user/list/`,

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
                message: "حدث خطأ أثناء أنشاء الرسالة",
            },
        };
    }
};

export const userGetContactMessageById = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`contactus-user/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الرسالة",
            },
        };
    }
};

export const userUpdateContactMessage = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();
        const { data } = await axios.patch(
            `contactus-user/${id}/`,
            updateData,
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
                message: "حدث خطأ أثناء تحديث الرسالة",
            },
        };
    }
};

export const userDeleteContactMessage = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(`contactus-user/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الرسالة",
            },
        };
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
