import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../service/student.service';
import { Student } from '../service/student.service';
import { FormsModule } from '@angular/forms';
import { StudentDTO } from '../service/student.service';


@Component({
  selector: 'app-student-dialog-window',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './student-dialog-window.component.html',
  styleUrl: './student-dialog-window.component.scss',
})
export class StudentDialogWindowComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentDialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService
  ) {
    if (data) {
      this.newId = data.id;
      this.newName = data.name;
      this.newSurname = data.surname;
      this.newAge = data.age;
    }
  }

  students: Student[] = [];

  newId: number = 0;
  newUserName: string = '';
  newPassword: string = '';
  newName: string = '';
  newSurname: string = '';
  newAge: number = 0;

  addStudent() {
    const student: StudentDTO = {
      id: this.newId,
      name: this.newName,
      surname: this.newSurname,
      age: Number(this.newAge),
      password: this.newPassword,
      userName: this.newUserName,
    };
    if (this.data) {
      this.studentService.updateStudent(student).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.studentService.addStudent(student).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}
