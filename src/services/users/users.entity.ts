import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
class User {

    @ObjectIdColumn()
    public id: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public name: string | null;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: true,
    })
    public email: string | null;

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

export default User;