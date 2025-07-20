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
// ***  Admin Dashboard Stats  *** //
export const getAdminDashboardStats = async (userId) => {
    try {
        const { data } = await axios.get(
            `admin-dashboard-stats/?user_id=${userId}/`
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
// ***  Categories  *** //
export const adminGetCategories = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-section/list/`, {
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
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const adminGetCategoriesAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-section/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب التصنيفات",
            },
        };
    }
};

export const adminSearchCategories = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `category-section/search/${searchString}/`,
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

export const adminCreateCategory = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `category-section/list/`,

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
                message: "حدث خطأ أثناء أنشاء التصنيفات",
            },
        };
    }
};

export const adminGetCategoryById = async (categoryId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-section/${categoryId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

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

export const adminUpdateCategory = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-section/${id}/`,

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
                message: "حدث خطأ أثناء تحديث التصنيفات",
            },
        };
    }
};

export const adminUpdateCategoryStatus = async (categoryId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-section/${categoryId}/`,
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

export const adminUpdateCategoryVisibility = async (categoryId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-section/${categoryId}/`,
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

export const adminDeleteCategory = async (messageId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`category-section/${messageId}/`, {
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
// ***  Sections Courses  *** //
export const adminGetSections = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`section-course/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const adminGetSectionsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`section-course/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const adminSearchSections = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `section-course/search/${searchString}/`,
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

export const adminCreateSection = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `section-course/list/`,

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

export const adminGetSectionById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`section-course/${sectionId}/`, {
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

export const adminUpdateSection = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `section-course/${id}/`,

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

export const adminUpdateSectionStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `section-course/${sectionId}/`,
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

export const adminUpdateSectionVisibility = async (sectionId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `section-course/${sectionId}/`,
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

export const adminDeleteSection = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`section-course/${sectionId}/`, {
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
// ***  Courses  *** //
export const adminGetCoursesAdmin = async (page = 1, status = "") => {
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

// *****************************************************************************************************************************
// =============================================================================================================================
// ***  Coupons  *** //
export const adminGetCoupons = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`coupon-course/list/`, {
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
                message: "حدث خطأ أثناء جلب الكوبونات",
            },
        };
    }
};

export const adminSearchCoupons = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `coupon-course/search/${searchString}/`,
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

export const adminCreateCoupon = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `coupon-course/list/`,

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
                message: "حدث خطأ أثناء أنشاء الكوبون",
            },
        };
    }
};

export const adminGetCouponById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`coupon-course/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الكوبون",
            },
        };
    }
};

export const adminUpdateCoupon = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `coupon-course/${id}/`,

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
                message: "حدث خطأ أثناء تحديث الكوبون",
            },
        };
    }
};

export const adminUpdateCouponStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `coupon-course/${sectionId}/`,
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

export const adminUpdateCouponVisibility = async (sectionId, is_visible) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `coupon-course/${sectionId}/`,
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

export const adminDeleteCoupon = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`coupon-course/${sectionId}/`, {
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
// ***  Sections Books  *** //
export const adminGetSectionsBooks = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-book/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const adminGetSectionsBooksAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-book/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const adminSearchSectionsBooks = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `category-book/search/${searchString}/`,
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

export const adminCreateSectionBook = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `category-book/list/`,

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

export const adminGetSectionBookById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-book/${sectionId}/`, {
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

export const adminUpdateSectionBook = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-book/${id}/`,

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

export const adminUpdateSectionBookStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-book/${sectionId}/`,
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

export const adminUpdateSectionBookVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-book/${sectionId}/`,
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

export const adminDeleteSectionBook = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`category-book/${sectionId}/`, {
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
// ***  Sections Blogs  *** //
export const adminGetSectionsBlogs = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-blog/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const adminGetSectionsBlogsAdmin = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-blog/list-admin/`, {
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
                message: "حدث خطأ أثناء جلب الاقسام",
            },
        };
    }
};

export const adminSearchSectionsBlogs = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `category-blogs/search/${searchString}/`,
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

