/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// utils
import { App_Admin } from "../../../../utils/constants";

// components
import AdminUpdateData from "./data/AdminUpdateData";
import AdminUpdatePassword from "./password/AdminUpdatePassword";

function AdminAccountPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="">
                <div className="flex items-center justify-start mb-6">
                    <button
                        onClick={() => {
                            navigate(`/${App_Admin}/home`);
                            // moveBack();
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition-all duration-500 text-black"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <h1 className="text-3xl font-bold mr-2 text-black">
                        الحساب
                    </h1>
                </div>

                <AdminUpdateData />

                <AdminUpdatePassword />
            </div>

            {/* <Row>
                <MainTitle data-aos="fade-down">{`الحساب`}</MainTitle>
            </Row>

            <Row>
                <ContentTitle data-aos="fade-left">{`تحديث المستخدم`}</ContentTitle>

                <Row type="horizontal" className="disabled">
                    <UpdateUserDataForm />
                </Row>
            </Row>

            <Row>
                <ContentTitle data-aos="fade-left">{`تحديث الملف الشخصي`}</ContentTitle>

                <Row type="horizontal">
                    <UpdateUserProfileForm />
                </Row>
            </Row>

            <Row>
                <ContentTitle data-aos="fade-left">{`تحديث كلمة المرور`}</ContentTitle>

                <Row type="horizontal">
                    <UpdatePasswordForm />
                </Row>
            </Row> */}
        </>
    );
}

export default AdminAccountPage;
