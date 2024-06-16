export interface TaskI {

    id:number;
    done:boolean;
    description:string;
    body:string;
    user:UserI;
}

export interface UserI{
    id: number;
    login: string;
    password:string;
}
