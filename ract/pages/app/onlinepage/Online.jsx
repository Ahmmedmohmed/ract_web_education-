/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";

// style
import "./Online.scss";

// ui
import MainTitle from "../../../ui/title/MainTitle";
import ContentTitle from "../../../ui/title/ContentTitle";

// assets
import onlineimage from "../../../assets/images/online/image-2.png";

function Online() {
    const navigate = useNavigate();

    return (
        <>
            <div className="online" id="online">
                <div className="container">
                    <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/online`);
                        }}
                    >
                        {`التدريس عن بعد`}
                    </MainTitle>

                    <div className="online-box">
                        <div className="image" data-aos="fade-left">
                            <img
                                src={onlineimage || "images/image-2.png"}
                                alt={`online image`}
                                loading="lazy"
                            />
                        </div>

                        <div className="content" data-aos="fade-right">
                            <ContentTitle data-aos="fade-down">
                                {`ماهو التدريس عن بعد ؟`}
                            </ContentTitle>

                            <p data-aos="fade-down">
                                {`التعليم عن بُعد هو وسيلة تعليمية حديثة النشأة
                                تهدف إلى تقديم التعليم من داخل المؤسسة التعليمة
                                إلى المتعلم في أي مكان كان. وتعد المرونة أحد أهم
                                إيجابيات التعليم عن بعد حيث أنه يتيح للطالب
                                التعلم في أي وقت وأي مكان.`}
                            </p>

                            <div className="btn" data-aos="fade-down">
                                <Link to={`/contact`} href="twasol.html">
                                    {`تواصل معنا`}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Online;
