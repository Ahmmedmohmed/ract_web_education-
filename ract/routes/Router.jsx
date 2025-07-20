/* eslint-disable no-unused-vars */
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// =================================================================
// utils
import {
    App_Admin,
    App_Teacher,
    App_Staff,
    App_User,
} from "../utils/constants";

// =================================================================
// Hooks
import ScrollToTop from "../hooks/ScrollToTop";

// =================================================================
// Protected
import ProtectedRouteAdmin from "../components/protected/ProtectedRouteAdmin";
import ProtectedRouteUser from "../components/protected/ProtectedRouteUser";

// =================================================================
// layout
// const HomepageLayout = lazy(() =>
//     import("../components/layouts/Homepagelayout")
// );
import HomePageLayout from "../components/layouts/HomePageLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import UserLayout from "../components/layouts/UserLayout";

// =================================================================
// *** Routers ***
// App
import { home_route } from "./app/HomeRoute";

import { categories_page_route } from "./app/CategoriesPageRoute";

import { section_course_page_route } from "./app/SectionCoursePageRoute";

import { courses_route } from "./app/CoursesRoute";

import { packages_courses_route } from "./app/PackagesCoursesRoute";

import { sections_books_route } from "./app/SectionsBooksRoute";

import { powerpoints_route } from "./app/PowerpointsRoute";

import { store_route } from "./app/StoreRoute";

import { blogs_route } from "./app/BlogsRoute";

import { quranschool_route } from "./app/QuranSchoolRoute";

import { questions_banks_route } from "./app/QuestionsBanksRoute";

import { contact_route } from "./app/ContactRoute";
import { quick_links_route } from "./app/QuickLinksRoute";

import { select_user_login_route } from "./app/SelectUserLoginRoute";
import { signup_route } from "./app/SignupRoute";
import { verify_account_route } from "./app/VerifyAccountRoute";
import { login_route } from "./app/LoginRoute";
import { reset_password_route } from "./app/ResetPasswordRoute";
import { confirm_reset_password_route } from "./app/ConfirmResetPasswordRoute";

import { auth_google_route } from "./app/AuthGoogleRoute";

// =================================================================
// Admin
import { admin_app_route } from "./admin/AdminAppRoute";

import { admin_dashboard_route } from "./admin/AdminDashboardRoute";

import { admin_categories_route } from "./admin/AdminCategoriesRoute";

import { admin_sections_route } from "./admin/AdminSectionsRoute";

import { admin_courses_route } from "./admin/AdminCoursesRoute";
import { admin_courses_islive_route } from "./admin/AdminCoursesIsLiveRoute";

import { admin_packages_route } from "./admin/AdminPackagesRoute";

import { admin_coupons_route } from "./admin/AdminCouponsRoute";

import { admin_sections_books_route } from "./admin/AdminSectionsBooksRoute";
import { admin_books_route } from "./admin/AdminBooksRoute";

import { admin_powerpoints_route } from "./admin/AdminPowerpointsRoute";
import { admin_powerpoint_services_route } from "./admin/AdminPowerpointServicesRoute";

import { admin_proofreading_services_route } from "./admin/AdminProofreadingServicesRoute";

import { admin_sections_blogs_route } from "./admin/AdminSectionsBlogsRoute";
import { admin_blogs_route } from "./admin/AdminBlogsRoute";
import { admin_youTube_suggestions_route } from "./admin/AdminYouTubeSuggestionsRoute";

import { admin_famous_sayings_route } from "./admin/AdminFamousSayingsRoute";

import { admin_quran_paths_route } from "./admin/AdminQuranPathsRoute";

import { admin_interview_dates_route } from "./admin/AdminInterviewDatesRoute";

import { admin_questions_banks_route } from "./admin/AdminQuestionsBanksRoute";
import { admin_test_results_route } from "./admin/AdminTestResultsRoute";

import { admin_account_route } from "./admin/AdminAccountRoute";
import { admin_profile_route } from "./admin/AdminProfileRoute";

import { admin_admins_route } from "./admin/AdminAdminsRoute";
import { admin_teachers_route } from "./admin/AdminTeachersRoute";
import { admin_staffs_route } from "./admin/AdminStaffsRoute";
import { admin_students_route } from "./admin/AdminStudentsRoute";

import { admin_review_route } from "./admin/AdminReviewRoute";
import { admin_contact_route } from "./admin/AdminContactRoute";
import { admin_help_route } from "./admin/AdminHelpRoute";

