## BiciRuta

### Despliegue de Infraestructura
Para desplegar la infraestructura unicamente debemos modificar el archivo **config.yml**. En el cual cambiaremos las variables que contienen el valor **CHANGE_ME**. Importante el valor de LoadBalancerCNAME es desconocido por el momento, por lo que lo dejaremos en **CHANGE_ME**.

Antes de ejecutar nada, es necesario crear dentro de la cuenta AWS un par de llaves (Key Pair) para acceder a las maquinas de la capa de aplicacion. Iremos al apartado EC2 > Key Pair > Create Key Pair. Es importante que el nombre de la pem sea como el nombre del Stack que crearemos. `EJ: sistemasad-la.pem -> StackName: sistemasad-la`

Procederemos a ejecutar el script **main** y se nos crearan los recursos fundamentales. Una vez termine de crear el Stack, iremos al apartado de EC2 > LoadBalancers, aqui encontraremos el Balanceador de cargas que se nos habra creado gracias al IaC y copiaremos su DNS, podremos remplazar la variable que antes dejamos intacta.

Ahora para levantar la CDN, ejecutaremos el script **cdn**, una vez termine de levantar tendremos la CDN por delante de la infraestructura.

En este levantamiento se omiten muchos pasos, como privatizar el acceso a la capa de aplicacion, establecer un dominio, establecer politicas de acceso, etc etc.

Seran supuestos que se tomaran para versiones futuras.