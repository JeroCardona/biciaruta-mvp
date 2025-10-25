## BiciRuta — MVP

### Flujo mínimo:

**1\) POST /reports  → crear incidente (lat, lon, type, note)**

**2\) GET /reports/near?lat=\&lon=\&radius=  → listar cercanos**



### Infraestructura / Despliegue:
La infraestructura desplegada corresponde a un entorno escalable, balanceado y contenerizado implementado en AWS, utilizando CloudFormation como herramienta de automatización (IaC).

**Componentes principales**
* Amazon EC2 Auto Scaling: administra las instancias de aplicación.
* Load Balancer: distribuye el tráfico entre las instancias EC2 del grupo del Auto Scaling.
* Amazon RDS: base de datos.
* Amazon S3: se implementó para almacenamiento de archivos estáticos, respaldos y/o registros del sistema.
* CloudFront: permite reducir la latencia entre la aplicacion y el usuario.

Para conocer el despliegue de la infraestructura, ver el README.md en la ruta infra/.

### SLOs del MVP:

\- p95 < 500 ms en GET /reports/near

\- Uptime >= 99.5% durante prueba

\- >99% éxito de POST /reports



