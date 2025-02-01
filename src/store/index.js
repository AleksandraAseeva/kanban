// import { createStore } from "vuex";
// import Cookies from "js-cookie"; // Импортируем библиотеку для работы с куками

// export default createStore({
//   state: {
//     tasks: [],
//     isDarkMode: localStorage.getItem('isDarkMode') === 'true',
//     loading: false, // Состояние загрузки
//   },
//   mutations: {
//     SET_TASKS(state, tasks) {
//       state.tasks = tasks; // Устанавливаем задачи в состояние
//     },
//     ADD_TASK(state, task) {
//       state.tasks.push(task); // Добавление задачи
//       this.commit('saveTasks'); // Сохраняем задачи в куки после добавления
//     },
//     UPDATE_TASK(state, updatedTask) {
//       const index = state.tasks.findIndex(task => task.id === updatedTask.id);
//       if (index !== -1) {
//         state.tasks.splice(index, 1, updatedTask); // Обновление задачи
//         this.commit('saveTasks'); // Сохраняем задачи в куки после обновления
//       }
//     },
//     REMOVE_TASK(state, taskId) {
//       const index = state.tasks.findIndex(task => task.id === taskId);
//       if (index !== -1) {
//         state.tasks.splice(index, 1); // Удаление задачи из массива
//         this.commit('saveTasks'); // Сохраняем задачи в куки после удаления
//       }
//     },
//     saveTasks(state) {
//       // Сохранение задач в куки
//       Cookies.set('tasks', JSON.stringify(state.tasks), { expires: 7 });
//     },
//     loadTasks(state) {
//       // Загрузка задач из куки
//       const tasks = Cookies.get('tasks');
//       if (tasks) {
//         state.tasks = JSON.parse(tasks);
//       }
//     },
//     TOGGLE_DARK_MODE(state) {
//       state.isDarkMode = !state.isDarkMode; // Переключаем значение
//       localStorage.setItem('isDarkMode', state.isDarkMode); // Сохраняем состояние в localStorage
//     },
//     SET_LOADING(state, loading) {
//       state.loading = loading; // Устанавливаем состояние загрузки
//     },
//   },
//   actions: {
//     async addTask({ commit }, task) {
//       commit("SET_LOADING", true); // Включение состояния загрузки
//       commit("ADD_TASK", task);
//       await commit('saveTasks'); // Сохраняем задачи в куки
//       commit("SET_LOADING", false); // Выключение состояния загрузки
//     },
//     async updateTask({ commit }, updatedTask) {
//       commit("SET_LOADING", true); // Включение состояния загрузки
//       commit('UPDATE_TASK', updatedTask);
//       commit("SET_LOADING", false); // Выключение состояния загрузки
//     },
//     async removeTask({ commit }, taskId) {
//       commit("SET_LOADING", true); // Включение состояния загрузки
//       commit('REMOVE_TASK', taskId);
//       commit("SET_LOADING", false); // Выключение состояния загрузки
//     },
//     loadTasks({ commit }) {
//       commit('loadTasks'); // Действие для загрузки задач из куки
//     },
//     toggleDarkMode({ commit }) {
//       commit('TOGGLE_DARK_MODE'); // Вызываем мутацию
//     },
//   },
//   getters: {
//     tasks: (state) => state.tasks,
//     getTaskById: (state) => (id) => {
//       return state.tasks.find((task) => task.id === Number(id));
//     },
//     isDarkMode: (state) => state.isDarkMode,
//     isLoading: (state) => state.loading, // Геттер для состояния загрузки
//   },
// });


import { createStore } from "vuex";
import tasksModule from "../modules/tasks";

export default createStore({
  state: {
    isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  },
  mutations: {
    TOGGLE_DARK_MODE(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', state.isDarkMode); // Сохраняем состояние в localStorage
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE'); // Вызываем мутацию
    },
  },
  getters: {
    isDarkMode: (state) => state.isDarkMode,
  },
  modules: {
    tasks: tasksModule, // Подключаем модуль задач с пространством имен
  },
});