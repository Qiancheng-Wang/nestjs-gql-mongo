import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  student(@Args('id') id: string): Promise<StudentEntity> {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  allStudents(): Promise<StudentEntity[]> {
    return this.studentService.getAllStudents();
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    return this.studentService.createStudent(createStudentInput);
  }
}
