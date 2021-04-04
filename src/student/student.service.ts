import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const { firstName, lastName } = createStudentInput;
    const student = await this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getStudent(id: string): Promise<StudentEntity> {
    const student = await this.studentRepository.findOne({
      id,
    });

    if (!student) {
      throw new NotFoundException(`Student Id: ${id} not found!`);
    }

    return student;
  }

  async getAllStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
