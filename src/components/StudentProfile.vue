<!-- StudentProfile.vue -->
<script>
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import axios from 'axios';

export default {
  name: 'StudentProfile',
  components: {SiteFooter, SiteHeader},
  data() {
    return {
      studentInfo: {},
    };
  },
  methods: {
    handleLogout() {
      logout(this);
    },
    async getStudentInfo() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://37.252.0.155:8080/api/profile/get-student-info', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.headers);
        this.studentInfo = response.data;
      } catch (error) {
        console.error('Ошибка при получении информации о профиле студента:', error);
      }
    },
  },
  async mounted() {
    await this.getStudentInfo();
  },
};
</script>

<template>
  <div>
    <site-header></site-header>
    <main class="content">
      <div class="profile-container">
        <h1>Мой профиль</h1>
        <p>Имя: {{ studentInfo.first_name }} {{ studentInfo.last_name }}</p>
        <p>Направление: {{ studentInfo.department }}</p>
        <p>Группа: {{ studentInfo.group }}</p>
      </div>
      <div class="info">
        <h2>Личная информация</h2>
        <ul>
          <li><span>ID:</span> <span>{{ studentInfo.id }}</span></li>
          <li><span>Эл.почта:</span> <span>{{ studentInfo.email }}</span></li>
          <li><span>Класс:</span> <span>{{ studentInfo.department }}</span></li>
          <li><span>Программа:</span> <span>{{ studentInfo.department }}</span></li>
          <li><span>Группа:</span> <span>{{ studentInfo.group }}</span></li>
        </ul>
      </div>
      <div class="rating-container">
        <h1>Мой рейтинг</h1>
        <div class="rating-box">
          <h2>Место в рейтинге по оценкам</h2>
          <p>5</p>
        </div>
        <div class="rating-box">
          <h2>Место в рейтинге по задачам</h2>
          <p>2</p>
        </div>
      </div>
    </main>
    <site-footer></site-footer>
  </div>
</template>

<style>
.rating-container {
  margin: 50px auto;
  max-width: 800px;
  text-align: center;
}

.rating-container h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.rating-box {
  background-color: #2f2f2f;
  color: #fff;
  padding: 20px;
  margin-bottom: 20px;
}

.rating-box h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.rating-box p {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 0;
}
</style>
