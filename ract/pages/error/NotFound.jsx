/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// style
// import "./NotFound.scss";

// ui
import ContentTitle from "../../ui/title/ContentTitle";
import BtnRow from "../../ui/button/BtnRow";
import BtnLinkFull from "../../ui/button/BtnLinkFull";
import BtnBack from "../../ui/button/BtnBack";

// assets
import imagenotfound from "../../assets/images/error/error.png";

const StyledBtns = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

function NotFound() {
    const navigate = useNavigate();

    return (
        <>
            <div className="notfound py-40">
                <div className="container" data-aos="fade-up">
                    <section className="flex items-center justify-around flex-col md:flex-row gap-8 ">
                        <div className="flex-1 flex flex-col items-center justify-center py-20">
                            <ContentTitle
                                data-aos="fade-left"
                                className="h2 section-title "
                            >{`الصفحة غير متوفرة حاليا.`}</ContentTitle>

                            {/* <StyledBtns>
                                <BackButton />

                                <Button
                                    onClick={() => {
                                        navigate("/home");
                                    }}
                                >
                                    Back Home
                                </Button>
                            </StyledBtns> */}
                            <BtnRow>
                                <Link
                                    className="btn has-before"
                                    to={`/`}
                                    onClick={() => {
                                        navigate(`/`);
                                    }}
                                >
                                    {`الرئيسية`}
                                </Link>

                                <BtnBack />
                            </BtnRow>
                        </div>

                        <div className="flex-1 flex items-center justify-center max-h-1/2">
                            <img
                                src={`${imagenotfound}`}
                                alt={`page not found`}
                                data-aos="fade-right"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = imagenotfound;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className="max-h-1/2"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default NotFound;
