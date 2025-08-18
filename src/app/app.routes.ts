import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { MatTableStudentsComponent } from './mat-table-students/mat-table-students.component';

export const routes: Routes = [
  // { path: 'students', component: StudentsComponent },
  // { path: '', redirectTo: '/students', pathMatch: 'full' },
  // { path: 'mat-table', component: MatTableStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }