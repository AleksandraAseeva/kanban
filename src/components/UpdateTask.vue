 <template>
  <div v-if="task" class="edit-task-container">
    <h2 class="form-title">Редактировать задачу</h2>
    <form @submit.prevent="saveTask" class="edit-task-form">
      <input v-model="task.title" placeholder="Заголовок" />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
      <input v-model="task.description" placeholder="Описание" />
      <span v-if="errors.description" class="error">{{ errors.description }}</span>
      <div class="input-group">
        <input
          type="number"
          v-model.number="task.amount"
          min="1"
          max="30"
          required
          placeholder="Число (1-30)"
          class="form-input"
        />
        <select v-model="task.unit" required class="form-select form-select-days">
          <option value="minutes">Минуты</option>
          <option value="hours">Часы</option>
          <option value="days">Дни</option>
          <option value="months">Месяцы</option>
          <option value="years">Годы</option>
        </select>
      </div>
      <select v-model="task.priority" required class="form-select">
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>
      <button @click="saveTask" class="submit-button">Сохранить</button>
    </form>
  </div>
  <div v-else>
    <p>Задача не найдена.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    // ...mapGetters(["getTaskById"]),
    ...mapGetters("tasks", ["getTaskById"]),
  },
  data() {
    return {
      task: {
        title: "",
        description: "",
        priority: "medium",
        amount: "1",
        unit: "hours",
        duration: 0,
        status: "start",
      },
      errors: {},
    };
  },
  created() {
    const taskId = this.$route.query.id;
    // Загрузка информации о задаче из Vuex по ID
    // this.task = this.$store.getters.getTaskById(taskId);
    this.task = this.$store.getters["tasks/getTaskById"](taskId); // Используем пространство имен
    if (!this.task) {
      console.error("Task not found");
      this.$router.push("/addtask");
    } else {
      // Установите duration при загрузке задачи
      this.updateDuration();
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]), // Используем пространство имен для действия

    computeDuration(amount, unit) {
      switch (unit) {
        case "minutes":
          return amount * 60 * 1000;
        case "hours":
          return amount * 60 * 60 * 1000;
        case "days":
          return amount * 24 * 60 * 60 * 1000;
        case "months":
          return amount * 30 * 24 * 60 * 60 * 1000;
        case "years":
          return amount * 365 * 24 * 60 * 60 * 1000;
        default:
          return 0;
      }
    },
    updateDuration() {
      this.task.duration = this.computeDuration(
        this.task.amount,
        this.task.unit
      );
    },
    saveTask() {
      this.errors = {}; 
       // Валидация заголовка
      if (this.task.title.length < 5) {
        this.errors.title = "Минимальная длина заголовка 5 символов.";
      }

      // Валидация описания
      if (this.task.description.length < 5) {
        this.errors.description = "Минимальная длина описания 5 символов.";
      }

      // Если есть ошибки, прекращаем выполнение
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      // Обновляем duration перед сохранением
      this.updateDuration();

      // Диспатч обновления задачи в хранилище Vuex
      // this.$store.dispatch("updateTask", this.task);
      this.updateTask(this.task); // Используем маппинг действия
      this.$router.push("/kanbantasks"); // Вернуться на страницу со списком задач
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.edit-task-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.form-title {
  text-align: center;
  color: #333;
  font-weight: 700;
  margin-bottom: 20px;
}

.edit-task-form {
  display: flex;
  flex-direction: column;
}

form input,
.form-select {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  transition: border 0.3s;
}

form input:focus,
.form-select:focus {
  border-color: #007bff;
  outline: none;
}

.input-group {
  display: flex;
  justify-content: space-between;
}

.form-select-days {
  flex: 1;
  margin-left: 10px;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}
</style>