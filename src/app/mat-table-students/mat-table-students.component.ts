import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StudentService, Student } from '../service/student.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditStudentDialogWindowComponent } from '../edit-student-dialog-window/edit-student-dialog-window.component';
import { EditUserDialogWindowComponent } from '../edit-user-dialog-window/edit-user-dialog-window.component';
import { CreateStudentDialogWindowComponent } from '../create-student-dialog-window/student-dialog-window.component';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-mat-table-students',
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
  ],
  templateUrl: './mat-table-students.component.html',
  styleUrl: './mat-table-students.component.scss',
  standalone: true,
})
export class MatTableStudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'age', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) {}

  searchedVal: string = '';
  searchedType: string = '';
  studentsSort: string = 'id';
  order: 'asc' | 'desc' = 'asc';

  ngOnInit() {}

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadSearchedStudents());

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadSearchedStudents();
    });

    this.loadStudents();
  }

  //const url = `${this.studentsUrl}?page=${page}&limit=${limit}&sort=${sort}&order=${order}`;
  loadStudents() {
    const page = this.paginator.pageIndex;
    const limit = this.paginator.pageSize;
    this.studentsSort = this.sort.active || 'id'; // поле сортировки
    this.order = this.sort.direction || 'asc'; // направление сортировки

    this.studentService
      .getStudentsPaginated(page, limit, this.studentsSort, this.order)
      .subscribe((response) => {
        console.log(response.content);
        this.dataSource.data = response.content;
        this.paginator.length = Number(response.totalElements) || 0;
      });
  }

  loadSearchedStudents() {
    const page = this.paginator.pageIndex;
    const limit = this.paginator.pageSize;
    this.studentsSort = this.sort.active || 'id'; // поле сортировки
    this.order = this.sort.direction || 'asc'; // направление сортировки

    this.studentService
      .getStudentsSearched(
        this.searchedType,
        this.searchedVal,
        page,
        limit,
        this.studentsSort,
        this.order
      )
      .subscribe((response) => {
        console.log(response.content);
        this.dataSource.data = response.content;
        this.paginator.length = Number(response.totalElements) || 0;
      });
  }

  deleteStudent(student: Student) {
    this.studentService
      .deleteStudent(student)
      .subscribe(() => this.loadSearchedStudents());
  }

  updateUser(student: Student) {
    this.dialog
      .open(EditUserDialogWindowComponent, {
        width: '10%',
        height: '35%',
        data: { ...student },
      })
      .afterClosed()
      .subscribe(() => this.loadSearchedStudents());
  }

  updateStudent(student: Student) {
    this.dialog
      .open(EditStudentDialogWindowComponent, {
        width: '10%',
        height: '45%',
        data: { ...student },
      })
      .afterClosed()
      .subscribe(() => this.loadSearchedStudents());
  }

  createStudent() {
    this.dialog
      .open(CreateStudentDialogWindowComponent, {
        width: '10%',
        height: '70%',
      })
      .afterClosed()
      .subscribe(() => this.loadSearchedStudents());
  }

  reloadPage() {
    window.location.reload();
  }

  loadSearchedStudentsOnFirstPage() {
    this.paginator.pageIndex = 0; 

    this.loadSearchedStudents();
  }
}
