# Vue.js Task Management Application

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://aleksandraaseeva.github.io/kanban/)
[![Vue.js](https://img.shields.io/badge/vue.js-3.x-brightgreen)](https://vuejs.org/)
[![Vuex](https://img.shields.io/badge/vuex-4.x-lightgrey)](https://vuex.vuejs.org/)

Профессиональное приложение для управления задачами с канбан-доской, созданное на Vue.js. Позволяет эффективно организовывать рабочий процесс с отслеживанием статусов задач, приоритетов и сроков выполнения.

## 🌐 Живое демо
Приложение доступно по ссылке:  
https://aleksandraaseeva.github.io/kanban/

## ✨ Основные функции
- 📋 Создание, редактирование и удаление задач
- 🗂️ Канбан-доска с тремя статусами:
  - Созданы
  - В работе
  - Готовы
- 🚦 Установка приоритета задач (низкий/средний/высокий)
- ⏱️ Настройка срока выполнения с различными единицами измерения
- 🌙 Переключение темной/светлой темы
- 💾 Автосохранение задач между сессиями
- 📱 Адаптивный дизайн для мобильных устройств
- ⚠️ Визуализация просроченных задач

## 🛠️ Технологический стек
- **Core**: Vue.js 3 (Composition API)
- **State Management**: Vuex
- **Routing**: Vue Router
- **UI**: CSS3 (Flexbox, Grid), Font Awesome
- **Persistence**: Cookies.js
- **Deployment**: GitHub Pages

## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 🔍 Особенности реализации
## 🧠 Управление состоянием
```
// tasks.js (Vuex module)
const tasksModule = {
  namespaced: true,
  state: { tasks: [] },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
      this.commit('tasks/saveTasks');
    },
    saveTasks(state) {
      Cookies.set('tasks', JSON.stringify(state.tasks), { expires: 7 });
    },
    loadTasks(state) {
      const tasks = Cookies.get('tasks');
      if (tasks) state.tasks = JSON.parse(tasks);
    }
  }
};
```

## ⏳ Расчет времени выполнения
```
// TaskList.vue
timeElapsed(task) {
  const now = new Date();
  const elapsedTime = Math.floor((now - new Date(task.createdAt)) / 1000);
  
  // Рассчет дней/часов/минут
  const days = Math.floor(elapsedTime / (60 * 60 * 24));
  const hours = Math.floor((elapsedTime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((elapsedTime % (60 * 60)) / 60);
  
  // Проверка просрочки
  if (elapsedTime * 1000 >= task.duration) {
    return `${days}д ${hours}ч ${minutes}мин (ПРОСРОЧЕНО)`;
  }
  return `${days}д ${hours}ч ${minutes}мин`;
}
```

## 🎨 Динамические стили
```
<!-- Приоритет задачи -->
<li :class="{
  'red-bg': task.priority === 'high',
  'yellow-bg': task.priority === 'medium',
  'green-bg': task.priority === 'low'
}">
```

## 🔄 Переключение темы
```
// store/index.js
TOGGLE_DARK_MODE(state) {
  state.isDarkMode = !state.isDarkMode;
  localStorage.setItem('isDarkMode', state.isDarkMode);
}
```
