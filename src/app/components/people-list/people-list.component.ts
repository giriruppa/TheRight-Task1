import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  filteredPeople: Person[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.peopleService.getAllPeople().subscribe({
      next: (people) => {
        this.people = people;
        this.filteredPeople = [...people];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading people:', error);
        this.isLoading = false;
      }
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPeople = [...this.people];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredPeople = this.people.filter(person => 
        person.firstName.toLowerCase().includes(term) || 
        person.lastName.toLowerCase().includes(term) || 
        person.email.toLowerCase().includes(term) ||
        person.department.toLowerCase().includes(term) ||
        person.position.toLowerCase().includes(term)
      );
    }
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredPeople.sort((a: any, b: any) => {
      const valueA = a[column]?.toLowerCase();
      const valueB = b[column]?.toLowerCase();
      
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return '↕️';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  confirmDelete(person: Person, event: Event): void {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete ${person.firstName} ${person.lastName}?`)) {
      this.peopleService.deletePerson(person.id).subscribe({
        next: () => {
          this.loadPeople();
        },
        error: (error) => {
          console.error('Error deleting person:', error);
        }
      });
    }
  }
}