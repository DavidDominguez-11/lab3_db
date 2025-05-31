## Instalación y Ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/DavidDominguez-11/lab3_db.git
```

2. Entrar al directorio del proyecto y levantar los contenedores:
```bash
cd lab3_db
docker-compose up --build
```

3. Configurar la base de datos y llenar datos iniciales:
```bash
cd backend
npx prisma migrate dev --name init 
npm run seed
npm start
```

4. Abrir en el navegador (recomendado Google Chrome):
```
http://localhost:8080
```

5. Para detener la aplicación:
- Donde corre el backend: `Ctrl + C`  

- Donde corre docker compose: `Ctrl + C`
- Donde corre docker compose: `docker-compose down`

## Endpoints

### 👤 Usuarios

#### Obtener todos los usuarios (con hábitos)
```http
GET /usuarios
```
**Respuesta:**
```json
[
    {
        "id": 1,
        "nombre": "Usuario 1",
        "email": "usuario1@correo.com",
        "fecha_registro": "2025-05-30T04:48:34.985Z",
        "registrosHabito": [
            {
                "id": 11,
                "usuarioId": 1,
                "habitoId": 2,
                "fecha": "2025-05-30T22:19:27.725Z",
                "progreso": { "meta": 30, "dias_consecutivos": 5 }
            },
            {
                "id": 1,
                "usuarioId": 1,
                "habitoId": 1,
                "fecha": "2025-05-30T04:48:35.053Z",
                "progreso": { "meta": 30, "dias_consecutivos": 6 }
            }
        ]
    }
]
```

#### Obtener usuario específico
```http
GET /usuarios/:id
```
**Respuesta:**
```json
{
    "id": 1,
    "nombre": "Usuario 1",
    "email": "usuario1@correo.com",
    "fecha_registro": "2025-05-30T04:48:34.985Z",
    "registrosHabito": [
        {
            "id": 11,
            "usuarioId": 1,
            "habitoId": 2,
            "fecha": "2025-05-30T22:19:27.725Z",
            "progreso": { "meta": 30, "dias_consecutivos": 5 }
        }
    ]
}
```

#### Crear nuevo usuario
```http
POST /usuarios
```
**Solicitud:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "habitos": [
    { "habitoId": 1, "progreso": {"dias_consecutivos": 3} }
  ]
}
```

#### Actualizar usuario
```http
PUT /usuarios/:id
```
**Solicitud:**
```json
{
  "nombre": "Nuevo Nombre",
  "email": "nuevoemail@example.com"
}
```

#### Eliminar usuario
```http
DELETE /usuarios/:id
```

---

### 🏆 Retos

#### Obtener todos los retos
```http
GET /retos
```
**Respuesta:**
```json
[
    {
        "id": 2,
        "nombre": "Reto 2",
        "fecha_inicio": "2025-05-28T04:48:35.101Z",
        "fecha_fin": "2025-06-10T04:48:35.101Z",
        "participaciones": [
            {
                "id": 2,
                "usuarioId": 2,
                "retoId": 2,
                "completado": false,
                "usuario": {
                    "id": 2,
                    "nombre": "Usuario 2",
                    "email": "usuario2@correo.com",
                    "fecha_registro": "2025-05-30T04:48:34.985Z"
                }
            }
        ]
    }
]
```

#### Obtener reto específico
```http
GET /retos/:id
```
**Respuesta:** (Igual estructura que GET /retos)

#### Crear nuevo reto
```http
POST /retos
```
**Solicitud:**
```json
{
  "nombre": "Reto de lectura",
  "fecha_inicio": "2023-11-01T00:00:00Z",
  "fecha_fin": "2023-11-30T00:00:00Z",
  "participaciones": [
    { "usuarioId": 1, "completado": false }
  ]
}
```

#### Actualizar reto
```http
PUT /retos/:id
```
**Solicitud:**
```json
{
  "nombre": "Reto de lectura extendido",
  "fecha_fin": "2023-12-15T00:00:00Z"
}
```

#### Eliminar reto
```http
DELETE /retos/:id
```

---

### 🔁 Hábitos

