<template>
  <div class="addtask">
    <Tasks />
  </div>
</template>

<script>
import Tasks from "@/components/Tasks.vue";

export default {
  name: "KanbanTasks",
  components: {
    Tasks
  },
};
</script>