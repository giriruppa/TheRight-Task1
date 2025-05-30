import { Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleEditComponent } from './components/people-edit/people-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PeopleEditComponent },
  { path: 'people/edit/:id', component: PeopleEditComponent },
  { path: '**', redirectTo: 'people' }
];