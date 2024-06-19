import { useEffect, useState } from "react";
import Nav from "./nav/Nav";

import style from "./Main.module.scss";
import { Outlet } from "react-router-dom";
import { checkStorage } from "../utils/checkStorage.js";

export function MainPage() {
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        setIsAdmin(checkStorage());
    }, []);

    return (
        <>
            <div className={style.mainPage}>
                <h1>Main page</h1>
                {isAdmin ? <h2>for admin</h2> : <h2>for guest</h2>}
            </div>
        </>
    );
}

export function Main() {

    return (
        <>
            <Nav  />
            <main className={style.main}>
                <Outlet />
            </main>
        </>
    );
}
export function mainLoader() {
    return "mainLoader";
}
