Dos consolas con diferentes rutas

<--Correr el proyecto-->
Back-end: node app.js
Front-end: ng serve


----------------------------
Back-end
	npm init -y
	npm install --save express body-parser cors qrcode speakeasy
	cd back-end/
	node app.js

Front-end: 
	npm install -g @angular/cli
	cd front-end/
	npm install --save bootstrap
	ng serve

navegador:
	http://localhost:4200/login


express: este es un marco web mínimo y flexible para crear servicios API.

body-parser: para analizar los datos corporales del método HTTP, se está utilizando este paquete.

cors: este paquete se utiliza para permitir que la aplicación web del lado del cliente se comunique 
con los servicios de la API y evitar el problema de origen cruzado.

qrcode: en esta aplicación estaríamos generando el código QR como datos de imagen base64 y, por lo tanto,
requerimos el paquete qrcode.

speakeasy: este es el paquete que permite a nuestra aplicación proporcionar la clave secreta y el algoritmo 
T-OTP que utiliza el Autenticador de Google y también es útil para la verificación del código de autenticación 
proporcionado.