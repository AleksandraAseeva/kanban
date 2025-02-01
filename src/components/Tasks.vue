<template>
  <h1>Список задач</h1>
  <div class="flex-list" :class="[isDarkMode ? 'dark-theme' : 'light-theme']">
    <ul class="startList">
      <h2>Созданные задачи</h2>
      <li
        v-for="task in startStatusTasks"
        :key="task.id"
        :class="{
          'red-bg': task.priority === 'high',
          'yellow-bg': task.priority === 'medium',
          'green-bg': task.priority === 'low',
        }"
      >
        <div><strong>Заголовок:</strong> {{ task.title }}</div>
        <button @click="toggleDetails(task)" class="toggle-button">
          {{ task.showDetails ? "Скрыть" : "Показать еще" }}
        </button>

        <div v-if="task.showDetails">
          <div><strong>Описание:</strong> {{ task.description }}</div>
          <div><strong>Приоритет:</strong> {{ task.priority }}</div>
          <div>
            <strong>Задача создана:</strong> {{ formatDate(task.createdAt) }}
          </div>
          <div>
            <strong>Время выполнения:</strong> {{ task.amount }} {{ task.unit }}
          </div>
          <div><strong>Время прошло:</strong> {{ timeElapsed(task) }}</div>
          <div>
            <strong>Статус:</strong>
            <select v-model="task.status" @change="updateStatus(task)">
              <option value="start">Создана</option>
              <option value="inwork">В работе</option>
              <option value="finish">Готова</option>
            </select>
          </div>
          <button @click="editTask(task)" class="action-button">
            Редактировать
          </button>
          <button @click="removeTask(task.id)" class="action-button">
            Удалить
          </button>
        </div>
        <!-- <TaskItem
        v-for="task in startStatusTasks"
        :key="task.id"
        :task="task"
        @updateStatus="updateStatus"
        @editTask="editTask"
        @removeTask="removeTask"
      /> -->
      </li>
    </ul>
    <ul class="inworkList">
      <h2>Задачи в работе</h2>
      <li
        v-for="task in inworkStatusTasks"
        :key="task.id"
        :class="{
          'red-bg': task.priority === 'high',
          'yellow-bg': task.priority === 'medium',
          'green-bg': task.priority === 'low',
        }"
      >
        <div><strong>Заголовок:</strong> {{ task.title }}</div>

        <button @click="toggleDetails(task)" class="toggle-button">
          {{ task.showDetails ? "Скрыть" : "Показать еще" }}
        </button>

        <div v-if="task.showDetails">
          <div><strong>Описание:</strong> {{ task.description }}</div>
          <div><strong>Приоритет:</strong> {{ task.priority }}</div>
          <div>
            <strong>Задача создана:</strong> {{ formatDate(task.createdAt) }}
          </div>
          <div>
            <strong>Время выполнения:</strong> {{ task.amount }} {{ task.unit }}
          </div>
          <div><strong>Время прошло:</strong> {{ timeElapsed(task) }}</div>
          <div>
            <strong>Статус:</strong>
            <select v-model="task.status" @change="updateStatus(task)">
              <option value="start">Создана</option>
              <option value="inwork">В работе</option>
              <option value="finish">Готова</option>
            </select>
          </div>
          <button @click="editTask(task)" class="action-button">
            Редактировать
          </button>
          <button @click="removeTask(task.id)" class="action-button">
            Удалить
          </button>
        </div>
      </li>
    </ul>
    <ul class="finishList">
      <h2>Готовые задачи</h2>
      <li
        v-for="task in finishStatusTasks"
        :key="task.id"
        :class="{
          'red-bg': task.priority === 'high',
          'yellow-bg': task.priority === 'medium',
          'green-bg': task.priority === 'low',
        }"
      >
        <div class="task-header">
          <strong>Заголовок:</strong> {{ task.title }}
        </div>

        <button @click="toggleDetails(task)" class="toggle-button">
          {{ task.showDetails ? "Скрыть" : "Показать еще" }}
        </button>

        <div v-if="task.showDetails">
          <div><strong>Описание:</strong> {{ task.description }}</div>
          <div><strong>Приоритет:</strong> {{ task.priority }}</div>
          <div>
            <strong>Задача создана:</strong> {{ formatDate(task.createdAt) }}
          </div>
          <div>
            <strong>Время выполнения:</strong> {{ task.amount }} {{ task.unit }}
          </div>
          <div><strong>Времени прошло:</strong> {{ timeElapsed(task) }}</div>
          <div>
            <strong>Статус:</strong>
            <select v-model="task.status" @change="updateStatus(task)">
              <option value="start">Создана</option>
              <option value="inwork">В работе</option>
              <option value="finish">Готова</option>
            </select>
          </div>
          <button class="action-button" @click="editTask(task)">
            Редактировать
          </button>
          <button class="action-button" @click="removeTask(task.id)">
            Удалить
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    // this.$store.dispatch("loadTasks"); // теперь задачи не пропадают после обновления страницы
    this.$store.dispatch("tasks/loadTasks");
    this.tasks.forEach((task) => (task.showDetails = false));
  },
  computed: {
    // ...mapGetters(["tasks"]),
    ...mapGetters("tasks", ["tasks"]),
    startStatusTasks() {
      return this.tasks.filter((task) => task.status === "start");
    },
    inworkStatusTasks() {
      return this.tasks.filter((task) => task.status === "inwork");
    },
    finishStatusTasks() {
      return this.tasks.filter((task) => task.status === "finish");
    },
    // ...mapGetters(["isDarkMode"]),
    ...mapGetters("tasks", ["isLoading"]),
    ...mapGetters(["isDarkMode"]),
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    timeElapsed(task) {
      const now = new Date();
      const elapsedTime = Math.floor((now - new Date(task.createdAt)) / 1000); // время в секундах
      console.log("elapsedTime:", elapsedTime * 1000);
      const days = Math.floor(elapsedTime / (60 * 60 * 24));
      const hours = Math.floor((elapsedTime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((elapsedTime % (60 * 60)) / 60);
      const seconds = elapsedTime % 60;

      let result = "";
      console.log("в tasks:", task.duration);
      console.log("заголовок:", task.title);

      if (days > 0) {
        result += `${days} дн. `;
      }
      if (hours > 0) {
        result += `${hours} ч. `;
      }
      if (minutes > 0) {
        result += `${minutes} мин. `;
      }
      // Если меньше минуты, показываем секунды
      result += `${seconds} сек.`;

      if (elapsedTime * 1000 >= task.duration) {
        result += ", задача просрочена";
      }
      return result.trim(); // Возвращаем результат, убирая лишние пробелы
    },
    updateStatus(task) {
      // this.$store.dispatch("updateTask", task);
      this.$store.dispatch("tasks/updateTask", task);
      console.log("статус:", task.status);
    },
    removeTask(taskId) {
      if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
        // this.$store.dispatch("removeTask", taskId); // Удаление задачи из хранилища Vuex
        this.$store.dispatch("tasks/removeTask", taskId);
      }
    },
    editTask(task) {
      this.$router.push({ path: "/edittask", query: { id: task.id } });
      console.log("заголовок:", task.title);
    },
    toggleDetails(task) {
      task.showDetails = !task.showDetails;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
h1 {
  margin-bottom: 2rem;
  font-family: Roboto;
}

h2 {
  margin: 1rem 0;
  font-family: Roboto;
}

.flex-list {
  display: flex;
  gap: 1rem;
  background: linear-gradient(
    90deg,
    rgba(227, 190, 251, 1) 23%,
    rgba(255, 177, 177, 1) 46%,
    rgba(255, 215, 158, 1) 72%
  );
}

ul {
  width: 33vw;
  background: rgba(255, 255, 208, 0.424);
  height: 100%;
  min-height: 80vh;
  padding-left: 0;
}

li {
  list-style: none;
  margin: 1rem;

  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.green-bg {
  background-color: rgb(137, 219, 137);
}

.yellow-bg {
  background-color: rgb(246, 217, 72);
}

.red-bg {
  background-color: red;
  color: white;
}

li:hover {
  transform: translateY(-5px);
}

.toggle-button {
  background: none;
  background-color: #fff;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 6rem;
  margin: auto;
}

.toggle-button:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.task-details {
  margin-top: 10px;
}

.task-details p {
  margin: 5px 0;
}

select {
  margin-top: 5px;
  border-radius: 4px;
  padding: 5px;
}

.action-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.action-button.remove {
  background-color: #dc3545;
}

.action-button:hover {
  background-color: #218838;
}

.action-button.remove:hover {
  background-color: #c82333;
}

.dark-theme {
  background: linear-gradient(
    90deg,
    rgb(62, 6, 99) 23%,
    rgb(2, 38, 116) 62%,
    rgb(109, 4, 53) 71%
  );
  color: #0f0c29;
}

@media (max-width: 420px) {
  .flex-list {
  flex-direction: column;
}

ul {
  width: 100vw;
  min-height: 20vh;
}
}
</style>
