import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: Person[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      department: 'Engineering',
      position: 'Software Developer',
      hireDate: '2020-03-15'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-987-6543',
      department: 'Marketing',
      position: 'Marketing Manager',
      hireDate: '2019-06-22'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phone: '555-456-7890',
      department: 'Finance',
      position: 'Financial Analyst',
      hireDate: '2021-01-10'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Williams',
      email: 'emily.williams@example.com',
      phone: '555-789-0123',
      department: 'Human Resources',
      position: 'HR Specialist',
      hireDate: '2018-11-05'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      phone: '555-234-5678',
      department: 'Engineering',
      position: 'DevOps Engineer',
      hireDate: '2020-09-30'
    }
  ];

  constructor() { }

  // Simulate API delay
  private simulateDelay<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }

  getAllPeople(): Observable<Person[]> {
    return this.simulateDelay([...this.people]);
  }

  getPersonById(id: number): Observable<Person> {
    const person = this.people.find(p => p.id === id);
    if (person) {
      return this.simulateDelay({...person});
    }
    return throwError(() => new Error(`Person with id ${id} not found`));
  }

  addPerson(person: Omit<Person, 'id'>): Observable<Person> {
    const newId = Math.max(0, ...this.people.map(p => p.id)) + 1;
    const newPerson = { ...person, id: newId };
    this.people.push(newPerson);
    return this.simulateDelay({...newPerson});
  }

  updatePerson(person: Person): Observable<Person> {
    const index = this.people.findIndex(p => p.id === person.id);
    if (index !== -1) {
      this.people[index] = { ...person };
      return this.simulateDelay({...person});
    }
    return throwError(() => new Error(`Person with id ${person.id} not found`));
  }

  deletePerson(id: number): Observable<void> {
    const index = this.people.findIndex(p => p.id === id);
    if (index !== -1) {
      this.people.splice(index, 1);
      return this.simulateDelay(void 0);
    }
    return throwError(() => new Error(`Person with id ${id} not found`));
  }
}