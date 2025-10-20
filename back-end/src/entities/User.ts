import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  nome!: string;

  @Column()
  senha!: string;

  @Column({ default: "aluno" }) // "admin", "professor", "aluno"
  tipo!: string;
}