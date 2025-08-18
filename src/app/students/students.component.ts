import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { Student } from '../service/student.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  
  students: Student[] = [];

  newId: number = 0;
  newName: string = '';
  newSurname: string = '';
  newAge: number = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
    });
  }
/*
  addStudent() {
    const student: Student = {
      id: Number(this.newId),
      name: this.newName,
      surname: this.newSurname,
      age: Number(this.newAge),
    };
    this.studentService.addStudent(student).subscribe(() => {
      this.loadStudents();
      this.newId = 0;
      this.newName = '';
      this.newSurname = '';
      this.newAge = 0;
    });
  }

  deleteStudent(student: Student) {
    this.studentService
      .deleteStudent(student)
      .subscribe(() => this.loadStudents());
  }

  updateStudent(student: Student) {
    let name = prompt('Введите новое имя', student.name);
    let surname = prompt('Введите новую фамилию', student.surname);
    let age = Number(prompt('Введите новый возраст', student.age.toString()));
    if (!name || !surname || !age || typeof age !== 'number') {
      alert('Данные введены некорректно');
      return;
    }
    const updatedStudent: Student = { ...student, name, surname, age };
    this.studentService
      .updateStudent(updatedStudent)
      .subscribe(() => this.loadStudents());
  }
*/
}
