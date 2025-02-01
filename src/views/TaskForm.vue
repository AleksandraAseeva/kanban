<template>
  <div class="addtask">
    <AddTask />
  </div>
</template>

<script>
import AddTask from "@/components/AddTask.vue";

export default {
  name: "TaskForm",
  components: {
    AddTask,
  },
};
</script>