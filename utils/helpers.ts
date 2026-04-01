// Funciones utilitarias reutilizables en cualquier test

// Genera una cadena aleatoria — útil para crear datos únicos en tests
export function randomString(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Genera un nombre de empleado único para evitar colisiones entre tests
export function uniqueEmployeeName(): { firstName: string; lastName: string } {
  return {
    firstName: `Test${randomString(4)}`,
    lastName:  `QA${randomString(4)}`,
  };
}

// Formatea una fecha como YYYY-MM-DD (formato que espera OrangeHRM)
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Devuelve una fecha N días en el futuro
export function futureDateString(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return formatDate(d);
}