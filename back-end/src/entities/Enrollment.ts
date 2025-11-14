import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Class } from "./Class";

@Entity("matriculas")
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.matriculas, {
    eager: true,
  })
  aluno!: User;

  @ManyToOne(() => Class, (classe) => classe.matriculas, {
    eager: true,
  })
  disciplina!: Class;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  p1!: number | null;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  p2!: number | null;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  p3!: number | null;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  mediaFinal!: number | null;

  @Column({ type: "int", default: 0 })
  faltas!: number;
}
