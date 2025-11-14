import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Class } from "./Class";
import { Enrollment } from "./Enrollment";

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

  @Column({ default: "aluno" })
  tipo!: string;

  // Disciplinas que o usuário ministra como professor (1:N)
  @OneToMany(() => Class, (classe) => classe.professor)
  disciplinasMinistradas!: Class[];

  // Matrículas do usuário (quando ele é aluno)
  @OneToMany(() => Enrollment, (matricula) => matricula.aluno)
  matriculas!: Enrollment[];
}