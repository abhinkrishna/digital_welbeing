import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

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
        type: 'varchar',
        nullable: true,
    })
    public start: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public end: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public userId: string;

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