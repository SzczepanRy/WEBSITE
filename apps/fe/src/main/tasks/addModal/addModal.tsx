import { useRef} from "react";
import style from "./addModal.module.scss"
import net from "../../../net/net";
import { useMutation} from "@tanstack/react-query";
export default function AddModal({
    setRefreshNum,
    setAddModal
}: {
    setRefreshNum: React.Dispatch<React.SetStateAction<number>>;
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>;

}) {


    const descRef = useRef<HTMLInputElement | null>(null)
    const bodyRef = useRef<HTMLTextAreaElement | null>(null)

    const sendTaskFormMt = useMutation({
        mutationFn: async ( task : {desc: string | undefined, body: string | undefined}) => {
            await net.addTask(task.desc , task.body);
            setRefreshNum((i) => i + 1);
        },

    });

    return (

        <div className={style.addModal}>
            <div className={style.addForm}>

                <h1 className={style.title}>adding new task</h1>
                <div className={style.inputs}>
                    <div className={style.input}>
                        <label className={style.label} htmlFor="dir">
                            Description :
                        </label>
                        <input ref={descRef} type="text" className={style.inputVal} placeholder="description" />
                    </div>
                    <div className={style.input}>
                        <label className={style.label} htmlFor="dir">
                            Body :
                        </label>
                        <textarea ref={bodyRef} className={style.inputVal} placeholder="body" ></textarea>
                    </div>


                </div>
                <div className={style.buttons}>
                    <button
                        className={style.button}
                        onClick={() => {
                            sendTaskFormMt.mutate( { desc : descRef.current?.value , body : bodyRef.current?.value}  )
                            setRefreshNum((e) => e + 1);
                            setAddModal((e) => !e);
                        }}
                    >
                        add Task
                    </button>

                    <button
                        className={style.button}
                        onClick={() => {
                            setAddModal((e) => !e);
                        }}
                    >
                        cancel
                    </button>


                </div>
            </div>
        </div>
    )
}
