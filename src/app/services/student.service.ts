import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  shouldGetAllStudents: BehaviorSubject<any> = new BehaviorSubject(false);
  shouldEdit: BehaviorSubject<any> = new BehaviorSubject(false);
  editValues: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  get = (): Observable<any> => {
    return this.http.get('http://localhost:4000/student')
  }
  post = (values: Object): Observable<any> => {
    return this.http.post('http://localhost:4000/student', values);
  }
  put = (values: Object): Observable<any> => {
    return this.http.put('http://localhost:4000/student', values);
  }
  delete = (id: any): Observable<any> => {
    return this.http.delete(`http://localhost:4000/student/${id}`);
  }
}
