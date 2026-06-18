# Portal IFTS 29 - Backend

API REST para el sistema de gestión de reclamos estudiantiles del IFTS N°29.

## Tecnologías

- **Node.js** con **Express 5**
- **TypeORM** como ORM
- **PostgreSQL** como base de datos
- **JWT** para autenticación
- **bcrypt** para hash de contraseñas

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/download/) v14 o superior

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/LautaroColella/portal-ifts29-back.git
cd portal-ifts29-back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

Abrir una terminal de PostgreSQL (`psql`) y ejecutar:

```sql
CREATE DATABASE portal_ifts29;
```

### 4. Configurar variables de entorno

Copiar el archivo de ejemplo y ajustar los valores según tu entorno local:

```bash
copy .env_example .env
```

Contenido del `.env`:

| Variable      | Descripción                                          | Valor por defecto         |
|---------------|------------------------------------------------------|---------------------------|
| `NODE_ENV`    | Entorno de ejecución (`development` / `production`)  | `development`             |
| `PORT`        | Puerto del servidor                                  | `3000`                    |
| `DEBUG`       | Habilitar logs detallados                            | `false`                   |
| `DB_HOST`     | Host de PostgreSQL                                   | `localhost`               |
| `DB_PORT`     | Puerto de PostgreSQL                                 | `5432`                    |
| `DB_USER`     | Usuario de PostgreSQL                                | `postgres`                |
| `DB_PASSWORD` | Contraseña de PostgreSQL                             | _(configurar)_            |
| `DB_NAME`     | Nombre de la base de datos                           | `portal_ifts29`           |
| `JWT_SECRET`  | Clave secreta para firmar tokens JWT                 | _(configurar)_            |
| `CORS_ORIGIN` | Orígenes permitidos (separados por coma)             | `http://localhost:5173`   |

### 5. Cargar datos de prueba

Ejecutar script SQL con los datos de prueba:

```bash
psql -U postgres -d portal_ifts29 -f scripts/seed.sql
```

El seed carga 12 usuarios, 30 reclamos de ejemplo con comentarios, mensajes, historial y notificaciones.

**Credenciales de prueba** (contraseña: `Password123!` para todos):

| Email | Rol |
|---|---|
| `admin@admin.com` | ADMIN |
| `management@management.com` | MANAGEMENT |
| `staff@staff.com` | STAFF (Tutor) |
| `student@student.com` | STUDENT |

Usuarios adicionales: `staff2@staff.com`, `staff.bedel@staff.com`, `staff.tech@staff.com`, `staff.coord@staff.com`, `student2@student.com` a `student5@student.com`. Todos usan la misma contraseña `Password123!`.

### 6. Iniciar el servidor

En modo desarrollo (con recarga automática):

```bash
npm run dev
```

En modo producción:

```bash
npm start
```

El servidor se levanta en `http://localhost:3000`.

> Al iniciar en modo `development`, TypeORM sincroniza automáticamente las tablas con las entidades definidas en el código.

## Estructura del proyecto

```
src/
├── config/          # Configuración de TypeORM (data-source)
├── entities/        # Entidades/modelos de la base de datos
├── middlewares/     # Middlewares (auth, errores, autorización)
├── repositories/    # Consultas a la base de datos
├── routes/          # Definición de rutas de la API
├── services/        # Lógica de negocio
└── index.js         # Punto de entrada de la aplicación
```

## Endpoints principales

| Método | Ruta                      | Descripción                  | Autenticación |
|--------|---------------------------|------------------------------|---------------|
| POST   | `/api/auth/login`         | Iniciar sesión               | No            |
| GET    | `/api/auth/me`            | Obtener usuario autenticado  | Sí            |
| GET    | `/api/tickets`            | Listar tickets               | Sí            |
| POST   | `/api/tickets`            | Crear ticket                 | Sí            |
| GET    | `/api/tickets/:id`        | Detalle de un ticket         | Sí            |
| PATCH  | `/api/tickets/:id`        | Actualizar ticket            | Sí            |
| GET    | `/api/users`              | Listar usuarios              | Sí (Admin)    |
| POST   | `/api/users`              | Crear usuario                | Sí (Admin)    |
| GET    | `/api/dashboard/metrics`  | Métricas del dashboard       | Sí            |
| GET    | `/api/notifications`      | Listar notificaciones        | Sí            |

## Roles

| Rol          | Descripción                           |
|--------------|---------------------------------------|
| `STUDENT`    | crea y ve sus reclamos   |
| `STAFF`      | gestiona reclamos asignados|
| `MANAGEMENT` | ve métricas y reportes   |
| `ADMIN`      | acceso total          |