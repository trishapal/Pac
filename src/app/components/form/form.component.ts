import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  StudentID: string = '';
  FirstName: string = '';
  LastName: string = '';
  Class: string = '';
  Roll: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.shouldEdit.subscribe(data => {
      data && this.studentService.editValues.subscribe(data => {
        this.StudentID = data.StudentID;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Class = data.Class;
        this.Roll = data.Roll;
      })
    })
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      const postValues = {
        StudentID: this.StudentID,
        FirstName: form.controls.FirstName.value,
        LastName: form.controls.LastName.value,
        Class: form.controls.Class.value,
        Roll: form.controls.Roll.value,
      }
      this.studentService.shouldEdit.subscribe(data => {
        data ?
          this.studentService.put(postValues).subscribe(data => {
            data.success && this.studentService.shouldGetAllStudents.next(true)
          }) :
          this.studentService.post(postValues).subscribe(data => {
            data.success && this.studentService.shouldGetAllStudents.next(true)
          })
      })
      this.StudentID = '';
      form.reset();
    }
  }

}
