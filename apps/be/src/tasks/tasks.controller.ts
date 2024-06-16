import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }


    @Post("/all")
    getPostsForUser(@Body() { login }: { login: string }): Promise<Task[]> {
        return this.tasksService.findTasksForUser(login)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/add")
    addPostForUser(@Body() { description , body ,  login }: { description:string, body:string ,login: string }): Promise<{message:string , success:boolean}> {
        return this.tasksService.addTaskForUser(description, body, login)
    }
    @UseGuards(JwtAuthGuard)
    @Post("/update")
    updateDoneById(@Body() { description , body , done , id }: {description:string , body:string , done:boolean, id:number }): Promise<{message:string , success:boolean}> {
        return this.tasksService.updateTagById(description, body , done,id)
    }


    @UseGuards(JwtAuthGuard)
    @Delete("/delete")
    deleteTask(@Body() { id}: { id:number }): Promise<{message:string , success:boolean}> {
        return this.tasksService.deleteTask(id)
    }

}
