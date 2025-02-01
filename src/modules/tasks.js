import Cookies from "js-cookie"; // Импортируем библиотеку для работы с куками

const tasksModule = {
  namespaced: true,
  state: {
    tasks: [],
    loading: false, // Состояние загрузки
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks; // Устанавливаем задачи в состояние
    },
    ADD_TASK(state, task) {
      state.tasks.push(task); // Добавление задачи
      // this.commit('tasks/saveTasks'); // Сохраняем задачи в куки после добавления
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask); // Обновление задачи
        this.commit('tasks/saveTasks'); // Сохраняем задачи в куки после обновления
      }
    },
    REMOVE_TASK(state, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        state.tasks.splice(index, 1); // Удаление задачи из массива
        this.commit('tasks/saveTasks'); // Сохраняем задачи в куки после удаления
      }
    },
    saveTasks(state) {
      // Сохранение задач в куки
      Cookies.set('tasks', JSON.stringify(state.tasks), { expires: 7 });
    },
    loadTasks(state) {
      // Загрузка задач из куки
      const tasks = Cookies.get('tasks');
      if (tasks) {
        state.tasks = JSON.parse(tasks);
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading; // Устанавливаем состояние загрузки
    },
  },
  actions: {
    async addTask({ commit }, task) {
      commit("SET_LOADING", true); // Включение состояния загрузки
      commit("ADD_TASK", task);
      await commit('saveTasks'); // Сохраняем задачи в куки
      commit("SET_LOADING", false); // Выключение состояния загрузки
    },
    async updateTask({ commit }, updatedTask) {
      commit("SET_LOADING", true); // Включение состояния загрузки
      commit('UPDATE_TASK', updatedTask);
      commit("SET_LOADING", false); // Выключение состояния загрузки
    },
    async removeTask({ commit }, taskId) {
      commit("SET_LOADING", true); // Включение состояния загрузки
      commit('REMOVE_TASK', taskId);
      commit("SET_LOADING", false); // Выключение состояния загрузки
    },
    loadTasks({ commit }) {
      commit('loadTasks'); // Действие для загрузки задач из куки
    },
  },
  getters: {
    tasks: (state) => state.tasks,
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => task.id === Number(id));
    },
    isLoading: (state) => state.loading, // Геттер для состояния загрузки
  },
};

export default tasksModule;