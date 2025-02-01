<template>
<div class="task-form-container">
    <h2>Добавить задачу</h2>
    <form @submit.prevent="submitTask">
      <div style="display: flex;">
      <input
        type="text"
        v-model="title"
        required
        placeholder="Заголовок задачи"
        style="width: 100%"
      />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div style="display: flex;">
      <textarea
        v-model="description"
        required
        placeholder="Описание задачи"
        style="width: 100%"
      ></textarea>
      <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>
      <div class="input-group" style="display: flex; align-items: center">
      <p style="padding-bottom: 1rem; padding-right: 1rem;">Срок выполнения:</p>
      <div class="data-cont" style="display: flex;">
      <input
        type="number"
        v-model.number="amount"
        min="1"
        max="30"
        required
        placeholder="Число (1-30)"
      />
      <select v-model="unit" required class="form-select">
        <option value="minutes">Минуты</option>
        <option value="hours">Часы</option>
        <option value="days">Дни</option>
        <option value="months">Месяцы</option>
        <option value="years">Годы</option>
      </select>
      </div>
      </div>
      <label style="display: flex; align-items: center">
        <p style="padding-bottom: 1rem; padding-right: 1rem;">Приоритет:</p>
      <select v-model="priority" required style="width: 100%">
        <option value="low" style="color: green">Низкий</option>
        <option value="medium" style="color: yellow">Средний</option>
        <option value="high"  style="color: red">Высокий</option>
      </select>
      </label>
      <button type="submit" class="submit-button">Добавить задачу</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: "",
      amount: 1,
      unit: "days",
      priority: "medium",
      errors: {}, // Для хранения ошибок валидации
    };
  },
  methods: {
    // ...mapActions(["addTask"]),
    ...mapActions("tasks", ["addTask"]), 
    submitTask() {
      this.errors = {}; // Сброс ошибок перед валидацией

      // Валидация
      if (this.title.length < 5) {
        this.errors.title = "Минимальная длина заголовка 5 символов.";
      }
      if (this.description.length < 5) {
        this.errors.description = "Минимальная длина описания 5 символов.";
      }

      if (Object.keys(this.errors).length > 0) {
        return; // Если есть ошибки, не продолжаем
      }

      // Создание задачи
      const now = new Date();
      const duration = this.calculateDuration(now, this.amount, this.unit);
      console.log(duration);
      const task = {
        id: Date.now(),
        createdAt: now,
        duration,
        title: this.title,
        description: this.description,
        priority: this.priority,
        amount: this.amount,
        unit: this.unit,
        status: "start",
      };
      this.addTask(task);
      this.resetForm();
      this.$router.push("/kanbantasks");
    },
    calculateDuration(date, amount, unit) {
      const multiplyFactor = {
        seconds: 1000,
        minutes: 1000 * 60,
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24,
        months: 1000 * 60 * 60 * 24 * 30,
        years: 1000 * 60 * 60 * 24 * 365,
      };
      // return date.getTime() + amount * multiplyFactor[unit];
      return amount * multiplyFactor[unit]; // срок задачи в миллисекундах
    },
    resetForm() {
      this.title = "";
      this.description = "";
      this.amount = 1;
      this.unit = "days";
      this.priority = "medium";
      this.errors = {}; 
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.task-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  font-weight: 700;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

form input,
form textarea,
form select {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  transition: border 0.3s;
}

form input:focus,
form textarea:focus,
form select:focus {
  border-color: #007bff;
  outline: none;
}

form textarea {
  resize: none;
  height: 100px;
}

.input-group {
  display: flex;
  justify-content: space-between;
}

.form-select {
  flex: 1;
  margin-left: 10px;
}

.submit-button {
  background-color: #42b983;
  color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #3da375;
  transform: translateY(-2px);
}

.low {
  color: green;
}
.medium {
  color: yellow;
}
.high {
  color: red;
}

@media (max-width: 400px) {
  .input-group, label {
    flex-direction: column;
  }

  .data-cont {
    width: 100%;
  }
}
</style>