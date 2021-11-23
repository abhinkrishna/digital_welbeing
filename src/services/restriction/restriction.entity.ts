import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";
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

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public scheduleId: string;

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