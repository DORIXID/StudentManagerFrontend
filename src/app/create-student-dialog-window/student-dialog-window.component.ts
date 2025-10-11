import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../service/student.service';
import { FormsModule } from '@angular/forms';
import { StudentUserPasswordDTO } from '../service/student.service';

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

export class CreateStudentDialogWindowComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateStudentDialogWindowComponent>,
    private studentService: StudentService
  ) {
  }

  newId: number = 0;
  newUserName: string = '';
  newPassword: string = '';
  newName: string = '';
  newSurname: string = '';
  newAge: number = 0;

  addStudent() {
    const student: StudentUserPasswordDTO = {
      id: this.newId,
      name: this.newName,
      surname: this.newSurname,
      age: Number(this.newAge),
      password: this.newPassword,
      userName: this.newUserName,
    };

      this.studentService.addStudent(student).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
    onCancel() {
      this.dialogRef.close();
    }
}
