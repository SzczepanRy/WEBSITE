import { useRef, useState } from "react";
import style from "./editModal.module.scss"
import net from "../../../net/net";
import { useMutation} from "@tanstack/react-query";
import { TaskI } from "../../../utils/types";
export default function EditModal({
    setRefreshNum,
    setEditModal,
    task
}: {
    setRefreshNum: React.Dispatch<React.SetStateAction<number>>;
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskI
}) {
    const [done , setDone] = useState<boolean>(task.done)

    const descRef = useRef<HTMLInputElement | null>(null)
    const bodyRef = useRef<HTMLTextAreaElement | null>(null)

    const editTaskFormMt = useMutation({
        mutationFn: async (task: { desc: string | undefined, body: string | undefined ,id:number ,done :boolean}) => {
            await net.editTask(task.desc, task.body , task.id , task.done);
            setRefreshNum((i) => i + 1);
        },

    });

    return (

        <div className={style.editModal}>
            <div className={style.editForm}>

                <h1 className={style.title}>edit task</h1>
                <div className={style.inputs}>
                    <div className={style.input}>
                        <label className={style.label} htmlFor="dir">
                            Description :
                        </label>
                        <input ref={descRef} defaultValue={task.description} type="text" className={style.inputVal} placeholder="description" />
                    </div>
                    <div className={style.input}>
                        <label className={style.label} htmlFor="dir">
                            Body :
                        </label>
                        <textarea ref={bodyRef} defaultValue={task.body} className={style.inputVal} placeholder="body" ></textarea>
                    </div>

                    <button onClick={()=>{ setDone((e)=>!e)}} className={done? style.done:style.notDone}>{done?"task is done":"task is not done"}</button>

                </div>
                <div className={style.buttons}>
                    <button
                        className={style.button}
                        onClick={() => {
                            editTaskFormMt.mutate({ desc: descRef.current?.value, body: bodyRef.current?.value , id:task.id , done:done})
                            setRefreshNum((e) => e + 1);
                            setEditModal((e) => !e);
                        }}
                    >
                        edit Task
                    </button>

                    <button
                        className={style.button}
                        onClick={() => {
                            setEditModal((e) => !e);
                        }}
                    >
                        cancel
                    </button>


                </div>
            </div>
        </div>
    )
}
