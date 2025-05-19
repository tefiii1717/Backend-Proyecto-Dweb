Documento de Requerimientos del Proyecto Final - Desarrollo de Aplicaciones Web 2025 - I

1. Introducción
1.1 Descripción General
El proyecto consiste en desarrollar un sistema fullstack que permita a los clientes consultar el estado del inventario, los precios y las opciones de compra más convenientes en tiempo real en los diferentes puestos de comidas y bebidas de la universidad.
En muchas universidades, los estudiantes y el personal enfrentan largas filas y falta de información sobre la disponibilidad de productos en los puntos de venta de alimentos y bebidas. Este sistema busca solucionar este problema proporcionando información actualizada en tiempo real sobre el stock de productos, sus precios y tiempos de espera aproximados. Además, permitirá a los encargados de cada punto de venta gestionar de manera eficiente su inventario, actualizar precios y registrar nuevos productos.
La aplicación contará con dos perfiles de usuario:
● Perfil POS: Encargado de manejar los inventarios y precios.

● Perfil Cliente: Encargado de consultar los inventarios y realizar pedidos.

El sistema se desarrollará utilizando React.js en el frontend y Express.js en el backend.
2. Requerimientos Funcionales
2.1 Autenticación y Manejo de Sesiones
● Implementación de autenticación con JWT (JSON Web Tokens).

● Inicio de sesión y cierre de sesión para ambos perfiles.

● Gestión de permisos y roles según el tipo de usuario (POS o Cliente).

2.2 Gestión de Inventarios (Perfil POS)
● Visualización del inventario de productos disponibles en cada punto de venta.

● Actualización de stock y precios en tiempo real.

● Registro de productos nuevos en el sistema.

● Eliminación de productos que ya no estén disponibles.

● (Bonus) Persistencia de esta información en una base de datos.

2.3 Consulta de Inventarios (Perfil Cliente)
● Visualización en tiempo real de productos disponibles, precios y cantidad restante.

● Búsqueda y filtrado de productos por categoría, disponibilidad y precio.

● Visualización de la ubicación del punto de venta.

● (Bonus) Implementación de caché para reducir tiempos de carga y mejorar la experiencia del usuario.

2.4 Gestión de Pedidos
● Creación de pedidos por parte de los clientes.

● Confirmación de disponibilidad de productos antes de finalizar un pedido.
●
● Confirmación del pedido por parte del restaurante.

● Notificaciones sobre el estado del pedido.

● (Bonus) Implementación de Firebase para manejar notificaciones en tiempo real de cambios en el estado de los pedidos.

2.5 Seguridad y Control de Acceso
● Cifrado de contraseñas con bcrypt.

● Protección de rutas con autenticación basada en JWT.

● Validaciones en el backend para evitar accesos no autorizados.

2.6 Diseño Responsive y Accesibilidad
● Adaptabilidad total de la interfaz para dispositivos móviles, tabletas y escritorio.

● Interfaz intuitiva con navegación clara y rápida para ambos perfiles.

● Uso de buenas prácticas de accesibilidad (contrastes adecuados, etiquetas ARIA, navegación por teclado, etc.).

3. Requerimientos No Funcionales
3.1 Tecnologías y Herramientas
● Frontend: React.js con Vite y Tailwind CSS.

● Backend: Node.js con Express.js.

● (Bonus) Base de Datos: Firebase.

● Autenticación: JWT con bcrypt para almacenamiento seguro de contraseñas.

● Despliegue: Vercel.

3.2 Rendimiento y Escalabilidad
● Optimización de consultas a la base de datos para mejorar tiempos de respuesta.

● Implementación de caché para mejorar el rendimiento de consultas frecuentes.

● Arquitectura modular para facilitar la escalabilidad y el mantenimiento del código.

3.3 Experiencia de Usuario
● Interfaz intuitiva y responsive para facilitar la navegación en dispositivos móviles y escritorio.

● (Bonus) Sistema de notificaciones en tiempo real para actualizaciones de inventario y pedidos.
○ Nota: El bonus es solo para el “tiempo real” de las notificaciones, sin embargo son obligatorias y deben implementarse con o sin “tiempo real”.

4. Funcionalidades Adicionales
● Historial de pedidos para que los clientes puedan ver sus compras anteriores.

● Sistema de reseñas y calificaciones para evaluar la calidad de los productos y tiempos de entrega.

● (Opcional) Integración con pasarela de pagos para permitir compras directas dentro de la aplicación.

5. Criterios de Evaluación
● Implementación correcta de autenticación y manejo de sesiones.

● Gestión eficiente del inventario y actualizaciones en tiempo real o en tiempo de carga.

● Experiencia de usuario fluida y sin errores críticos.

● Seguridad en la gestión de datos y acceso a la información.

● Calidad del código y buenas prácticas de desarrollo.

● (Bonus) Implementación de cache y optimización de consultas a la base de datos.
