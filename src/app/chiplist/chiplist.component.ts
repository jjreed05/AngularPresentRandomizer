import { person } from './../../types/types';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chiplist',
  templateUrl: './chiplist.component.html',
  styleUrls: ['./chiplist.component.sass']
})
export class ChiplistComponent {

  @Input('people') people: person[];
  @Output() deletionEvent = new EventEmitter<person[]>();

  constructor() {
    this.people = [];
  }

  removePerson(name: string): void {
    this.people = this.people.filter((person: person) => {
      if (person.name === name
			|| (person.significantOther && person.significantOther === name)) {
        return false;
      } else {
        return true;
      }
    })
    this.deletionEvent.emit(this.people);
  }

}
