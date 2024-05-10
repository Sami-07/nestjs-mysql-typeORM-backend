import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" }) // This is a decorator that tells TypeORM that this class is an entity
// The name property is optional. If you do not provide it, TypeORM will use the class name as the table name else it will use the name you provide to create the table in the database.
export class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    age: number;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}