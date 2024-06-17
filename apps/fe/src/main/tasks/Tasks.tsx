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


    const [currentUser, setCurrentUser] = useState("all")
    const [users, setUsers] = useState(["all"])

    const allTasks = useQuery({
        queryKey: ["tasks"],
        queryFn: async()=>{
                let res = await net.fetchAllTasks()
                getUsers(res)
                return res
        }
    });


    useEffect(() => {
        allTasks.refetch()
        setIsAdmin(checkStorage())
    }, [RefreshNum])

    function getUsers(users: TaskI[]) {
        const allUsers: string[] = ["all"];
        users.map((el) => {
            if (!allUsers.includes(el.user.login)) {
                allUsers.push(el.user.login)
            }
        })
        setUsers(allUsers)
    }


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
            <main>
                <nav>
                    {
                        users.map((user: string, i: number) => {

                            return (
                                <div key={i} onClick={() => { setCurrentUser(user) }} className={user == currentUser ? style.selected : style.user}>{user}</div>
                            )
                        })
                    }
                </nav>
                <div className={style.tasks}>
                    {
                        allTasks.data.map((task: TaskI, i: number) => {
                            if (currentUser == task.user.login || currentUser == "all") {

                                return <Task setRefreshNum={setRefreshNum} task={task} isAdmin={isAdmin} key={i} />
                            }
                        })
                    }

                </div>

            </main>
        </>
    )
}
