import { test, expect }                from '@playwright/test';
import type {
  ApiUser,
  ApiUserResponse,
  ApiListResponse,
  LoginResponse,
} from '../../types';
import { API_BASE, REQRES_API_KEY } from '../../fixtures/testData';

// Headers requeridos por reqres.in desde su actualización
const API_HEADERS = {
  'x-api-key': REQRES_API_KEY,
  'Content-Type': 'application/json',
};

test.describe('API Testing — reqres.in', () => {

  test.describe('GET /users', () => {

    test('devuelve lista paginada con status 200', async ({ request }) => {
      const response = await request.get(`${API_BASE}/users?page=1`, {
        headers: API_HEADERS,
      });

      expect(response.status()).toBe(200);

      const body = await response.json() as ApiListResponse<{ id: number; email: string }>;
      expect(body.data).toBeDefined();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);
      expect(body.page).toBe(1);
    });

    test('usuario por ID devuelve datos con schema correcto', async ({ request }) => {
      const response = await request.get(`${API_BASE}/users/2`, {
        headers: API_HEADERS,
      });

      expect(response.status()).toBe(200);

      const body = await response.json() as { data: { id: number; email: string; first_name: string } };
      expect(typeof body.data.id).toBe('number');
      expect(typeof body.data.email).toBe('string');
      expect(typeof body.data.first_name).toBe('string');
      expect(body.data.id).toBe(2);
    });

    test('usuario inexistente devuelve 404', async ({ request }) => {
      const response = await request.get(`${API_BASE}/users/9999`, {
        headers: API_HEADERS,
      });
      expect(response.status()).toBe(404);
    });

  });

  test.describe('POST /users', () => {

    test('crear usuario devuelve 201 con ID asignado', async ({ request }) => {
      const newUser: ApiUser = { name: 'Juan QA', job: 'QA Engineer' };

      const response = await request.post(`${API_BASE}/users`, {
        headers: API_HEADERS,
        data: newUser,
      });

      expect(response.status()).toBe(201);

      const body = await response.json() as ApiUserResponse;
      expect(body.name).toBe(newUser.name);
      expect(body.job).toBe(newUser.job);
      expect(body.id).toBeDefined();
      expect(body.createdAt).toBeDefined();
    });

  });

  test.describe('POST /login', () => {

    test('credenciales válidas devuelven token', async ({ request }) => {
      const response = await request.post(`${API_BASE}/login`, {
        headers: API_HEADERS,
        data: {
          email:    'eve.holt@reqres.in',
          password: 'cityslicka',
        },
      });

      expect(response.status()).toBe(200);

      const body = await response.json() as LoginResponse;
      expect(body.token).toBeDefined();
      expect(typeof body.token).toBe('string');
    });

    test('login sin password devuelve 400 con mensaje de error', async ({ request }) => {
      const response = await request.post(`${API_BASE}/login`, {
        headers: API_HEADERS,
        data: { email: 'test@test.com' },
      });

      expect(response.status()).toBe(400);

      const body = await response.json() as { error: string };
      expect(body.error).toBeDefined();
    });

  });

  test.describe('DELETE /users', () => {

    test('eliminar usuario devuelve 204 sin body', async ({ request }) => {
      const response = await request.delete(`${API_BASE}/users/2`, {
        headers: API_HEADERS,
      });

      expect(response.status()).toBe(204);
    });

  });

});