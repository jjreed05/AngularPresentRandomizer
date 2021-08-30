import { assignment } from './../../types/types';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'assignee' ];

  @Input('assignments') assignments: assignment[];

  constructor() {
    this.assignments = [];
  }

  ngOnInit(): void {
  }

}
