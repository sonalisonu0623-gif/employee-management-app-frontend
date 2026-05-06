import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  isLoading = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      salary: [null, [Validators.required, Validators.min(1)]]
    });
  }

  private loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    const employeeData: Employee = this.employeeForm.value;

    const request$ = this.isEditMode && this.employeeId
      ? this.employeeService.updateEmployee(this.employeeId, employeeData)
      : this.employeeService.createEmployee(employeeData);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = this.isEditMode
          ? 'Employee updated successfully!'
          : 'Employee created successfully!';
        setTimeout(() => this.router.navigate(['/employees']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSubmitting = false;
      }
    });
  }

  // Convenience getters for template access
  get f() { return this.employeeForm.controls; }

  isFieldInvalid(field: string): boolean {
    const control = this.f[field];
    return control.invalid && (control.dirty || control.touched);
  }

  getFieldError(field: string): string {
    const control = this.f[field];
    if (!control.errors) return '';

    if (control.errors['required']) return `${this.getLabel(field)} is required.`;
    if (control.errors['email']) return 'Please enter a valid email address.';
    if (control.errors['minlength']) return `${this.getLabel(field)} must be at least ${control.errors['minlength'].requiredLength} characters.`;
    if (control.errors['maxlength']) return `${this.getLabel(field)} must be at most ${control.errors['maxlength'].requiredLength} characters.`;
    if (control.errors['min']) return `Salary must be greater than 0.`;

    return 'Invalid value.';
  }

  private getLabel(field: string): string {
    const labels: Record<string, string> = {
      name: 'Name', email: 'Email', department: 'Department', salary: 'Salary'
    };
    return labels[field] || field;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
