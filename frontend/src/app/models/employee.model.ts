export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
