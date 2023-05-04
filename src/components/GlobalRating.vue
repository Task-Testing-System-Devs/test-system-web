<!-- ParcelsList.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import axios from 'axios';
export default {
  name: "AdminPanel",
  components: {
    SiteHeader,
    SiteFooter
  },
  data() {
    return {
      ratingType: 'marks',
      ratingData: []
    };
  },
  methods: {
    async getRatingData() {
      const token = localStorage.getItem('token');
      const endpoint = this.ratingType === 'marks'
          ? 'http://37.252.0.155:8080/api/grade/by-marks'
          : 'http://37.252.0.155:8080/api/grade/by-tasks-amount';

      try {
        const response = await axios.get(endpoint, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        console.log(response);
        this.ratingData = response.data;
      } catch (error) {
        console.error('Ошибка при получении рейтинга:', error);
      }
    },
    async changeRating(type) {
      this.ratingType = type;
      await this.getRatingData();
    }
  },
  async mounted() {
    await this.getRatingData();
  }
};
</script>

<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">
          <button @click="changeRating('marks')">Рейтинг по оценкам</button>
          <button @click="changeRating('tasks')">Рейтинг по задачам</button>
        </div>
        <div class="myposts-container">
          <p>Общее количество человек:</p>
          <div class="posts-list">
            <table>
              <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Факультет</th>
                <th>Группа</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in ratingData" :key="item.id">
                <td>{{ item.userShortInfo.firstName }}</td>
                <td>{{ item.userShortInfo.lastName }}</td>
                <td>{{ item.userShortInfo.middleName }}</td>
                <td>{{ item.userShortInfo.email }}</td>
                <td>{{ item.userShortInfo.role }}</td>
                <td>{{ item.userShortInfo.departmentName }}</td>
                <td>{{ item.userShortInfo.groupName }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <site-footer></site-footer>
    </div>
  </div>
</template>

<style>
.main-headline {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.main-headline button {
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: #555;
  font-size: 16px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.main-headline button:hover {
  background-color: #ddd;
}

.myposts-container {
  width: 100%;
}

.posts-list {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: #fff;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
