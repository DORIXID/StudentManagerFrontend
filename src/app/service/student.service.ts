import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpParams } from '@angular/common/http';

export interface Student {
  id: number;
  name: string;
  surname: string;
  age: number;
}

export interface StudentUserPasswordDTO {
  id: number;
  name: string;
  surname: string;
  age: number;
  password: string;
  userName: string;
}

export interface StudentDTO {
  id: number;
  name: string;
  surname: string;
  age: number;
}


export interface UserPasswordDTO {
  id: number;
  password: string;
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private studentsUrl = '/api/base/students';

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      this.studentsUrl
    );
  }

  addStudent(student: StudentUserPasswordDTO): Observable<StudentDTO> {
    return this.http.post<StudentDTO>(this.studentsUrl, student);
  }

  deleteStudent(student: Student): Observable<Student> {
    return this.http.delete<Student>(this.studentsUrl, {
      body: student
    });
  }

  updateStudent(student: StudentDTO): Observable<StudentDTO> {
    return this.http.patch<StudentDTO>(this.studentsUrl, student);
  }

  updateUser(user: UserPasswordDTO): Observable<UserPasswordDTO> {
    return this.http.patch<UserPasswordDTO>(this.studentsUrl + '/user', user);
  }
  // Итак, что бы закрепить
  // Метод возвращает объект Observable в котором объект вида Student[] тогда, когда данные прийдут.
  // Observable ждет данные от http.get (ждет ответа от сервера на get запрос)
  // http.get отправляет get запрос с url, указанным в аргументах, а принимает ответ от сервера вида Student[]
  // Как раз таки этот объект вида Student[] возвращается через observable подписанной функции.
  getStudentsPaginated(
    page: number,
    limit: number,
    sort: string,
    order: 'asc' | 'desc'
  ): Observable<{ meta: any; content: Student[] }> {
    let sortParam: string;
    if (order === 'desc') {
      sortParam = `-${sort}`;
    } else {
      sortParam = sort;
    }
    const url = `${this.studentsUrl}?page=${page}&limit=${limit}&sortBy=${sortParam}`;
    return this.http.get<{ meta: any; content: Student[] }>(url, {
      headers: { Authorization: this.auth.getAuthHeader() },
    });
  }

  getStudentsSearched(
    searchedType: string,
    searchedVal: number | string,
    page: number,
    limit: number,
    sort: string,
    order: 'asc' | 'desc'
  ): Observable<{ meta: any; content: Student[] }> {
    let sortParam: string;
    if (order === 'desc') {
      sortParam = `-${sort}`;
    } else {
      sortParam = sort;
    }
    const url = `${this.studentsUrl}?page=${page}&limit=${limit}&sortBy=${sortParam}&searchedType=${searchedType}&searchedValue=${searchedVal}`;
    return this.http.get<{ meta: any; content: Student[] }>(url, {
      headers: { Authorization: this.auth.getAuthHeader() },
    });
  }
}
