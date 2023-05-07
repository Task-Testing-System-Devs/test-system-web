<!-- MyContestsList.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import axios from "axios";

export default {
  name: "ContestsList",
  components: {
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      contests: [],
    };
  },
  methods: {
    async fetchContests() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://37.252.0.155:8080/api/contest/get-all", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.contests = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchContests();
  },
};
</script>

<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Мои контесты</div>
        <div class="myposts-container">
          <p>Всего контестов в системе: {{ contests.length }}</p>
          <div class="posts-list">
            <table>
              <thead>
              <tr>
                <th>ID в Ejudge</th>
                <th>Название контеста</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Ссылка на контест</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(contest, index) in contests" :key="index">
                <td>{{ contest.ejudge_id }}</td>
                <td>{{ contest.title }}</td>
                <td>{{ new Date(contest.start_time).toLocaleString() }}</td>
                <td>{{ new Date(contest.finish_time).toLocaleString() }}</td>
                <td>
                  <router-link :to="{ name: 'Contest', params: { contestId: contest.ejudge_id } }">
                    <button>Перейти</button>
                  </router-link>
                </td>
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
.posts-list button {
  background-color: #0069d9;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  border-color: #0069d9;
  color: #ffffff;
  font-weight: bold;
  width: 150px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.posts-list button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.posts-list button:active {
  background-color: #004085;
  transform: translateY(0);
}

.posts-list button:focus {
  outline: none;
}
</style>