#### Obtener todos los hábitos
```http
GET /habitos
```
**Respuesta:**
```json
[
    { "id": 1, "nombre": "Beber agua", "dificultad": "Facil" }
]
```

#### Obtener hábito específico
```http
GET /habitos/:id
```
**Respuesta:**
```json
{ "id": 1, "nombre": "Beber agua", "dificultad": "Facil" }
```

#### Crear nuevo hábito
```http
POST /habitos
```
**Solicitud:**
```json
{ "nombre": "Leer 10 páginas", "dificultad": "Facil" }
```

#### Actualizar hábito
```http
PUT /habitos/:id
```
**Solicitud:**
```json
{ "nombre": "Leer 15 páginas", "dificultad": "Medio" }
```

#### Eliminar hábito
```http
DELETE /habitos/:id
```

---

### 📝 Registros de Hábitos

#### Crear nuevo registro
```http
POST /registros-habitos
```
**Solicitud:**
```json
{
  "usuarioId": 1,
  "habitoId": 2,
  "progreso": {"dias_consecutivos": 5, "meta": 30}
}
```

#### Obtener registros por usuario
```http
GET /registros-habitos/usuario/:usuarioId
```
**Respuesta:**
```json
[
    {
        "id": 11,
        "usuarioId": 1,
        "habitoId": 2,
        "fecha": "2025-05-30T22:19:27.725Z",
        "progreso": { "meta": 30, "dias_consecutivos": 5 },
        "habito": {
            "id": 2,
            "nombre": "Leer 20 min",
            "dificultad": "Medio"
        }
    }
]
```

#### Actualizar registro
```http
PUT /registros-habitos/:id
```
**Solicitud:**
```json
{ "progreso": {"dias_consecutivos": 6, "meta": 30} }
```

#### Eliminar registro
```http
DELETE /registros-habitos/:id
```

---

### 🎯 Participaciones en Retos

#### Unirse a un reto
```http
POST /participaciones
```
**Solicitud:**
```json
{ "usuarioId": 1, "retoId": 3 }
```

#### Obtener participantes de reto
```http
GET /participaciones/reto/:retoId
```
**Respuesta:**
```json
[
    {
        "id": 1,
        "usuarioId": 1,
        "retoId": 1,
        "completado": false,
        "usuario": {
            "id": 1,
            "nombre": "Usuario 1",
            "email": "usuario1@correo.com",
            "fecha_registro": "2025-05-30T04:48:34.985Z"
        }
    }
]
```

#### Marcar reto como completado
```http
PUT /participaciones/:id
```
**Solicitud:**
```json
{ "completado": true }
```

#### Abandonar reto
```http
DELETE /participaciones/:id
```

### 👁️ Vistas

#### Obtener vista de registros de hábitos
```http
GET /vistas/registro-habitos
```
**Respuesta:**
```json
[
    {
        "registro_id": 1,
        "usuario_id": 1,
        "usuario_nombre": "Usuario 1",
        "habito_id": 1,
        "habito_nombre": "Beber agua",
        "habito_dificultad": "Facil",
        "fecha": "2025-05-30T23:00:49.345Z",
        "progreso": {
            "meta": 30,
            "dias_consecutivos": 1
        }
    }
]
```

#### Obtener vista de participaciones en retos
```http
GET /vistas/participacion-retos
```
**Respuesta:**
```json
[
    {
        "participacion_id": 1,
        "usuario_id": 1,
        "usuario_nombre": "Usuario 1",
        "reto_id": 1,
        "reto_nombre": "Reto 1",
        "fecha_inicio": "2025-05-29T23:00:49.368Z",
        "fecha_fin": "2025-06-09T23:00:49.368Z",
        "completado": true
    },
    {
        "participacion_id": 2,
        "usuario_id": 2,
        "usuario_nombre": "Usuario 2",
        "reto_id": 2,
        "reto_nombre": "Reto 2",
        "fecha_inicio": "2025-05-28T23:00:49.368Z",
        "fecha_fin": "2025-06-10T23:00:49.368Z",
        "completado": false
    }
]
```
