<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

#EJECUTAR EN DESARROLLO

1. Clonar el repositorio
2. Ejecutar

```
npm install situado en api
```
3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```
4. Levantar la base de datos

```
docker-compose up -d
```

<!-- 5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. LLenar las variables de entorno definidas en el ```.env```  -->

7. Levantar la app

```
npm run start:dev
```

8. Reconstruir la base de datos con la semilla

```
http://localhost:3001/seed
```

9. La app estara corriendo en el puerto http://localhost:3001

## Recomendado

Instalar Material Icon Theme y cambiar íconos de Angular por íconos de Nest -> Abrir: settings.json y pegar el siguiente codigo:

```
"material-icon-theme.activeIconPack": "nest"
```
Docker:

1. Pagina para descargar Docker:

```
https://www.docker.com/get-started/
```

2. Una vez descargado verificar que Docker abajo a la izquierda este en verde.

## Stack usado
* MongoDB
* Nest
* Docker