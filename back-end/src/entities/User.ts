import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Class } from "./Class";

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

  @ManyToMany(() => Class, (classe) => classe.alunos)
  disciplinas!: Class[]
}