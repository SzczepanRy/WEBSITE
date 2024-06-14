import { useRef } from "react";
import net from "../../../net/net";
import style from "./Modal.module.scss";
import { useQuery } from "@tanstack/react-query";
export default function Modal({
    setRefreshNum,
    foldername,
    setFolderModalState,
}: {
    setRefreshNum: React.Dispatch<React.SetStateAction<number>>;
    foldername: string;
    setFolderModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const dirRef = useRef<HTMLInputElement | null>(null);

    const sendForm = useQuery({
        queryKey: ["sendform"],
        queryFn: () => net.addFolder(dirRef.current?.value, foldername),
        refetchOnWindowFocus: false,
    });
    return (
        <div className={style.mainModal}>
            <div className={style.modalForm}>
                <h1 className={style.title}>adding folder to {foldername}</h1>
                <div className={style.inputs}>
                    <div className={style.input}>
                        <label className={style.label} htmlFor="dir">
                            New Dir :
                        </label>
                        <input ref={dirRef} type="text" className={style.inputVal} id="dir" placeholder="dir" />
                    </div>

                    <button
                        className={style.button}
                        onClick={() => {
                            sendForm.refetch();
                            setRefreshNum((e) => e + 1);
                            setFolderModalState((e) => !e);
                        }}
                    >
                        add folder
                    </button>
                </div>

                <button
                    className={style.button}
                    onClick={() => {
                        setFolderModalState((e) => !e);
                    }}
                >
                    cancel
                </button>
            </div>
        </div>
    );
}
