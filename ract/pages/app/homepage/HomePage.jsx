/* eslint-disable no-unused-vars */
// import { Helmet } from "react-helmet-async";

// component
import LandingHome from "./landing/LandingHome";
import CategoryHome from "./category/CategoryHome";
// import CategoryCourses from "./categorycourses/CategoryCourses";
import AboutHome from "./about/AboutHome";
// import CourseHome from "./course/CourseHome";
// import QuestionsBanksHome from "./questionsbanks/QuestionsBanksHome";
import VideoHome from "./video/VideoHome";
import StatsHome from "./stats/StatsHome";
// import BlogHome from "./blog/BlogHome";
import Testimonials from "../testimonialpage/Testimonials";
// import VisionMission from "./visionmission/VisionMission";
import SectionsCourses from "./sectionscourses/SectionsCourses";
import FamousSayingsCard from "../famoussayings/FamousSayingsCard";
// import FamousSayingsBanner from "../famoussayings/FamousSayingsBanner";
import SectionsBlogs from "./sectionsblogs/SectionsBlogs";
import CoursesResultHome from "./coursesresult/CoursesResultHome";
import PackagesCoursesHome from "./packagescourses/PackagesCoursesHome";
import AuthGoogle from "../authgoogle/AuthGoogle";

function HomePage() {
    return (
        <>
            {/* <Helmet>
                <title> About Page</title>
                <meta name="description" content="" />
            </Helmet> */}

            <AuthGoogle />

            <main>
                <article>
                    <LandingHome />
                    {/* <CategoryCourses /> */}
                    <CategoryHome />
                    <FamousSayingsCard />
                    {/* <FamousSayingsBanner /> */}
                    <AboutHome />
                    <CoursesResultHome />
                    <PackagesCoursesHome />
                    <SectionsCourses />
                    {/* <CourseHome /> */}
                    {/* <QuestionsBanksHome /> */}
                    <VideoHome />
                    <StatsHome />
                    {/* <BlogHome /> */}
                    <SectionsBlogs />
                    <Testimonials />
                    {/* <VisionMission /> */}
                </article>
            </main>
        </>
    );
}

export default HomePage;
