import style from "./JsPage.module.scss";
import MyThree from "./test/Cube";

export default function JsPage(){
    return (
        <div className={style.mainJsPage}>
            <MyThree  />
        </div>
    );
}
