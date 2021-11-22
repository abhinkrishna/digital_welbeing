import { Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import Schedule from "../schedule/schedule.entity";

@Entity('restriction')
class Restriction {

    @ObjectIdColumn()
    public id: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public app_name: string | null;

    @Column({
        type: 'bool',
        nullable: true,
        default: false
    })
    public is_active: boolean;

    @Column({
        type: 'integer',
        nullable: true,
    })
    public weekdays: number | null;

    @Column({
        type: 'integer',
        nullable: true,
    })
    public weekends: number | null;

    @ManyToOne(() => Schedule, schedule => schedule.id, { eager: true, nullable: true })
    @Column({
        type: 'varchar',
        nullable: true,
    })
    public scheduleId: Schedule;

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

export default Restriction;