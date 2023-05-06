<!-- AdminPanel.vue -->
<script>
import axios from "axios";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";

export default {
  name: "AdminPanel",
  components: {
    SiteHeader,
    SiteFooter
  },
  data() {
    return {
      teacher: {
        id: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        department: "",
        group: ""
      }
    };
  },
  created() {
    this.fetchTeacherInfo();
  },
  methods: {
    async fetchTeacherInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://37.252.0.155:8080/api/profile/get-teacher-info", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.teacher = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <div>
    <site-header></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Админ-панель преподавателя</div>
        <div class="teacher-info">
          <h2>Здравствуйте, {{ teacher.first_name }} {{ teacher.middle_name }}</h2>
          <p>Имя: {{ teacher.first_name }}</p>
          <p>Фамилия: {{ teacher.last_name }}</p>
          <p>Отчество: {{ teacher.middle_name }}</p>
          <p>Email: {{ teacher.email }}</p>
          <p>Кафедра: {{ teacher.department }}</p>
          <p>Группа: {{ teacher.group }}</p>
        </div>
        <div class="button-container">
          <a href="#" class="button">Список всех посылок</a>
          <router-link class="button" to="/CreateStudentAccount">
            <a>Создать аккаунт студента</a>
          </router-link>
          <router-link class="button" to="/ImportContest">
            <a>Импорт контеста из Ejudge</a>
          </router-link>
        </div>
      </main>
      <site-footer></site-footer>
    </div>
  </div>
</template>

<style>

.teacher-info {
  text-align: center;
  margin-bottom: 20px;
}

.teacher-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.button, .button a {
  color: #292929;
  display: block;
}

.button:hover {
  background-color: #999999;
}
</style>
