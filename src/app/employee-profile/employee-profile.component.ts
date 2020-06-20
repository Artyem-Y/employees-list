import { Component, OnInit } from '@angular/core';
import {EMPLOYEES} from "../mock-employees";
import { Employee } from '../employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employees: Employee[] = EMPLOYEES;
  employee: Employee;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.employee = this.employees.find(e => e.id === Number(p.id));
    })
  }
}
