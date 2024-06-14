import { useRef } from "react";
import style from "./Modal.module.scss";
import net from "../../../net/net";
import { useMutation } from "@tanstack/react-query";

export default function FileModal({
    foldername,
    setFileModalState,
    setRefreshNum,
}: {
    setRefreshNum: React.Dispatch<React.SetStateAction<number>>;
    foldername: string;
    setFileModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const fileRef = useRef<any>(null);
    const sendFileMt = useMutation({
        mutationFn: async ({ fileData, folder }: any) => {
            await net.sendFile(fileData, folder);
            setRefreshNum((e) => e + 1);
        },
    });
    return (
        <div className={style.fileModal}>
            <div className={style.modalForm}>
                <h1 className={style.title}>send only one file</h1>
                <div className={style.innerForm}>
                    <input type="file" ref={fileRef} required accept="*" className={style.inputVal} name="upload" />
                    <button
                        className={style.button}
                        onClick={() => {
                            sendFileMt.mutate({ fileData: fileRef.current?.files[0], folder: foldername });

                            setFileModalState((e) => !e);
                        }}
                    >
                        submit
                    </button>
                </div>
                <button
                    className={style.button}
                    onClick={() => {
                        setFileModalState((e) => !e);
                    }}
                >
                    cancel
                </button>
            </div>
        </div>
    );
}
