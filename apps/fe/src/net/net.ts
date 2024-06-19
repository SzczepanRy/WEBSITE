//const localUrl = "http://localhost:3000"
const localUrl = ""
const net = {
    async fetchLogin(login: string, password: string) {
        const res = await fetch(localUrl + "/api/user/login", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                login,
                password,
            }),
        });

        const data = await res.json();
        if (data.success) {
            return data.accesToken;
        } else {
            return null;
        }
    },
    async fetchAllFiles() {

        const res = await fetch(localUrl + "/api/files/all", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await res.json();
        // console.log(data.files);

        if (data.success) {
            return data.files;
        } else {
            return new Error("Network response was not ok");
        }
    },
    async deleteFile(name: string) {
        console.log(name);
        let nameArr = name.split("");
        nameArr.shift();
        name = nameArr.join("");

        let token = localStorage.getItem("loginData")
        const res = await fetch(
            localUrl + "/api/files/delete?" +
            new URLSearchParams({
                name: name,
            }),
            {
                method: "delete",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );

        const data = await res.json();
        if (data.statusCode == 401) {
            location.href = "/"
        }


        if (data.success) {
            return data.message;
        } else {
            return data.message;
        }
    },
    async deleteFolder(dir: string) {
        console.log(dir);

        let token = localStorage.getItem("loginData")
        const res = await fetch(
            localUrl + "/api/files/deletefolder?" +
            new URLSearchParams({
                dir: dir,
            }),
            {
                method: "delete",
                headers: {
                    "content-type": "application/json",

                    "Authorization": `Bearer ${token}`
                },
            }
        );

        const data = await res.json();
        if (data.statusCode == 401) {
            location.href = "/"
        }


        if (data.success) {
            return data.message;
        } else {
            return data.message;
        }
    },
    async sendFile(data: any, dir: string) {
        const formData = new FormData();
        formData.append("file", data);

        let dirArr = dir.split("/");
        dirArr = dirArr.filter((el) => {
            if (el != "" && el != "main") {
                return el;
            }
        });
        let dirStr = dirArr.join("/");
        console.log(dirStr + " dir");

        console.log(`${dirStr}/${data.name}`);
        dir = `${dirStr}/${data.name}`;
        // formData.append("filepath", dir + "/" + data.name);
        let token = localStorage.getItem("loginData")
        const res = await fetch(
            localUrl + "/api/files/upload?" +
            new URLSearchParams({
                dir: dir,
            }),
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            }
        );
        const resData = await res.json();
        if (data.statusCode == 401) {
            location.href = "/"
        }


        if (resData.success) {
            return resData.message;
        } else {
            return resData.message;
        }
    },
    async addFolder(dirPath: string | undefined, foldername: string) {
        console.log(dirPath + " AAAAAAAAAAAA");
        if (dirPath === undefined) {
            dirPath = "dir";
        }
        let dirArr = foldername.split("/");
        dirArr = dirArr.filter((el) => {
            if (el != "" && el != "main") {
                return el;
            }
        });
        if (dirPath) {
            dirArr.push(dirPath);
        }
        let dir = dirArr.join("/");
        console.log(dir);
        let token = localStorage.getItem("loginData")
        console.log(token)
        const res = await fetch(localUrl + "/api/files/addfolder", {
            method: "post",
            headers: {
                "content-type": "application/json",

                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ dir }),
        });

        const data = await res.json();
        if (data.statusCode == 401) {
            location.href = "/"
        }


        if (data.success) {
            return data.message;
        } else {
            return data.message;
        }
    },
    async fetchAllTasks() {

        const res = await fetch(localUrl + "/api/tasks/all", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ login: localStorage.getItem("currentUser") })
        });

        const data = await res.json();
        // console.log(data.files);

        if (data) {
            return data;
        } else {
            return new Error("Network response was not ok");
        }
    },

    async addTask(description: string | undefined, body: string | undefined) {

        let token = localStorage.getItem("loginData")
        if (description == undefined) description = "no description";
        if (body == undefined) body = "no body";
        const res = await fetch(localUrl + "/api/tasks/add", {
            method: "post",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                description,
                body,
                login: localStorage.getItem("currentUser")
            })
        });

        const data = await res.json();
        console.log(data);

        if (data.statusCode == 401) {
            location.href = "/"
        }

    },
    async deleteTask(id: number) {


        let token = localStorage.getItem("loginData")
        const res = await fetch(localUrl + "/api/tasks/delete", {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        });

        const data = await res.json();
        // console.log(data.files);
        if (data.statusCode == 401) {
            location.href = "/"
        }

        if (data) {
            return data;
        } else {
            return new Error("Network response was not ok");
        }


    },
    async editTask(description: string | undefined, body: string | undefined, id: number, done: boolean) {

        let token = localStorage.getItem("loginData")
        if (description == undefined) description = "no description";
        if (body == undefined) body = "no body";
        const res = await fetch(localUrl + "/api/tasks/update", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                description,
                body,
                id,
                done,
            })
        });

        const data = await res.json();
        console.log(data);

        if (data.statusCode == 401) {
            location.href = "/"
        }

    },

};
export default net;
