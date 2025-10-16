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
}
