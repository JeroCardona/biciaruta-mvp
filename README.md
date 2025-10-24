\# BiciRuta — MVP



Flujo mínimo:

1\) POST /reports  → crear incidente (lat, lon, type, note)

2\) GET /reports/near?lat=\&lon=\&radius=  → listar cercanos



Estructura:

\- infra/           # Terraform (EC2/SG/ALB más adelante)

\- api/             # Backend Node.js/Express

\- db/              # init.sql con tabla e índices

\- web/             # Front estático (Leaflet)

\- reverse-proxy/   # Nginx balanceando api1 y api2

\- deploy/          # docker-compose y .env

\- tests/           # k6 scripts



SLOs del MVP:

\- p95 < 500 ms en GET /reports/near

\- Uptime >= 99.5% durante prueba

\- >99% éxito de POST /reports



