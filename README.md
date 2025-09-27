# Frontend – Casa hogar

Este documento sirve como guía para trabajar en el proyecto: instalación, flujo de trabajo con Git, estilos y componentes globales.

---

## Como instalar

Clonar el repositorio y moverse a la carpeta `frontend`.

```bash
  git clone https://github.com/alxxjandro/frontend.git
  cd frontend
```

al utilizar `pwd` debe de mostrar algo como `Desktop/casaHogar/frontend`

Instalar las dependencias de npm

```bash
  npm i
```

Correr el proyecto

```bash
  npm start
```

## Estructura del proyecto

- Si utilizaremos un LLM, podemos pasar este README.md como referencia o contexto del proyecto :)

```bash
frontend/
├── app/                # Cada carpeta aquí es una ruta (Expo Router)
│   ├── index.js        # Ruta raíz (se renderiza por defecto)
│   ├── login/          # /login renderiza → login/index.js
│   └── inventario/     # /inventario renderiza → inventario/index.js
│
├── components/         # Componentes globales reutilizables
│   └── CustomButton.js
│
├── styles/             # Estilos globales y específicos
│   ├── globalStyles.js # Clases generales (h1, h2, contenedores, etc.)
│   └── <feature>.js    # Estilos específicos por pantalla
│
├── hooks/              # Custom hooks
├── utils/              # Funciones utilitarias
├── assets/             # Fonts, imágenes, svgs...
└── index.js            # Punto de entrada de Expo (no modificar)

```

## Estilos (CSS)

- Dentro de lo posible, hay que intentar utilizar los estilos de globalStyles.js, claro que podemos agregar mas clases o estilos a este archivo, sin embargo, si necesitamos muchos estilos especiales para una pantalla, es mejor crear un archivo de estilos para esa pantalla dentro del directorio de `bash ./styles`
- Hay que evitar repetir estilos inline, priorizar consistencia.

## Componentes

- Los componentes reutilizables van en `bash/components`
- Ejemplo actual: `bashCustomButton.js.`
- Antes de crear un nuevo componente, revisar si ya existe algo similar en `/components.`
- Si creamos un componente, hay que intentar dcoumentar con JSDocs como lo visto en clase, siempre podemos pedir a un LLM que nos documente una funcion una vez la terminemos, esto para que sea mas facíl que alguien mas la reutilice!

## Flujo de trabajo con Git

1. Antes de realizar feature, asegura estar en main y bajar los ultimos cambios

```bash
	git checkout main
	git pull
```

- Si utilizas Windows, procura utilizar una Git Bash, ya que es mas util para mostrar la rama en que estas, asi como para tener un entorno mas similar a UNIX

2. Crear un branch nuevo con la nomenclatura:

```bash
	git checkout -b GH-123
```

- `bash GH-123` corresponde al número del ticket en Jira, `bash -b` indica que es un branch nuevo!

- Recuerda que siempre puedes utilizar `bash git status` para saber tus cambios, asi mismo si estas trabajando en un branch y necesitas traer cambios de un main, puedes utilizar un `bash git stash` [como usar un stash?](https://www.atlassian.com/git/tutorials/saving-changes/git-stash)

3. Al terminar tus cambios, subelos!!!

```bash
	git add .
	git commit -m "GH-123: Descripción breve de los cambios"
	git push origin GH-123
```

- #### DISCLAIMER `bash GH-123` es un ejemplo, siempre usa el numero de ticket que asigna Jira, recuerda que el nombre de branch cambiara cada ticket

4. Crea tu Pull Request
   Después de hacer `git push origin GH-123`, en la terminal deberías ver algo como esto:

```bash
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 1.23 KiB | 1.23 MiB/s, done.
Total 8 (delta 2), reused 0 (delta 0)
remote:
remote: Create a pull request for 'GH-123' on GitHub by visiting:
remote:      https://github.com/mi-org/mi-repo/pull/new/GH-123
remote:
To github.com:mi-org/mi-repo.git
 * [new branch]      GH-123 -> GH-123
```

- En ese momento puedes hacer Ctrl + click (o Cmd + click en Mac) sobre el link que aparece en la terminal, y eso abrirá en el navegador la página para crear el Pull Request (PR)
- Dentro del Pull Request, hay que colocarse a uno mismo como assignee, y a Saul Campos (saulito
