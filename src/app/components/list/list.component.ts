import { Component, OnInit } from '@angular/core';
import { StudenModel } from 'src/app/Models/StudentModel';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  students: Array<StudenModel> = [];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents()
    this.studentService.shouldGetAllStudents.subscribe(data => {
      data && this.getAllStudents();
    })
  }

  getAllStudents() {
    this.studentService.get().subscribe(data => {
      this.students = data.data
    })
  }

  Edit(id: any) {
    this.studentService.shouldEdit.next(true);
    this.studentService.editValues.next(this.students.filter(student => student.StudentID === id)[0])
  }

  Delete(id: any) {
    this.studentService.delete(id).subscribe(data => {
      data.success && this.getAllStudents();
    })
  }



}
