import { useEffect, useState } from "react";
import net from "../../net/net";
import style from "./Php.module.scss";
import { checkStorage } from "../../utils/checkStorage";
import Modal from "./foldermodal/Modal";
import FileModal from "./filemodal/FileModal";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function Php() {
    const [RefreshNum, setRefreshNum] = useState<number>(0);

    const [modalFolderState, setFolderModalState] = useState<boolean>(false);
    const [modalFileState, setFileModalState] = useState<boolean>(false);
    const [editedFolder, setEditedFolder] = useState<string>("");
    const [hiddenArr , setHiddenArr] = useState<string[]>([])
    const [isAdmin, setIsAdmin] = useState(false);

    const [deleteFile , setDeleteFile] = useState<string | boolean>(false)
    const [deleteFolder , setDeleteFolder] = useState<string | boolean>(false)

    const deleteFileMt = useMutation({
        mutationFn: async (filename: string) => {
            await net.deleteFile(filename);
            setRefreshNum((i) => i + 1);
        },
    });
    const deleteFolderMt = useMutation({
        mutationFn: async (dir: string) => {
            await net.deleteFolder(dir);
            setRefreshNum((i) => i + 1);
        },
    });

    const allFileNames = useQuery({
        queryKey: ["filenames"],
        queryFn: net.fetchAllFiles,
    });

    useEffect(() => {
        setTimeout(()=>{
 setIsAdmin(checkStorage());
        console.log(RefreshNum);
        allFileNames.refetch();

        },50)
           }, [RefreshNum]);

    if (allFileNames.status === "pending") {
        return <h1>loading</h1>;
    }
    if (allFileNames.status === "error") {
        return <h1>error</h1>;
    }
    return (
        <div className={style.mainPhp}>
            <h1>Php</h1>
            {deleteFile && (
                <div className={style.deleteBG}>
                     <div className={style.deleteModal} >
                        <button className={style.deleteButton} onClick={()=>{
                            deleteFileMt.mutate(deleteFile as string);
                            setDeleteFile(false)
                        }}> delete </button>
                        <button className={style.cancelButton} onClick={()=>{setDeleteFile(false)}}> close </button>
                     </div>
                </div>
            )}

            {deleteFolder && (
                <div className={style.deleteBG}>
                 <div className={style.deleteModal} >
                    <button className={style.deleteButton} onClick={()=>{
                         deleteFolderMt.mutate(deleteFolder as string);
                   setDeleteFolder(false)
                    }}> delete </button>
                    <button className={style.cancelButton} onClick={()=>{setDeleteFolder(false)}}> close </button>
                    </div>
                </div>
            )}
            {modalFolderState && (
                <Modal
                    setRefreshNum={setRefreshNum}
                    foldername={editedFolder}
                    setFolderModalState={setFolderModalState}
                />
            )}
            {modalFileState && (
                <FileModal
                    setRefreshNum={setRefreshNum}
                    foldername={editedFolder}
                    setFileModalState={setFileModalState}
                />
            )}
            <ul className={style.fileTree}>
                {allFileNames.data.map((nameObj: any, i: number) => {
                    return (
                        <div key={i}>
                            <h4>
                                {Object.keys(nameObj)[0]}
                                {isAdmin && (
                                    <>
                                        <a
                                            onClick={() => {
                                                setFolderModalState((e) => !e);
                                                setEditedFolder(`/main${Object.keys(nameObj)[0]}`);
                                            }}
                                        >
                                            {" +dir"}
                                        </a>
                                        <a
                                            onClick={() => {
                                                setFileModalState((e) => !e);
                                                setEditedFolder(`/main${Object.keys(nameObj)[0]}`);
                                            }}
                                        >
                                            {" +file"}
                                        </a>
                                        {Object.keys(nameObj)[0] != "/" && (
                                            <a
                                                className={style.link}
                                                onClick={() => {
                                                    setDeleteFolder(`${Object.keys(nameObj)[0]}` as string)
                                                }}
                                            >
                                                {" delete"}
                                            </a>
                                        )}
                                        <a
                                            onClick={()=>{
                                                if(hiddenArr.includes(Object.keys(nameObj)[0])){
                                                setHiddenArr((arr:string[])=>
                                                        arr.filter((el:string)=>el!=Object.keys(nameObj)[0])
                                                )
                                               }else{
                                                    setHiddenArr((arr:string[])=>[...arr, Object.keys(nameObj)[0]])
                                                }

                                                console.log(Object.keys(nameObj)[0] , "click")
                                            }}
                                        >
                                          {" minFolder"}
                                        </a>
                                    </>
                                )}
                            </h4>
                            <ul>
                                {(nameObj[Object.keys(nameObj)[0]] as string[]).map((name, i) => {
                                    if (name != "" && !hiddenArr.includes(Object.keys(nameObj)[0]) ) {
                                        return (
                                            <li className={style.el} key={i}>
                                                <p>
                                                    <a
                                                        href={`http://5.185.3.151:3344/${Object.keys(nameObj)[0]}/${name}`}
                                                    >
                                                        {name as string}
                                                    </a>
                                                </p>
                                                {isAdmin && (
                                                    <a
                                                        className={style.link}
                                                        onClick={() => {
                                                            setDeleteFile(`${Object.keys(nameObj)[0]}/${name}` as string)
                                                        }}
                                                    >
                                                        delete
                                                    </a>
                                                )}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
