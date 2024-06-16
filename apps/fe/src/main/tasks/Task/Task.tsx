import { TaskI } from "../../../utils/types";
import style from "./Task.module.scss"
import { useMutation } from "@tanstack/react-query";
import net from "../../../net/net";
import EditModal from "../editModal/editModal";
import { useState } from "react";

export default function Task({ task, isAdmin, setRefreshNum }: {
    task: TaskI, isAdmin: boolean,
    setRefreshNum: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [editModal, setEditModal] = useState(false)


    const deleteTaskMt = useMutation({
        mutationFn: async (id: number) => {
            await net.deleteTask(id);
            setRefreshNum((i) => i + 1);
        },

    });


    return (

        <div className={style.task}>
            <div className={style.nav}>
                <div className={style.desc}>{task.description}</div>
                {
                    isAdmin && (
                        <ul className={style.buttons}>
                            <li onClick={() => { setEditModal(true) }}>edit</li>
                            <li onClick={() => { deleteTaskMt.mutate(task.id) }}>delete</li>
                        </ul>
                    )
                }
            </div>
            {
                editModal && (

                    <EditModal setRefreshNum={setRefreshNum} setEditModal={setEditModal} task={task} />
                )
            }
            <pre className={style.body}>
                {task.body}
            </pre>

            <button className={task.done ? style.done : style.notDone }>{task.done ? "task is done" : "task is not done"}</button>
        </div>
    )
}
