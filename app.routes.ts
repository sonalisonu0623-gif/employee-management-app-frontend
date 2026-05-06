<div class="page-container">

  <!-- Header -->
  <div class="page-header">
    <div class="header-text">
      <h1>Employee Management</h1>
      <p class="subtitle">Manage your team members</p>
    </div>
    <a routerLink="/employees/new" class="btn btn-primary">
      + Add Employee
    </a>
  </div>

  <!-- Success Message -->
  <div class="alert alert-success" *ngIf="successMessage">
    <span class="alert-icon">✓</span>
    {{ successMessage }}
  </div>

  <!-- Error Message -->
  <div class="alert alert-error" *ngIf="errorMessage">
    <span class="alert-icon">✕</span>
    {{ errorMessage }}
  </div>

  <!-- Loading State -->
  <div class="loading-container" *ngIf="isLoading">
    <div class="spinner"></div>
    <p>Loading employees...</p>
  </div>

  <!-- Empty State -->
  <div class="empty-state" *ngIf="!isLoading && employees.length === 0 && !errorMessage">
    <div class="empty-icon">👥</div>
    <h3>No employees found</h3>
    <p>Get started by adding your first employee.</p>
    <a routerLink="/employees/new" class="btn btn-primary">Add First Employee</a>
  </div>

  <!-- Employee Table -->
  <div class="table-wrapper" *ngIf="!isLoading && employees.length > 0">
    <div class="table-meta">
      <span class="record-count">{{ employees.length }} employee{{ employees.length !== 1 ? 's' : '' }}</span>
    </div>
    <table class="employee-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let emp of employees; let i = index" class="table-row">
          <td class="row-index">{{ i + 1 }}</td>
          <td class="employee-name">
            <div class="name-avatar">
              <span class="avatar">{{ emp.name.charAt(0).toUpperCase() }}</span>
              {{ emp.name }}
            </div>
          </td>
          <td class="employee-email">{{ emp.email }}</td>
          <td>
            <span class="department-badge">{{ emp.department }}</span>
          </td>
          <td class="employee-salary">{{ emp.salary | currency:'INR':'symbol':'1.0-0' }}</td>
          <td class="actions-cell">
            <a [routerLink]="['/employees/edit', emp.id]" class="btn btn-edit">Edit</a>
            <button class="btn btn-delete" (click)="deleteEmployee(emp.id!, emp.name)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
