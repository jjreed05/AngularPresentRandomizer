import { ChiplistComponent } from './../chiplist/chiplist.component';
import { person, assignment } from './../../types/types';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  people: person[];
  displayForm: boolean;
  isCouple: boolean;
  isError: boolean;
  assignments: assignment[];

  currentPerson1: string;
  currentPerson2: string;

  constructor() {
    this.people = [];
    this.displayForm = true;
    this.isCouple = false;
    this.currentPerson1 = "";
    this.currentPerson2 = "";
    this.isError = false;
    this.assignments = [];
  }

  ngOnInit(): void {
  }


  setDisplayForm(): void {
    this.displayForm = true;
  }

  setIsCouple(): void  {
    this.isCouple = !this.isCouple

    if (!this.isCouple) {
      this.currentPerson2 = "";
    }
  }

  setCurrentPerson(person: 1 | 2, e: any): void {
    if (person === 1) {
      this.currentPerson1 = e.target.value
    }
    else if (person === 2) {
      this.currentPerson2 = e.target.value
    }
  }

  addPerson(): void {
    if (!this.isCouple && this.currentPerson1.length > 0) {
      this.people.push({
        name: this.currentPerson1
      })
      this.currentPerson1 = ""
      this.isError = false;
    }
    else if (this.isCouple
      && this.currentPerson1.length > 0
      && this.currentPerson2.length > 0)
    {
      this.people.push({
        name: this.currentPerson1,
        significantOther: this.currentPerson2
      })

      this.people.push({
        name: this.currentPerson2,
        significantOther: this.currentPerson1
      })

      this.currentPerson1 = "";
      this.currentPerson2 = "";
      this.isError = false;
    }
    else {
      this.isError = true
    }
  }

  showGenerateButton(): boolean {
    let hasCouple = false;
    for (let person of this.people) {
      if(person.significantOther) {
        hasCouple = true
        break;
      }
    }

    if (!hasCouple && this.people.length > 2) {
      return true;
    }
    else if (hasCouple && this.people.length > 3) {
      return true;
    }
    else {
      return false;
    }
  }

  receivePeople($event: person[]) {
    this.people = $event;
  }

  generateAssignments(): void {
    this.assignments = [];
    this.people.forEach((element, index) => {
      const filteredPeople = this.people.filter((person) =>
        element.name !== person.name &&
        !this.assignments.find((assigned) => assigned.assignee === person.name) &&
        !(element.significantOther && element.significantOther === person.name )
      )
      const randomInt = Math.floor(Math.random() * filteredPeople.length);
      if (filteredPeople.length !== 0) {
        const assignment: assignment = {
          assignee: filteredPeople[randomInt].name,
          name: element.name,
          position: index + 1
        }
        this.assignments.push(assignment);
      } else {
        this.generateAssignments();
      }
    });
  }
}
