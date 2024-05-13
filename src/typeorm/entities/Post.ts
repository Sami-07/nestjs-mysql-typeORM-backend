import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column()
    title: string

    @Column()
    description

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date; 
}