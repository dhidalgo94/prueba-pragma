# Prueba Técnica - Pragma

## Preparación del ambiente

### 1. Base de datos
Para este proyecto se utilizó SQL Server Express para el almacenamiento de datos.
En caso de usar SQL Server se deberá ajustar el ConnectionString.

Crear nueva base de datos con el nombre devDB (puede ser otro pero se deberá cambiar el ConnectionString).

Ejecutar script adjuntado apuntando a la nueva base de datos creada.

### 2. Backend 
Abrir visual studio 2022 y seleccionar abrir solución, luego seleccionar UserApi.
Ejecutar la solución.

### 3. Frontend
Abrir terminal en la carpeta del proyecto e ingresar el comando 'npm install'
Verificar que la API se esté ejecutando en el mismo puerto que se especifica en el archivo src/config.js
Para ejecutar la aplicación web ingresar el comando 'npm run dev'


## Tecnologías utilizadas
React 18.0.18

.NET 6 con EntityFramework

SQL Server Express

### Librerías externas para el Frontend
Bootstrap para aspectos visuales

date-fns para formato de fechas

react-csv para exportar datos y descargar archivo .csv

react-datepicker para seleccionar fecha en formulario