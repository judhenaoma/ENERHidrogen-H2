# ModerGIS - Plataforma de Análisis Energético


## Descripción
ENERHidrógen - H2 es un modelo de simulación que busca la integración sostenible ambiental y social de energías renovables incluyendo el vector Hidrógeno. Evalúa simultáneamente la potencialidad energética renovable espacial y temporal de la oferta y demanda de energía una zona geográfica y de la emisión de gases de efecto invernadero. Es coherente y consecuente con en el uso de herramientas integradas y flexibles para la evaluación y prospección de recursos energéticos, incluyendo las cuencas hidrográficas y la distribución cuerpos de agua. Determina la demanda de energía centrando en escenarios de movilidad sostenible, energía térmica en la industria y potenciales de exportación o uso en materia prima, con énfasis en el uso del Hidrógeno verde. Modela tecnologías de electrolisis para la disociación en hidrogeno verde H₂, e integra los resultados de las simulaciones realizadas.

Se alimenta también de los resultados de ENERDEM módulo de la demanda y oferta de energía, basado en el modelo Long Energy Alternative Planning - L.E.A.P que utiliza la información de los balances energéticos de la Unidad de Planeación Minero -Energética UPME y la Organización Latinoamericana de Energía OLADE, donde se crean los escenarios de sustitución, conservación y prospección de energía. ENERHYDROGEN modela la electrolisis y tecnologías para la producción de hidrógeno verde-, como se muestra en la figura

![Diagrama Enerhidrogen](/public/moderhydrogen_img_v2.png)
## Características principales
- 🔒 Sistema de autenticación de usuarios basados en roles
- 🗺️ Visualización de mapas interactivos con capas de:
    - Potencial solar y eólico
    - Restricciones ambientales
    - Infraestructura energética
    - Centros poblados
    - Velocidad de viento
    - Radiación solar
    - Líneas de transmisión
    - Centrales de energía
    - Oferta hídrica sostenible
    - Caudales IDEAM
    - Rios principales y secundarios
    - Demanda de Combustibles
    - Coberturas vegetales, entre otros.
- 📊 Simulación energética:
    - Estimación de potencial solar fotovoltaico
    - Estimación de potencial eólico
    - Producción de Hidrógeno Verde
    - Emisiones y emisiones evitadas por uso de H2 Verde
    - Sustitución de combustibles fósiles por Hidrógeno Verde
- 💾 Almacenamiento de registros y cálculos
- 📈 Diagramas Sankey para análisis energético
- 💧 Análsis de oferta sostenible de agua para producción Hidrógeno Verde
- 📈 Resultados de casos de estudios


## Funcionalidades principales

- Sistema de Mapas
- Visualización de múltiples capas geográficas
- Cálculos en puntos específicos
- Exportación de resultados
- Cálculos Energéticos
- Estimación de potencial solar fotovoltaico
- Estimación de potencial eólico
- Producción de hidrógeno verde
- Análisis de emisiones evitadas
- Gestión de Datos
- Almacenamiento de registros en Firebase
- Exportación a Excel
- Visualización de históricos
- Consolidación de resultados

## Tecnologías Utilizadas
- React.js (v18.2.0)
- Vite
- Firebase (Autenticación y Base de datos)
- Leaflet para mapas interactivos
- Tailwind CSS
- D3.js para visualizaciones

## Instalación

0. Instalar Node.js [node.js](https://nodejs.org/en/download/prebuilt-installer)

1. Clonar el repositorio:
```
git clone https://github.com/tu-usuario/modergis.git
cd modergis
```

2. Instalar dependencias:
```
npm install
```

3. Configurar variables de entorno:

Crear archivo .env con las credenciales de Firebase:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```


4. Iniciar en modo desarrollo:
```bash
npm run dev
```

## Estructura general del Proyecto

```
src/
├── componentes/         # Componentes React
├── capas/              # Archivos GeoJSON para mapas
├── config/             # Configuración (Firebase, etc)
├── scripts/            # Scripts de utilidad
├── utils/              # Funciones auxiliares
└── data/              # Datos estáticos
```

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

MIT License

Copyright (c) [2024] [Ricardo Quijano]

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software, y a permitir a las personas a las que se les proporcione el Software a hacer lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN EL SOFTWARE.

## Contacto
- Ricardo Quijano - rquijano@unal.edu.co
- Juan David Henao - judhenaoma@unal.edu.co
