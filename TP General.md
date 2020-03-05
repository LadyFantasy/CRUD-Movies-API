Queremos crear un administrador de peliculas.

El modelo es: 

Peliculas
- name
- category
- image
- type (pelicula o serie)

Usuarios
- user
- password
- isAdmin default false

Las imagenes se tienen que subir y guardar en el servidor dentro de la carpeta /uploads

Rutas

**MOVIES**

[GET] /movies -> Necesita estar autenticado

[GET] /movies/:id -> Necesita esta autenticado

[POST] /movies -> Necesita estar autenticado y ser admin para que se ejecute

**USERS**

[GET] /users

[GET] /users/:id

[POST] /users