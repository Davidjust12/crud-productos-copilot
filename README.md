# API REST de productos

API REST sencilla construida con NestJS 12 y TypeScript. Gestiona productos en memoria, sin base de datos. Los datos se reinician al detener el servidor.

## Requisitos

- Node.js 20.11 o superior (probado con Node.js 24.18.0).
- npm (probado con npm 11.16.0).

## Instalación y ejecución

Desde PowerShell, en la carpeta del proyecto:

```powershell
npm install
npm run start:dev
```

El servidor queda disponible en `http://localhost:3000`. Para usar otro puerto, establece la variable `PORT`.

Para compilar y ejecutar en modo producción:

```powershell
npm run build
npm run start:prod
```

La compilación genera `dist/main.js`. `tsconfig.build.json` desactiva la compilación incremental para evitar que Nest elimine `dist` sin volver a generar el punto de entrada.

## Modelo y validación

Un producto tiene la forma:

```json
{
  "id": 1,
  "nombre": "Rosa",
  "precio": 12.5,
  "cantidad": 10
}
```

El `id` se genera automáticamente. `nombre` debe ser texto no vacío, `precio` debe ser un número no negativo con hasta dos decimales y `cantidad` un entero no negativo. Las propiedades adicionales o los datos inválidos se rechazan con `400 Bad Request`.

## Endpoints

| Método | Ruta | Descripción | Respuesta correcta |
| --- | --- | --- | --- |
| `POST` | `/productos` | Crear producto | `201 Created` |
| `GET` | `/productos` | Listar productos (`/productos/` también funciona) | `200 OK` |
| `GET` | `/productos/:id` | Consultar producto | `200 OK` |
| `PUT` | `/productos/:id` | Reemplazar todos sus campos | `200 OK` |
| `PATCH` | `/productos/:id` | Actualizar campos enviados | `200 OK` |
| `DELETE` | `/productos/:id` | Eliminar producto | `204 No Content` |

Las rutas de un producto responden `404 Not Found` si el ID no existe y `400 Bad Request` si el ID no es un entero. `PUT` requiere `nombre`, `precio` y `cantidad`; `PATCH` acepta uno o más de esos campos.

### Ejemplos con PowerShell

```powershell
$producto = Invoke-RestMethod -Method Post `
  -Uri http://localhost:3000/productos `
  -ContentType 'application/json' `
  -Body '{"nombre":"Rosa","precio":12.5,"cantidad":10}'

Invoke-RestMethod -Method Get -Uri http://localhost:3000/productos
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/productos/$($producto.id)"
```

También se incluye una colección importable en Postman: [`postman/CRUD-Productos.postman_collection.json`](postman/CRUD-Productos.postman_collection.json).

## Pruebas

```powershell
npm test
npm run test:e2e
```
