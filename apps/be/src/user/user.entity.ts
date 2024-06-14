import { Task } from 'src/tasks/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    login: string;

    @Column({ length: 250 })
    password: string;


    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

}
