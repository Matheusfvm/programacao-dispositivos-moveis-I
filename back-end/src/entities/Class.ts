import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Enrollment } from "./Enrollment";

@Entity("classes")
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ name: "carga_horaria", type: "int" })
  cargaHoraria!: number;

  // Professor titular da disciplina (1 professor → N disciplinas)
  @ManyToOne(() => User, (user) => user.disciplinasMinistradas, {
    eager: true,
    nullable: true, // pode começar sem professor vinculado
  })
  professor!: User | null;

  // Matrículas (alunos) desta disciplina
  @OneToMany(() => Enrollment, (matricula) => matricula.disciplina)
  matriculas!: Enrollment[];
}
