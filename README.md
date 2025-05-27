# Transactions Microservice

Un microservicio robusto desarrollado en TypeScript para el registro transacciones digitales.

## 📋 Características

- **Registro de transacciones** - Registro de las transacciones generadas en el marketplace
- **API RESTful completa** - Endpoints para todas las operaciones CRUD
- **Persistencia en MySQL** - Almacenamiento seguro y eficiente de los datos
- **Containerizado con Docker** - Facilidad de despliegue en cualquier entorno

## 🚀 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Docker y Docker Compose (opcional, para entorno containerizado)

### Configuración Local

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd transactions-ms
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo:

```
# Database configuration
DB_HOST=db-transactions
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=transaction_db

# Server configuration
PORT=3000
NODE_ENV=development
```

4. **Iniciar el servidor en modo desarrollo**

```bash
npm run dev
```

### Usando Docker

1. **Construir y levantar los contenedores**

```bash
docker-compose up -d
```

Este comando iniciará tanto el microservicio como la base de datos MySQL.

## 🛠️ Arquitectura

El microservicio sigue una arquitectura en capas:

```
transactions-ms/
├── src/
│   ├── controllers/     # Manejo de peticiones HTTP
│   ├── datasource/      # Configuración de conexión a base de datos
│   ├── entity/          # Definición de entidades y modelos
│   ├── routes/          # Definición de rutas de la API
│   ├── services/        # Lógica de negocio
│   └── index.ts         # Punto de entrada de la aplicación
```

## 📡 API Endpoints

### Prevención de Fraude

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/transactions` | Obtener todas las prevenciones de fraude 
| POST | `/api/transactions` | Crear nuevo registro de prevención de fraude |
| PUT | `/api/transactions/:id` | Actualizar un registro existente |
| DELETE | `/api/transactions/:id` | Eliminar un registro |

### Salud del Servicio

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Verificar el estado del servicio |

## 📥 Ejemplos de Uso

### Crear una nueva verificación de fraude

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 999.900,
    "type": "payment",
    "description": "Initial account funding",
    "sourceAccount": "ACC1234567890",
    "destinationAccount": "ACC1234567890",
    "status": "pending",
    "userId": "1019035999",
    "orderId": "051925005",
    "referenceNumber": "ORD051925-001",
    "currency": "COP"
    }
  }'
```

## 📊 Modelo de Datos

La entidad principal `Transaction` contiene:

- `id`: Identificador único (UUID)
- `amount`: Monto de la transaccion
- `type`: Tipo de la transaccion
- `description`: Tipo de la transaccion
- `sourceAccount`: Cuenta Origen de la transaccion
- `destinationAccount`: Cuenta Destino de la transaccion
- `status`: Estado de la transaccion
- `referenceNumber`: Referencia de la transaccion
- `currency`: Moneda de la transaccion
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de actualización

## 🧪 Tests

Para ejecutar las pruebas:

```bash
npm run test
```

## 🔄 Ciclo de Desarrollo

1. **Compilar TypeScript**

```bash
npm run build
```

2. **Lint del código**

```bash
npm run lint
```

3. **Ejecutar servidor compilado**

```bash
npm start
```

## 🚢 Despliegue

### En Producción

1. Configurar variables de entorno para producción
2. Construir la imagen Docker:

```bash
docker build -t transactions-ms:latest .
```

3. Ejecutar con la configuración adecuada:

```bash
docker run -p 3000:3000 --env-file .env.production transactions-ms:latest
```

## 📚 Documentación Adicional

Para una documentación interactiva de la API, considera implementar Swagger:

```bash
# TODO: Agregar instrucciones para configurar Swagger
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo [LICENCIA] - ver el archivo LICENSE.md para más detalles.

## 📞 Contacto

[Nombre del equipo/desarrollador] - [email]

---

Desarrollado con ❤️ por SID-EAFIT
