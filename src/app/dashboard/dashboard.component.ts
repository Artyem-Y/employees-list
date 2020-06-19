import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {EMPLOYEES} from "../mock-employees";
import {Employee} from '../employee';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {Observable, merge} from 'rxjs';
import {MatTableDataSource} from "@angular/material";
import {CdkDragStart, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  columnDefinitions: any[];
  sortedData: Employee[];
  employees: Employee[];

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.employees = EMPLOYEES;
    this.dataSource = new MatTableDataSource(this.employees);
    this.sortedData = this.employees.slice();
    this.columnDefinitions = JSON.parse(localStorage.getItem('columnDefinitions')) ? JSON.parse(localStorage.getItem('columnDefinitions')) : [
      {def: 'id', label: 'id', hide: this.id.value},
      {def: 'name', label: 'name', hide: this.name.value},
      {def: 'lastName', label: 'lastName', hide: this.lastName.value},
      {def: 'dateOfBirth', label: 'dateOfBirth', hide: this.dateOfBirth.value},
      {def: 'phone', label: 'phone', hide: this.phone.value},
      {def: 'email', label: 'email', hide: this.email.value},
    ]
  }

  form: FormGroup = new FormGroup({
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

  /**
   * Control column ordering and which columns are displayed.
   */
  previousIndex: number;

  getDisplayedColumns(): string[] {
    return this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  dataSource: MatTableDataSource<Employee>;

  ngAfterViewInit() {
    this.initiateColumns();
    this.dataSource.sort = this.sort;

  }

  initiateColumns() {
    let o1: Observable<boolean> = this.id.valueChanges;
    let o2: Observable<boolean> = this.name.valueChanges;
    let o3: Observable<boolean> = this.lastName.valueChanges;
    let o4: Observable<boolean> = this.dateOfBirth.valueChanges;
    let o5: Observable<boolean> = this.phone.valueChanges;
    let o6: Observable<boolean> = this.email.valueChanges;

    merge(o1, o2, o3, o4, o5, o6).subscribe(v => {

      this.columnDefinitions.map((col, index) => {
        col.hide = this.form.get([col['def']]).value;
      });
      localStorage.setItem('columnDefinitions', JSON.stringify(this.columnDefinitions));
    });
  }

  setDisplayedColumns() {
    this.columnDefinitions.forEach((col, index) => {
      col.index = index;
      this.displayedColumns[index] = col.def;
    });
    localStorage.setItem('columnDefinitions', JSON.stringify(this.columnDefinitions));
  }

  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columnDefinitions, this.previousIndex, index);
      this.setDisplayedColumns();
      localStorage.setItem('columnDefinitions', JSON.stringify(this.columnDefinitions));
    }
  }
}


