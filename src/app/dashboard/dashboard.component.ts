import {AfterViewInit, Component, OnInit} from "@angular/core";
import {EMPLOYEES} from "../mock-employees";
import { Employee } from '../employee';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{
  employees: Employee[] = EMPLOYEES;

  constructor() {
    const employees: Employee[] = EMPLOYEES;
    this.dataSource = new MatTableDataSource(employees);
  }
  form:FormGroup = new FormGroup({
    id: new FormControl(false),
    name: new FormControl(false),
    lastName: new FormControl(false),
    dateOfBirth: new FormControl(false),
    phone: new FormControl(false),
    email: new FormControl(false)
  });

  id = this.form.get('id');
  name = this.form.get('name');
  lastName = this.form.get('lastName');
  dateOfBirth = this.form.get('dateOfBirth');
  phone = this.form.get('phone');
  email = this.form.get('email');

  cbValues;

  /**
   * Control column ordering and which columns are displayed.
   */

  columnDefinitions = [
    { def: 'id', label: 'id', hide: this.id.value},
    { def: 'name', label: 'name', hide: this.name.value},
    { def: 'lastName', label: 'lastName', hide: this.lastName.value},
    { def: 'dateOfBirth', label: 'dateOfBirth', hide: this.dateOfBirth.value},
    { def: 'phone', label: 'phone', hide: this.phone.value},
    { def: 'email', label: 'email', hide: this.email.value},
  ]

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  dataSource: MatTableDataSource<Employee>;
  ngAfterViewInit() {
    let o1:Observable<boolean> = this.id.valueChanges;
    let o2:Observable<boolean> = this.name.valueChanges;
    let o3:Observable<boolean> = this.lastName.valueChanges;
    let o4:Observable<boolean> = this.dateOfBirth.valueChanges;
    let o5:Observable<boolean> = this.phone.valueChanges;
    let o6:Observable<boolean> = this.email.valueChanges;

    merge(o1, o2, o3, o4, o5, o6).subscribe( v=>{
      this.columnDefinitions[0].hide = this.id.value;
      this.columnDefinitions[1].hide = this.name.value;
      this.columnDefinitions[2].hide = this.lastName.value;
      this.columnDefinitions[3].hide = this.dateOfBirth.value;
      this.columnDefinitions[4].hide = this.phone.value;
      this.columnDefinitions[5].hide = this.email.value;
      console.log(this.columnDefinitions);
    });
  }

}
