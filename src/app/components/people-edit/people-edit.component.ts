import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnInit {
  personForm!: FormGroup;
  personId: number | null = null;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  submitError: string | null = null;
  isNewPerson: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isNewPerson = idParam === 'new';
    
    if (!this.isNewPerson && idParam) {
      this.personId = parseInt(idParam, 10);
      this.loadPerson();
    }
  }

  initializeForm(): void {
    this.personForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hireDate: ['', Validators.required]
    });
  }

  loadPerson(): void {
    if (!this.personId) return;
    
    this.isLoading = true;
    this.peopleService.getPersonById(this.personId).subscribe({
      next: (person) => {
        this.personForm.patchValue(person);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading person:', error);
        this.router.navigate(['/people']);
      }
    });
  }

  onSubmit(): void {
    if (this.personForm.invalid || this.isSubmitting) {
      this.personForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const personData = this.personForm.value;
    
    const saveOperation = this.isNewPerson
      ? this.peopleService.addPerson(personData)
      : this.peopleService.updatePerson({ ...personData, id: this.personId! });

    saveOperation.subscribe({
      next: () => {
        this.router.navigate(['/people']);
      },
      error: (error) => {
        console.error('Error saving person:', error);
        this.submitError = 'Failed to save person. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.personForm.get(fieldName);
    
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number (e.g., 555-123-4567)';
      }
    }
    
    return '';
  }
}