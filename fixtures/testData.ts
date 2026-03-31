import type { User, Employee, LeaveRequest } from '../types';

// Usuarios de OrangeHRM demo (credenciales públicas)
export const USERS: Record<string, User> = {
  admin: {
    username: 'Admin',
    password: 'admin123',
  },
  invalid: {
    username: 'usuario_inexistente',
    password: 'contrasena_incorrecta',
  },
};

export const EMPLOYEES: Record<string, Employee> = {
  new: {
    firstName: 'Juan',
    lastName:  'Pérez',
  },
  // Usamos un nombre genérico que siempre existe en OrangeHRM demo
  search: {
    firstName: 'John',
    lastName:  'Smith',
  },
};

export const LEAVE_REQUESTS: Record<string, LeaveRequest> = {
  valid: {
    leaveType: 'Annual Leave',
    fromDate:  '2025-08-01',
    toDate:    '2025-08-05',
    comment:   'Vacaciones planificadas',
  },
};

// URL base de la app demo
export const BASE_URL = 'https://opensource-demo.orangehrmlive.com';
export const API_BASE  = 'https://reqres.in/api';
export const REQRES_API_KEY = 'reqres_b1fce2beb4894453aae3af471f07d4a1';