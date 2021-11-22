import { Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import User from "../users/users.entity";

@Entity('schedule')
class Schedule {

    @ObjectIdColumn()
    public id: string;

    @Column({
        type: 'array',
        enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        nullable: true,
    })
    public days: string | null;

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    public start: Date;

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    public end: Date;

    @ManyToOne(() => User, user => user.id, { eager: true, nullable: true })
    @Column({
        type: 'varchar',
        nullable: true,
    })
    public userId: User;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => `timestamp('utc', now())`
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => `timestamp('utc', now())`
    })
    public updated_at: Date;
    
}

export default Schedule;