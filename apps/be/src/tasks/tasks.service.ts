import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @Inject("TASKS_REPOSITORY")
        private tasksRepository: Repository<Task>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,

    ) { }


    async findOne(login: string): Promise<User | undefined> {

        let users = await this.userRepository.find();
        return users.find(user => user.login === login);
    }

    async findTasksForUser(login: string): Promise<Task[]> {
        let tasks = await this.tasksRepository.find({
            relations: {
                user: true,
            },
            where: {
                user: {
                    login: login
                }
            }

        })
        return tasks
    }

    async addTaskForUser(description: string, body: string, login: string): Promise<{ message: string, success: boolean }> {
        const user = await this.findOne(login)


        if (!user) {
            return { message: "did not find user with login " + login, success: false }
        }

        const task = new Task()
        task.description = description
        task.body = body
        task.user = user
        task.done = false

        await this.tasksRepository.manager.save(task)

        return { message: "successfully added task", success: true }

    }


    async updateTagById(description:string  , body:string,done: boolean,  id: number): Promise<{ message: string, success: boolean }>  {
        await this.tasksRepository
            .createQueryBuilder()
            .update(Task)
            .set({
                done:done,
                body:body,
                description:description
            })
            .where("id = :id", { id: id })
            .execute()
        console.log("update")
        return  {message:"update successfull i think ", success:true}
    }

    async deleteTask(id : number):Promise<{ message: string, success: boolean }>  {
        await this.tasksRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: id })
            .execute()

        return  {message:"delete successfull i think ", success:true}

    }


}

