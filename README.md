# 🤖 Automatización

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 📋 Tabla de Contenidos
- [Sobre el Proyecto](#sobre-el-proyecto)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)

## 📄 Sobre el Proyecto
Este proyecto es una automatización web  construida con tecnologías modernas y robustas. La solución implementa pruebas automatizadas utilizando las mejores prácticas de la industria.

### 🖥️ Web
El desarrollo de esta automatización se implementó utilizando el Framework Cucumber 🥒 integrado con **Playwright** 🎭, combinando la potencia del desarrollo dirigido por comportamiento (BDD) con uno de los frameworks de automatización más robustos y confiables para pruebas end-to-end. Esta integración permite crear pruebas automatizadas más legibles y mantenibles, siguiendo el lenguaje Gherkin para la especificación de casos de prueba.

## 🛠️ Tecnologías

- 🎭 **Playwright**: Framework principal de automatización
- 🟢 **Node.js**: Entorno de ejecución
- 🔷 **TypeScript**: Lenguaje de programación
- 🥒 **Cucumber**: Framework de BDD
- 🌿 **Git**: Control de versiones

## 📁 Estructura del Proyecto

```
📦 Root
├── 📁 assets               # Recursos estáticos
├── 📁 config
│   └── 📄 cucumber.js     # Configuración de Cucumber
├── 📁 hooks              # Hooks de prueba
├── 📁 node_modules       # Dependencias
├── 📁 src
│   ├── 📁 demoblaze/page     # Código específico de Demoblaze
│   ├── 📁 helpers       # Funciones auxiliares
│   └── 📁 interface     # Definiciones de interfaces
├── 📁 test              # Archivos de prueba
├── 📁 test-results      # Resultados de pruebas
├── 📁 types             # Definiciones de tipos
└── 📄 Archivos de configuración
```

## ⚡ Instalación y Ejecución

### Prerrequisitos
- Node.js instalado
- Git instalado

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Navegar al directorio del proyecto:
```bash
cd proyecto
```

3. Instalar dependencias:
```bash
npm i
```

4. Instalar Playwright:
```bash
npm install playwright
```

5. Ejecutar pruebas:
```bash
npm test
```



### 📝 Notas Importantes
- La reporteria html se Genera dentro de la carpeta **test-result/reports**  y la demas en **test-result**
- para ejecutar una prueba en concreta se configura el glu dentro del archivo cucumber.js en el apartado de **path** 


---