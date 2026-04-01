// Tipado estricto de todos los datos del framework
// TypeScript obliga a que los datos sean correctos antes de correr los tests

export interface User {
  username: string;
  password: string;
}

export interface Employee {
  firstName: string;
  lastName:  string;
  employeeId?: string;
}

export interface LeaveRequest {
  leaveType:   string;
  fromDate:    string;
  toDate:      string;
  comment?:    string;
}

export interface ApiUser {
  name: string;
  job:  string;
}

export interface ApiUserResponse extends ApiUser {
  id:        string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
}

// Tipo para los resultados de la API de lista
export interface ApiListResponse<T> {
  page:         number;
  per_page:     number;
  total:        number;
  total_pages:  number;
  data:         T[];
}