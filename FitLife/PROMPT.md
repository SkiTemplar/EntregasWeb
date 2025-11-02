EJERCICIO: Reto Fitness ¡Acompáñanos en tu viaje hacia
una vida más saludable! 󰝩
En FitLife, nuestro objetivo es ayudarte a alcanzar tus metas de fitness de una manera
divertida y sostenible. Creemos que el primer paso para un estilo de vida saludable es dar
el paso, y por eso queremos facilitarte el proceso de unirte a nuestro gimnasio.
Tu misión:
Desarrollar un formulario de registro intuitivo y atractivo para que los nuevos miembros
puedan unirse a FitLife con facilidad. El formulario debe ser atractivo y fácil de usar,
reflejando la vibra moderna y acogedora de nuestro gimnasio.
Requisitos del formulario:
● Componentes:
○ Crear componentes reutilizables para cada sección del formulario (datos
personales, información de contacto, preferencias de entrenamiento, etc.).
○ Implementar la lógica de cada sección como un componente
independiente.
● Props y State:
○ Pasar datos entre componentes utilizando props.
○ Gestionar el estado interno de cada componente con useState.
● Manejo de eventos:
○ Validar la entrada del usuario en tiempo real.
○ Mostrar mensajes de error y éxito.
● Comunicación hijo-padre:
○ Enviar datos desde el componente hijo al componente padre al completar
el formulario.
● Condicionales y Listas:
○ Mostrar u ocultar elementos del formulario según las opciones del usuario.
○ Mostrar una lista de opciones de entrenamiento disponibles.
● Aplicación de estilos:
○ Aplicar estilos CSS a los componentes para una interfaz atractiva.
○ Usar clases CSS para diferentes estados de los elementos (activo, inactivo,
error).
● Estilos dinámicos:
○ Cambiar estilos dinámicamente según las opciones del usuario.
● Styled Components:
○ Implementar styled components para una mejor organización y
mantenimiento del código CSS.
● CSS Modules:
○ Usar CSS Modules para evitar conflictos de nombres de clase.
● Peticiones HTTP:
○ Enviar datos del formulario al servidor para registrar al nuevo miembro.
● Librerías:
○ Implementar una librería de gestión de formularios como Formik o React
Hook Form para facilitar la validación y el manejo de errores.
Recursos adicionales:
● Documentación de React: https://es.reactjs.org/docs/
● Formik: https://formik.org/
● React Hook Form: https://react-hook-form.com/
Consejos:
● Divide el formulario en secciones pequeñas y manejables.
● Comienza con una versión simple del formulario y ve agregando funcionalidades
gradualmente.
● Prueba el formulario con diferentes casos de uso para asegurarte de que funciona
correctamente.
● Pide feedback a tus compañeros o profesores para mejorar la experiencia del
usuario.
¡Esperamos tu formulario y ayudarte a empezar tu viaje hacia una vida más saludable!
Guía para realizar el ejercicio:
1. Planificación y Diseño:
● Definir las secciones del formulario:
○ Datos personales (nombre, correo electrónico, teléfono)
○ Información de contacto (dirección, ciudad, código postal)
○ Preferencias de entrenamiento (tipo de entrenamiento, objetivos,
disponibilidad)
○ Datos de pago (método de pago, información de la tarjeta)
● Diseñar la interfaz del formulario:
○ Elegir una paleta de colores y tipografía que represente la marca FitLife.
○ Crear un diseño atractivo y fácil de usar para cada sección del formulario.
○ Utilizar imágenes y vídeos para mostrar el ambiente del gimnasio y las
clases disponibles.
2. Implementación de React:
● Componentes:
○ Crear un componente principal para el formulario que contenga los demás
componentes.
○ Desarrollar componentes independientes para cada sección del formulario.
○ Pasar datos entre componentes utilizando props.
● Props y State:
○ Definir el estado interno de cada componente con useState.
○ Pasar datos dinámicos a los componentes como props.
● Manejo de eventos:
○ Validar la entrada del usuario en tiempo real.
○ Mostrar mensajes de error y éxito.
○ Implementar eventos para enviar el formulario.
3. Funcionalidades avanzadas:
● Comunicación hijo-padre:
○ Enviar datos desde el componente hijo al componente padre al completar
el formulario.
● Condicionales y Listas:
○ Mostrar u ocultar elementos del formulario según las opciones del usuario.
○ Mostrar una lista de opciones de entrenamiento disponibles.
● Aplicación de estilos:
○ Aplicar estilos CSS a los componentes para una interfaz atractiva.
○ Usar clases CSS para diferentes estados de los elementos (activo, inactivo,
error).
● Estilos dinámicos:
○ Cambiar estilos dinámicamente según las opciones del usuario.
4. Integración de librerías:
● Formik o React Hook Form:
○ Implementar una librería de gestión de formularios para facilitar la
validación y el manejo de errores.
○ Configurar las reglas de validación para cada campo del formulario.
○ Mostrar mensajes de error personalizados.
5. Peticiones HTTP:
● Enviar datos del formulario al servidor:
○ Implementar una API para registrar al nuevo miembro.
○ Enviar una petición HTTP al servidor con los datos del formulario.
○ Mostrar un mensaje de éxito o error al completar la solicitud.

Utiliza react-hook-form para los formularios. Debe haber varios formularios e
ir presentando de uno en uno según de vayan completando los anteriores.
Al final, componed el objeto a enviar al servidor con toda la info recogida de
los formularios.
