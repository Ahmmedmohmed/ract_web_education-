import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// style
import "./LoginModle.scss";

function LoginModle() {
    return (
        <>
            <div className="login" id="loginPage">
                <div className="form" id="form">
                    <div id="close">✖</div>
                    <div className="logo">
                        <div className="icon-logo">
                            <FontAwesomeIcon icon={faGraduationCap} />
                        </div>

                        <a href="#">
                            <span>أكا</span>ديمية <span>مُع</span>لم
                        </a>
                    </div>

                    <p className="paragraph" id="paragraph">
                        يرجي تسجيل الدخول إلي حسابك لتصفح الدروس
                    </p>

                    <form action="" id="Form">
                        <label
                            htmlFor="email"
                            style={{ display: "none" }}
                        ></label>
                        <input
                            className="input"
                            id="email"
                            type="email"
                            name="mail"
                            placeholder="عنوان البريد الالكتروني"
                            autoComplete="off"
                        />
                        <span id="messageemail">أكتب بريدك الاٍلكتروني</span>

                        <label
                            htmlFor="password"
                            style={{ display: "none" }}
                        ></label>
                        <input
                            className="input"
                            id="password"
                            type="password"
                            placeholder="كلمة المرور"
                            autoComplete="off"
                        />
                        <span id="messagemot">أكتب كلمة المرور </span>

                        <div className="info">
                            <a href="#">هل نسيت كلمة السر؟</a>
                        </div>

                        <div className="btn">
                            <button id="oki" disabled>
                                تسجيل الدخول
                            </button>
                        </div>

                        <p className="p">
                            إذا كنت جديد على منتصنا قم بالإشتراك
                        </p>

                        <div className="btn">
                            <a href="subscribe.html" className="subs">
                                الإشتراك
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginModle;
