import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee, ApiResponse } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  /** Get all employees */
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<ApiResponse<Employee[]>>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /** Get employee by ID */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /** Create new employee */
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<ApiResponse<Employee>>(this.apiUrl, employee).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /** Update existing employee */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<ApiResponse<Employee>>(`${this.apiUrl}/${id}`, employee).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /** Delete employee by ID */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(() => void 0),
      catchError(this.handleError)
    );
  }

  /** Handle HTTP errors */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 400: errorMessage = 'Invalid request data.'; break;
          case 404: errorMessage = 'Employee not found.'; break;
          case 409: errorMessage = 'Email already exists.'; break;
          case 500: errorMessage = 'Server error. Please try again later.'; break;
        }
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
