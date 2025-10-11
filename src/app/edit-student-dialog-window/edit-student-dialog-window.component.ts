import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../service/student.service';
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
  templateUrl: './edit-student-dialog-window.component.html',
  styleUrl: './edit-student-dialog-window.component.scss',
})
export class EditStudentDialogWindowComponent {
  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService
  ) {
    if (data) {
      this.newId = data.id;
      this.newName = data.name;
      this.newSurname = data.surname;
      this.newAge = data.age;
    } else {return;}
  }

  newId: number = 0;
  newName: string = '';
  newSurname: string = '';
  newAge: number = 0;

  editStudent() {
    const student: StudentDTO = {
      id: this.newId,
      name: this.newName,
      surname: this.newSurname,
      age: Number(this.newAge)
    };
      this.studentService.updateStudent(student).subscribe(() => {
        this.dialogRef.close(true);
      });
  }
  onCancel() {
    this.dialogRef.close();
  }
}
