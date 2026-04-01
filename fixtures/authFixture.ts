import { test as base, expect } from '@playwright/test';

// El fixture ya no hace login — storageState en playwright.config se encarga
// Lo mantenemos para compatibilidad con los imports existentes
export const test = base;
export { expect };