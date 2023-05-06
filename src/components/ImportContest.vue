<!-- ImportContest.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import axios from "axios";


export default {
  name: "ImportContest",
  components: {
    SiteHeader,
    SiteFooter
  },
  data() {
    return {
      processing: false,
      contestAdded: false,
      contestId: "",
      startTime: "",
      endTime: "",
      contestName: ""
    };
  },
  methods: {
    async importContest() {
      try {
        // Авторизация
        this.processing = true;
        this.contestAdded = false;
        const authResponse = await axios.post(
            "http://37.252.0.155:3000/auth",
            {
              login: "ejudge",
              password: "ejudge",
              contestID: this.contestId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        const response = await axios.get("http://37.252.0.155:3000/parseTasks", {});
        this.tasks = response.data.message;
        console.log(response.data.message);
        await this.sendContestToServer();
      } catch (error) {
        console.error(error);
      }
    },
    async sendContestToServer() {
      try {
        const tasks = this.tasks.map(task => ({
          title: task.title,
          description: task.description,
          memory_limit: parseInt(task.memoryLimit),
          time_limit: parseInt(task.timeLimit),
          attempts_amount: 100,
          classification_title: "type_1"
        }));
        const contestData = {
          title: this.contestName,
          start_time: this.startTime,
          finish_time: this.endTime,
          tasks: tasks
        };
        console.log(contestData);
        const response = await axios.post("http://37.252.0.155:8080/api/contest/add", contestData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.contestAdded = response.data === "New contest was successfully added to system";
      } catch (error) {
        console.error(error);
      } finally {
      this.processing = false;
    }
    }
  },
};
</script>

<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
      <main>
        <div class="form-container">
          <h2>Импорт контеста из Ejudge по ID</h2>
          <form @submit.prevent="importContest">
            <div class="form-group">
              <label for="contestId">ID:</label>
              <input type="text" id="contestId-name" name="contestId" required placeholder="12345" v-model="contestId">
            </div>
            <div class="timeField">
              <label for="startTime">Время начала:</label>
              <input type="datetime-local" id="startTime-name" name="startTime" required v-model="startTime">
            </div>
            <div class="timeField">
              <label for="endTime">Время окончания:</label>
              <input type="datetime-local" id="endTime-name" name="endTime" required v-model="endTime">
            </div>
            <div class="form-group">
              <label for="contestName">Название контеста:</label>
              <input type="text" id="contestName-name" name="contestName" required v-model="contestName">
            </div>
            <button type="submit" class="btn-save">Импортировать</button>
          </form>
          <div v-if="processing" class="processing-status">Обработка...</div>
          <div v-if="contestAdded" class="contest-added-status">Контест успешно добавлен!</div>
        </div>
      </main>
      <site-footer></site-footer>
    </div>
  </div>
</template>

<style>

.processing-status {
  color: orange;
}
.contest-added-status {
  color: green;
}
.form-group {
  margin-bottom: 20px;
  margin-top: 20px;
}
.form-group input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.btn-save {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
}

.btn-save:hover {
  background-color: #0069d9;
}

.form-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin: 50px auto;
  max-width: 600px;
  padding: 20px;
  color: #000;
}

.form-group input[type="text"] {
  width: 100%;
  box-sizing: border-box;
}

.timeField {
  width: 100%;
  margin-top: 10px;
}

</style>
