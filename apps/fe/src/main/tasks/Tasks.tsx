import { useQuery } from "@tanstack/react-query";
import style from "./tasks.module.scss"
import net from "../../net/net";
import { useEffect, useState } from "react";
import { checkStorage } from "../../utils/checkStorage";
import Task from "./Task/Task"
import { TaskI } from "../../utils/types"
import AddModal from "./addModal/addModal";


export default function Tasks() {

    const [addModal, setAddModal] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [RefreshNum, setRefreshNum] = useState<number>(0);

    const allTasks = useQuery({
        queryKey: ["tasks"],
        queryFn: net.fetchAllTasks,
    });


    useEffect(() => {
        setTimeout(() => {
            setIsAdmin(checkStorage())
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
            allTasks.refetch()
        }, 50)

    }, [RefreshNum])


    if (allTasks.status === "pending") {
        return <h1>loading</h1>;
    }
    if (allTasks.status === "error") {
        return <h1>error</h1>;
    }
    return (
        <>
            <header>
                <h1>Tasks</h1>
                {
                    isAdmin && (
                        <div onClick={() => { setAddModal(true) }} className={style.add}>
                            add
                        </div>
                    )

                }
            </header>
            {
                addModal && (
                    <AddModal setRefreshNum={setRefreshNum} setAddModal={setAddModal} />
                )
            }
            <div className={style.tasks}>
                {
                    allTasks.data.map((task: TaskI, i: number) => {
                        return <Task setRefreshNum={setRefreshNum} task={task} isAdmin={isAdmin} key={i} />
                    })
                }

            </div>
        </>
    )
}
