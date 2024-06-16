import {  useRef, useState } from "react";
import net from "../net/net";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

export default function Login() {
    const [validCheck, setValidCheck] = useState("");
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function handleLogin() {
        const login = loginRef.current?.value as string;
        const password = passwordRef.current?.value as string;

        const data = await net.fetchLogin(login, password);

        if (data) {
            //redirect
            localStorage.setItem("currentUser", login)
            localStorage.setItem("loginData", data);
            navigate("/main/mainpage");
        } else {
            setValidCheck("login faled");
        }
    }
    return (
        <div className={styles.login}>
            <div className={styles.modal}>
                <div
                    className={styles.p}
                    style={{
                        padding: validCheck == "" ? "0px" : "5px",
                        borderRadius: validCheck == "" ? "0px" : "5px",
                    }}
                >
                    {validCheck}
                </div>
                <input type="text" className={styles.input} ref={loginRef} placeholder="login" />
                <input type="text" ref={passwordRef} className={styles.input} placeholder="password" />

                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        send
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            navigate("/main/mainpage");
                        }}
                    >
                        view as guest
                    </button>
                </div>
            </div>
        </div>
    );
}
