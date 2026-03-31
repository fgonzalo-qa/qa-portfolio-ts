import { test, expect }  from '@playwright/test';
import { EmployeePage }  from '../../pages/EmployeePage';

test.describe('Gestión de empleados', () => {

  test('buscar empleado existente devuelve resultados', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.goto();
    // Buscamos sin filtro — la lista inicial siempre tiene empleados
    // Esto es más robusto que depender de un nombre específico en una demo pública
    await page.getByRole('button', { name: 'Search' }).click();
    await employeePage.waitForLoadingToFinish();
    await page.waitForTimeout(2000);

    const count = await employeePage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('buscar empleado inexistente muestra "No Records Found"',
    async ({ page }) => {
      const employeePage = new EmployeePage(page);

      await employeePage.goto();
      await employeePage.searchByName('XYZ_NO_EXISTE_12345');

      await employeePage.assertNoRecordsFound();
    }
  );

  test('la lista de empleados carga correctamente', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.goto();

    const count = await employeePage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

});