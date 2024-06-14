import { useNavigate } from "react-router-dom";

import style from "./Nav.module.scss";

export default function Nav() {
    const navigate = useNavigate();
    function logout(): void {
        localStorage.clear();
        navigate("/");
    }

    function checkLocalStorage(): boolean {
        if (localStorage.getItem("loginData")) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className={style.nav}>
            <div className={style.title}>Welcome to my page</div>
            <ol className={style.ol}>
                <li
                    className={style.el}
                    onClick={() => {
                        navigate("/main/mainpage");
                    }}
                >
                    main
                </li>
                {
                    checkLocalStorage() && (
                        <>
                            <li
                                className={style.el}
                                onClick={() => {
                                    navigate("/main/php");
                                }}
                            >
                                php
                            </li>

                            <li
                                className={style.el}
                                onClick={() => {
                                    navigate("/main/calendar");
                                }}
                            >
                                calendar
                            </li>

                        </>
                    )
                }
                <li
                    className={style.el}
                    onClick={() => {
                        navigate("/main/js");
                    }}
                >
                    js
                </li>
                <li
                    className={style.el}
                    onClick={() => {
                        navigate("/main/about");
                    }}
                >
                    aboutme
                </li>
                <li className={style.el} onClick={logout}>
                    logout
                </li>
            </ol>
        </div>
    );
}