export const adminCreateSectionBlog = async (categorytData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.post(
            `category-blog/list/`,

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

export const adminGetSectionBlogById = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`category-blog/${sectionId}/`, {
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

export const adminUpdateSectionBlog = async (id, updateData) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-blog/${id}/`,

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

export const adminUpdateSectionBlogStatus = async (sectionId, status) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-blog/${sectionId}/`,
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

export const adminUpdateSectionBlogVisibility = async (
    sectionId,
    is_visible
) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `category-blog/${sectionId}/`,
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

export const adminDeleteSectionBlog = async (sectionId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`category-blog/${sectionId}/`, {
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
// Function to handle user Profile Update
export const adminProfileUpdate = async (
    userId,
    profileDate
    // image,
    // bio,
    // phone_number,
    // gender,
    // age
) => {
    try {
        // Making a POST request to register a new user
        const { data, status } = await axios.patch(
            `auth/admin/profile/${userId}/`,

            profileDate,

            // {
            //     gender,
            //     image,
            //     bio,
            //     phone_number,
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
// ***  Admins  *** //
export const getAdminsList = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/admin/profile-list/`, {
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
                message: "حدث خطأ أثناء جلب المسؤلين",
            },
        };
    }
};

export const getAdminDetails = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/admin/profile/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المسؤل",
            },
        };
    }
};

export const searchAdmins = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `auth/admins/search/${searchString}/`,
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

export const updateAdminStatus = async (adminId, status) => {
    try {
        // console.log(`--<>adminId<>`, adminId);
        // console.log(`--<>status<>`, status);
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `auth/admin/pk/${adminId}/`,
            status, // هنا يتم تمرير الكائن الذي يحتوي على is_active
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
                message: "حدث خطأ أثناء تحديث المسؤل",
            },
        };
    }
};

export const deleteAdmin = async (adminId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`auth/admin/pk/${adminId}/`, {
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

export const adminRegisterVerify = async (
    first_name,
    last_name,
    email,
    password,
    password2
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/admin/register-verify/", {
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
// ***  Teachers  *** //
export const getTeachersList = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/teacher/profile-list/`, {
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
                message: "حدث خطأ أثناء جلب الدرسين",
            },
        };
    }
};

export const getTeacherDetails = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/teacher/profile/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المدرس",
            },
        };
    }
};

export const searchTeachers = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `auth/teachers/search/${searchString}/`,
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

export const updateTeacherStatus = async (adminId, status) => {
    try {
        // console.log(`--<>adminId<>`, adminId);
        // console.log(`--<>status<>`, status);
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `auth/teacher/pk/${adminId}/`,
            status, // هنا يتم تمرير الكائن الذي يحتوي على is_active
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

export const deleteTeacher = async (adminId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`auth/teacher/pk/${adminId}/`, {
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

export const teacherRegisterVerify = async (
    first_name,
    last_name,
    email,
    password,
    password2
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/teacher/register-verify/", {
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
// ***  Staffs  *** //
export const getStaffsList = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/staff/profile-list/`, {
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
                message: "حدث خطأ أثناء جلب المساعدين",
            },
        };
    }
};

export const getStaffDetails = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/staff/profile/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب المساعد",
            },
        };
    }
};

export const searchStaffs = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `auth/staffs/search/${searchString}/`,
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

export const updateStaffStatus = async (adminId, status) => {
    try {
        // console.log(`--<>adminId<>`, adminId);
        // console.log(`--<>status<>`, status);
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `auth/staff/pk/${adminId}/`,
            status, // هنا يتم تمرير الكائن الذي يحتوي على is_active
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
                message: "حدث خطأ أثناء تحديث المساعد",
            },
        };
    }
};

export const deleteStaff = async (adminId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`auth/staff/pk/${adminId}/`, {
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

export const staffRegisterVerify = async (
    first_name,
    last_name,
    email,
    password,
    password2
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/staff/register-verify/", {
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
// ***  Students  *** //
export const getStudentsList = async (page = 1, status = "") => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/student/profile-list/`, {
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

export const getStudentDetails = async (id) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(`auth/student/profile/${id}/`, {
            headers: {
                Authorization: `Bearer ${dataaccess?.access}`,
            },
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data || {
                message: "حدث خطأ أثناء جلب الطالب",
            },
        };
    }
};

export const searchStudents = async (searchString, page = 1) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.get(
            `auth/students/search/${searchString}/`,
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

export const updateStudentStatus = async (adminId, status) => {
    try {
        // console.log(`--<>adminId<>`, adminId);
        // console.log(`--<>status<>`, status);
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.patch(
            `auth/student/pk/${adminId}/`,
            status, // هنا يتم تمرير الكائن الذي يحتوي على is_active
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
                message: "حدث خطأ أثناء تحديث الطالب",
            },
        };
    }
};

export const deleteStudent = async (adminId) => {
    try {
        let { data: dataaccess } = await getRefreshToken();

        const { data } = await axios.delete(`auth/student/pk/${adminId}/`, {
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

export const studentRegisterVerify = async (
    first_name,
    last_name,
    email,
    password,
    password2
) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("auth/student/register-verify/", {
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
//

// *****************************************************************************************************************************
// =============================================================================================================================

// *****************************************************************************************************************************
// =============================================================================================================================
