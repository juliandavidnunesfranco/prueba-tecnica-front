> [!IMPORTANT]
> * [x] *Herramientas de desarrollo*
----------------------------------
1. Next.js: lates (v14.2) framework de pila completa con libreria React.js y Express.js
2. Shadcn: libreria de componente para el UI/UX preconfigurados.
3. Zustand: Estados globales y locales
4. yarn: Administrador de paquetes para node
5. Nodejs: version 20.18.0
6. TypeScript: lenguaje de programacion 
7. vscode: Editor con configuracion en el archivo settings.json para formato de pagina , tabulados y mas.
8. git: Control de versiones
9. gsap: libreria de animaciones
10. Tailwind : estilos CSS 

--------------------------------------------

>[!TIPS]
> # TECNICAS DE DESARROLLO
--------------------------------------------

Se determina que el proyecto requiere interactividad, manejo de estados,
persistencia de la informacion, con diseno responsivo, de alto desempeno.

por lo anterior el proyecto se desarrollara en un sistema de
pre-building en el servidor, lo que dara en la pantalla una sensacion de agilidad.

Para ello se hace uso de paginas desde el servidor que estan nutridas con componentes 
que estan servidos en el cliente o sea el navegador, con estos componentes se puede
acceder a las herramientas del window, como el localstorage, sessionStorage, ademas de escuchar 
eventos  o hacer un queryselector. metodos exclusicos para el navegador.

Esta tecnica consiste en manejar los datos en el servidor y mantenerlos en cache y 
servirlos a medida que se requiera. 
Sin dejar de acceder a traves de los componentes al navegador.

se usa ademas herramientas de alto desempeno como manejador de estado global como **ZUSTAND**
que junto a **PERSIST** permiten uso de localstorage simplificando el trabajo.

Para una experiencia de usuario **UX** y generacion rapida de los estilos se uso 
**Tailwind CSS** 

--------------------------------------------------------------------------------

> [!CAUTION]
> # COMO FUNCIONA ?

Este proyecto hace peticiones a dos apis principalmente
**cloudinary** y **superheroapi**, en el primero se trae los videos de la zona hero
y del segundo datos ademas de images de la tematica que son superheroes.

las funciones y metodos con los que se conecta con las apis se ejecutan en el servidor
son invocados en la pagina y sus repuestas se trasladan a los componentes de la pagina.

Estos datos son almacenados en cache para no realizar multiples llamadas a las apis
y se conectan en tiempo de compilacion sin afectar el rendimiento de la aplicacion.

Servidos los datos, se inician a montar los componentes funcionales y no de clases, 
pues el proyecto no lo requeria, sin embargo cuentan con dos bancos , *interfaces* y *store*

En el primero se trabaja la persistencia y legibilidad del componente
y con el segundo se manejan los estados de la app ademas de acceder a propiedades del navegador.


Haciendo uso de los hooks de React.js se montan los componentes y ademas se accede a **sessionStorage** y 
**localStorage**

- #### SessionStorage y LocalStorage
se determina que desde que se abre la pagina  y transcurridos 60 segundos 
se mostrara el modal de votacion automaticamente y solo por una vez.
Despues de ello se accede al modal de votacion a traves del boton del banner que cambia un estado global de la app

Dado que la informacion necesita persistencia, entonces se alimenta la barra del progreso
de votacion con funciones que acceden al localstorage y al estado global de la app.

- #### Server Component
La app no presenta rutas de navegacion por ello solo estara disponible la ruta ~~home~~
por lo que si decide navegar a otra rutas estar presentando una pantalla error para esto

Sin embargo, al acceder a los datos de la api de spuerhores se preconstruyo una serie de rutas
correspondientes a los id de los superheroes.

tambien podra accer peticiones **POST** a la ruta  

```javascript

 /api/:hero

 ```

o sea  la base url de este proyecto mas /api/ como middleware para tratamiento especial
como conexion a un servidor y finaliza con el nombre de un superheroe
este endpoint devuelve un objeto JSON con la informacion de un superheroe.

#### Metadatos
El ser prerenderizado nos garantiza configurar los metadatos a nuestro
parecer, sin embargo para este proyecto se usan pocos metadatos
que los podra encontrar en el layout de la app.









