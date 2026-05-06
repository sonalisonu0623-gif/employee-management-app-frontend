<div class="page-container">

  <!-- Header -->
  <div class="page-header">
    <a routerLink="/employees" class="back-link">← Back to List</a>
    <h1>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h1>
    <p class="subtitle">{{ isEditMode ? 'Update employee information below' : 'Fill in the details to add a new employee' }}</p>
  </div>

  <!-- Loading -->
  <div class="loading-container" *ngIf="isLoading">
    <div class="spinner"></div>
    <p>Loading employee data...</p>
  </div>

  <!-- Success Message -->
  <div class="alert alert-success" *ngIf="successMessage">
    <span>✓</span> {{ successMessage }}
  </div>

  <!-- Error Message -->
  <div class="alert alert-error" *ngIf="errorMessage">
    <span>✕</span> {{ errorMessage }}
  </div>

  <!-- Form -->
  <div class="form-card" *ngIf="!isLoading">
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" novalidate>

      <!-- Name -->
      <div class="form-group" [class.has-error]="isFieldInvalid('name')">
        <label for="name" class="form-label">Full Name <span class="required">*</span></label>
        <input
          id="name"
          type="text"
          class="form-control"
          formControlName="name"
          placeholder="e.g. Rahul Sharma"
          autocomplete="name"
        />
        <div class="error-message" *ngIf="isFieldInvalid('name')">
          {{ getFieldError('name') }}
        </div>
      </div>

      <!-- Email -->
      <div class="form-group" [class.has-error]="isFieldInvalid('email')">
        <label for="email" class="form-label">Email Address <span class="required">*</span></label>
        <input
          id="email"
          type="email"
          class="form-control"
          formControlName="email"
          placeholder="e.g. rahul@company.com"
          autocomplete="email"
        />
        <div class="error-message" *ngIf="isFieldInvalid('email')">
          {{ getFieldError('email') }}
        </div>
      </div>

      <!-- Department -->
      <div class="form-group" [class.has-error]="isFieldInvalid('department')">
        <label for="department" class="form-label">Department <span class="required">*</span></label>
        <input
          id="department"
          type="text"
          class="form-control"
          formControlName="department"
          placeholder="e.g. Engineering, Marketing, HR"
        />
        <div class="error-message" *ngIf="isFieldInvalid('department')">
          {{ getFieldError('department') }}
        </div>
      </div>

      <!-- Salary -->
      <div class="form-group" [class.has-error]="isFieldInvalid('salary')">
        <label for="salary" class="form-label">Annual Salary (₹) <span class="required">*</span></label>
        <input
          id="salary"
          type="number"
          class="form-control"
          formControlName="salary"
          placeholder="e.g. 800000"
          min="1"
        />
        <div class="error-message" *ngIf="isFieldInvalid('salary')">
          {{ getFieldError('salary') }}
        </div>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <a routerLink="/employees" class="btn btn-cancel">Cancel</a>
        <button type="submit" class="btn btn-submit" [disabled]="isSubmitting">
          <span class="spinner-inline" *ngIf="isSubmitting"></span>
          {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Create Employee') }}
        </button>
      </div>

    </form>
  </div>

</div>