// =================================================================
// User
import { user_app_route } from "./user/UserAppRoute";

import { user_dashboard_route } from "./user/UserDashboardRoute";

import { user_courses_route } from "./user/UserCoursesRoute";
import { user_favorite_courses_route } from "./user/UserFavoriteCoursesRoute";

import { user_packages_route } from "./user/UserPackagesRoute";

import { user_quran_schools_route } from "./user/UserQuranSchoolsRoute";

import { user_powerpoints_route } from "./user/UserPowerpointsRoute";
import { user_powerpoint_services_route } from "./user/UserPowerpointServicesRoute";

import { user_proofreading_services_route } from "./user/UserProofreadingServicesRoute";

import { user_test_results_route } from "./user/UserTestResultsRoute";

import { user_certificate_route } from "./user/UserCertificateRoute";

import { user_account_route } from "./user/UserAccountRoute";
import { user_profile_route } from "./user/UserProfileRoute";

import { user_review_route } from "./user/UserReviewRoute";
import { user_contact_route } from "./user/UserContactRoute";
import { user_help_route } from "./user/UserHelpRoute";

// =================================================================
// Error
import { not_found_route } from "./app/NotFoundRoute";

// =================================================================
// ui components
import Loader from "../ui/loader/Loader";

function Router() {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <BrowserRouter>
                    <ScrollToTop />

                    <Routes>
                        {/* ===================================================================================== */}
                        {/* Admin */}
                        <Route
                            path={`/${App_Admin}`}
                            element={
                                <ProtectedRouteAdmin>
                                    <AdminLayout />
                                </ProtectedRouteAdmin>
                            }
                        >
                            <Route
                                index
                                element={
                                    <Navigate
                                        replace
                                        to={`/${App_Admin}/home`}
                                    />
                                }
                            />
                            <Route
                                exact
                                path={`${App_Admin}`}
                                component={Router}
                            />
                            <Route
                                exact
                                path={`/${App_Admin}`}
                                component={Router}
                            />

                            {/* App Admin */}
                            {admin_app_route &&
                                admin_app_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Dashboard */}
                            {admin_dashboard_route &&
                                admin_dashboard_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Categories  */}
                            {admin_categories_route &&
                                admin_categories_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Sections  */}
                            {admin_sections_route &&
                                admin_sections_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Courses */}
                            {admin_courses_route &&
                                admin_courses_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Courses Is Live */}
                            {admin_courses_islive_route &&
                                admin_courses_islive_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/*  Packages Page  */}
                            {admin_packages_route &&
                                admin_packages_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Sections Books */}
                            {admin_sections_books_route &&
                                admin_sections_books_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/*  Books Page  */}
                            {admin_books_route &&
                                admin_books_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/*  Powerpoints Page */}
                            {admin_powerpoints_route &&
                                admin_powerpoints_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/*  Powerpoint Services */}
                            {admin_powerpoint_services_route &&
                                admin_powerpoint_services_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/*  Proofreading Services Page */}
                            {admin_proofreading_services_route &&
                                admin_proofreading_services_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/*  Sections Blogs Page */}
                            {admin_sections_blogs_route &&
                                admin_sections_blogs_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/*  Blogs Page */}
                            {admin_blogs_route &&
                                admin_blogs_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/*  Blogs Page */}
                            {admin_youTube_suggestions_route &&
                                admin_youTube_suggestions_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/*  FamousSayings Page */}
                            {admin_famous_sayings_route &&
                                admin_famous_sayings_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Coupons */}
                            {admin_coupons_route &&
                                admin_coupons_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Questions Banks */}
                            {admin_questions_banks_route &&
                                admin_questions_banks_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Test Results */}
                            {admin_test_results_route &&
                                admin_test_results_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Quran Paths */}
                            {admin_quran_paths_route &&
                                admin_quran_paths_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Quran Paths */}
                            {admin_interview_dates_route &&
                                admin_interview_dates_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Account */}
                            {admin_account_route &&
                                admin_account_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Profile */}
                            {admin_profile_route &&
                                admin_profile_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Admin -> Users */}
                            {/* Admins */}
                            {admin_admins_route &&
                                admin_admins_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Teachers */}
                            {admin_teachers_route &&
                                admin_teachers_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Staffs */}
                            {admin_staffs_route &&
                                admin_staffs_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Students */}
                            {admin_students_route &&
                                admin_students_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Review */}
                            {admin_review_route &&
                                admin_review_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Contact */}
                            {admin_contact_route &&
                                admin_contact_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Help */}
                            {admin_help_route &&
                                admin_help_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}
                        </Route>

                        {/* ===================================================================================== */}
                        {/* User - Student */}
                        <Route
                            path={`/${App_User}`}
                            element={
                                <ProtectedRouteUser>
                                    <UserLayout />
                                </ProtectedRouteUser>
                            }
                        >
                            <Route
                                index
                                element={
                                    <Navigate
                                        replace
                                        to={`/${App_User}/home`}
                                    />
                                }
                            />
                            <Route
                                exact
                                path={`${App_User}`}
                                component={Router}
                            />
                            <Route
                                exact
                                path={`/${App_User}`}
                                component={Router}
                            />

                            {/* App User */}
                            {user_app_route &&
                                user_app_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Dashboard */}
                            {user_dashboard_route &&
                                user_dashboard_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Courses */}
                            {user_courses_route &&
                                user_courses_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Favorite Courses */}
                            {user_favorite_courses_route &&
                                user_favorite_courses_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Packages */}
                            {user_packages_route &&
                                user_packages_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Quran Schools */}
                            {user_quran_schools_route &&
                                user_quran_schools_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Powerpoints */}
                            {user_powerpoints_route &&
                                user_powerpoints_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Powerpoint Services */}
                            {user_powerpoint_services_route &&
                                user_powerpoint_services_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Proofreading Services */}
                            {user_proofreading_services_route &&
                                user_proofreading_services_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* Test Results */}
                            {user_test_results_route &&
                                user_test_results_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Certificate */}
                            {user_certificate_route &&
                                user_certificate_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Account */}
                            {user_account_route &&
                                user_account_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Profile */}
                            {user_profile_route &&
                                user_profile_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Review */}
                            {user_review_route &&
                                user_review_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Contact */}
                            {user_contact_route &&
                                user_contact_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* Help */}
                            {user_help_route &&
                                user_help_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}
                        </Route>

                        {/* ======================================================================== */}
                        {/* web site */}
                        <Route path="/" element={<HomePageLayout />}>
                            {/* home page */}
                            {home_route &&
                                home_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Categories Page */}
                            {categories_page_route &&
                                categories_page_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Sections Course Page */}
                            {section_course_page_route &&
                                section_course_page_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}

                            {/* ======================================================================== */}
                            {/* Courses Page */}
                            {courses_route &&
                                courses_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Sections Books Page */}
                            {sections_books_route &&
                                sections_books_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Sections Powerpoints */}
                            {powerpoints_route &&
                                powerpoints_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Sections Books Page */}
                            {packages_courses_route &&
                                packages_courses_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Quran School Page */}
                            {quranschool_route &&
                                quranschool_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Store Page */}
                            {store_route &&
                                store_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Questions Banks Page */}
                            {questions_banks_route &&
                                questions_banks_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Blogs Page */}
                            {blogs_route &&
                                blogs_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Contact Page */}
                            {contact_route &&
                                contact_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ======================================================================== */}
                            {/* Quick Links Page */}
                            {quick_links_route &&
                                quick_links_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* Select User Login */}
                            {select_user_login_route &&
                                select_user_login_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* User Student */}
                            {/* Signup */}
                            {signup_route &&
                                signup_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* Verify Account */}
                            {verify_account_route &&
                                verify_account_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* Login */}
                            {login_route &&
                                login_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* Login */}
                            {auth_google_route &&
                                auth_google_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* Reset Password */}
                            {reset_password_route &&
                                reset_password_route?.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route?.path}
                                        element={route?.element}
                                    />
                                ))}

                            {/* ===================================================================================== */}
                            {/* confirm reset password */}
                            {confirm_reset_password_route &&
                                confirm_reset_password_route?.map(
                                    (route, index) => (
                                        <Route
                                            key={index}
                                            path={route?.path}
                                            element={route?.element}
                                        />
                                    )
                                )}
                        </Route>

                        {/* ======================================================================== */}
                        {/* NotFound or 404 Error pages */}
                        {not_found_route &&
                            not_found_route?.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route?.path}
                                    element={route?.element}
                                />
                            ))}
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    );
}

export default Router;
