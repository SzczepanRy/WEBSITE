import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn,   ManyToOne } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    done: boolean;

    @Column({ length: 250 })
    description: string;

    @Column({ length: 2250 })
    body: string;

    @ManyToOne(()=>User, (user)=> user.tasks)
    user:User

}
