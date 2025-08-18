import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { MatTableStudentsComponent } from './mat-table-students/mat-table-students.component';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./authorization/authorization.component";
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FormsModule, MatTableStudentsComponent, LoginComponent, CommonModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'students-app';
  constructor(public auth: AuthService) {}
}
