import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentService, UserPasswordDTO } from '../service/student.service';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-student-dialog-window',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './edit-user-dialog-window.component.html',
  styleUrl: './edit-user-dialog-window.component.scss',
})
export class EditUserDialogWindowComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService
  ) {
    if (data) {
      this.Id = data.id;
    } else {return;}
  }

  Id: number = 0;
  newUserName: string = '';
  newPassword: string = '';

  editUser() {
    const user: UserPasswordDTO = {
      id: this.Id,
      password: this.newUserName,
      userName: this.newPassword
    };

      this.studentService.updateUser(user).subscribe(() => {
        this.dialogRef.close(true);
      });
  }
  onCancel() {
    this.dialogRef.close();
  }
}
