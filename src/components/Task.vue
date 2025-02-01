  <!-- не вышло сохранить измененный статус после обновления страницы  -->
<template>
<li>
    <div><strong>Заголовок:</strong> {{ task.title }}</div>

    <button @click="toggleDetails">
      {{ task.showDetails ? "Скрыть" : "Показать еще" }}
    </button>

    <div v-if="task.showDetails">
      <div><strong>Описание:</strong> {{ task.description }}</div>
      <div><strong>Приоритет:</strong> {{ task.priority }}</div>
      <div><strong>Задача создана:</strong> {{ formatDate(task.createdAt) }}</div>
      <div><strong>Время выполнения:</strong> {{ task.amount }} {{ task.unit }}</div>
      <div><strong>Времени прошло:</strong> {{ timeElapsed(task) }}</div>
      <div>
        <strong>Статус:</strong>
        <select v-model="task.status" @change="updateStatus">
          <option value="start">Создана</option>
          <option value="inwork">В работе</option>
          <option value="finish">Готова</option>
        </select>
      </div>
      <button @click="editTask">Редактировать</button>
      <button @click="removeTask">Удалить</button>
    </div>
    <hr />
    </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  created() {
  this.$store.dispatch("loadTasks"); // Загружаем задачи при создании компонента
},
  emits: ['updateStatus','editTask', 'removeTask'], 
  methods: {
    toggleDetails() {
      this.task.showDetails = !this.task.showDetails;
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    timeElapsed(task) {
      const now = new Date();
      const elapsedTime = Math.floor((now - new Date(task.createdAt)) / 1000);
      console.log("elapsedTime:", elapsedTime * 1000);
      const days = Math.floor(elapsedTime / (60 * 60 * 24));
      const hours = Math.floor((elapsedTime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((elapsedTime % (60 * 60)) / 60);
      const seconds = elapsedTime % 60;

      // Форматируем результат
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
    updateStatus() {
      this.$emit('updateStatus', this.task);
    //   this.$store.dispatch("updateTask", updatedTask);
    },
    editTask() {
      this.$emit('editTask', this.task);
    },
    removeTask() {
      this.$emit('removeTask', this.task.id);
    },
  },
};
</script>

<style scoped>
strong {
  color: #333;
}
</style>
