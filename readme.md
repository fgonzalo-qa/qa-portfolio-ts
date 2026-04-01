# QA Automation Portfolio — Playwright + TypeScript

Framework de testing automatizado end-to-end con TypeScript, diseñado
como portfolio profesional para posiciones de QA Engineer senior.

## Stack
| Herramienta | Rol |
|---|---|
| Playwright | E2E + API testing |
| TypeScript | Tipado estricto |
| GitHub Actions | CI/CD pipeline |
| Allure | Reportes visuales |
| OrangeHRM demo | App bajo prueba (HR management) |
| reqres.in | API REST de demo |

## Cómo correr localmente
```bash
npm install
npx playwright install

npm test               # todos los tests
npm run test:e2e       # solo E2E
npm run test:api       # solo API
npm run test:headed    # con browser visible
npm run report         # abre el reporte HTML
```

## Patrones implementados

- **Page Object Model** con clase base `BasePage`
- **Custom fixtures** para reutilizar estado de sesión
- **Tipado estricto** con interfaces en `types/index.ts`
- **Separación de datos** en `fixtures/testData.ts`
- **CI/CD** con GitHub Actions y publicación de reporte en GitHub Pages
- **Multi-browser**: Chromium, Firefox y Mobile Chrome

## Ver reporte en vivo
[Playwright Report](https://TU_USUARIO.github.io/qa-portfolio-ts)