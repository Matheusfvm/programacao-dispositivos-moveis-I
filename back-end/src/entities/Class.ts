import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity("classes")
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ name: "carga_horaria", type: "int" })
  cargaHoraria!: number;

  @ManyToMany(() => User, (user) => user.disciplinas, {
    eager: true,
  })
  @JoinTable({
    name: "classes_alunos", // tabela de junção N:N
    joinColumn: { name: "class_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "aluno_id", referencedColumnName: "id" },
  })
  alunos!: User[];
}