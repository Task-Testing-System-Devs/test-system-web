<!-- SiteHeader.vue -->
<script>
import {logout} from "@/utils/logout";
import checkAuth from "@/utils/checkAuth";
import axios from "axios";

export default {
  created() {
    checkAuth(this.$router);
    if (this.userRole === "teacher") {
      this.fetchTeacherInfo();
    } else if (this.userRole === "student") {
      this.fetchStudentInfo();
    }
  },
  name: "SiteHeader",
  data() {
    return {
      userRole: localStorage.getItem('role'),
      user: {
        id: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        department: "",
        group: ""
      },
    };
  },
  methods: {
    handleLogout() {
      logout(this);
    },
    async fetchTeacherInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://37.252.0.155:8080/api/profile/get-teacher-info", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchStudentInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://37.252.0.155:8080/api/profile/get-student-info", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
};

</script>

<template>
  <header>
    <div class="header-container">
      <div class="left-section">
        <img class="logo" src="../assets/logo.svg" width="75" height="75" alt="logo"/>
        <div class="logo">Лицей НИУ ВШЭ</div>
      </div>
      <div class="nav-container">
        <nav>
          <ul>
            <li v-if="userRole === 'student'">
              <router-link to="/ParcelList">Мои посылки</router-link>
            </li>
            <li v-else-if="userRole === 'teacher'">
              <router-link to="/ParcelList">Мои посылки</router-link>
            </li>
            <li>
              <router-link to="/MyContestsList">Мои контесты</router-link>
            </li>
            <li>
              <router-link to="/GlobalRating">Рейтинг</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="username">
        <a href="#">{{ user.first_name }} {{ user.middle_name }}</a>
        <div class="user-menu">
          <router-link v-if="userRole === 'teacher'" to="/AdminPanel">
            <button>Админ-панель</button>
          </router-link>
          <router-link v-else to="/StudentProfile">
            <button>Личный кабинет</button>
          </router-link>
          <button @click="handleLogout">Выйти</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.left-section {
  display: flex;
  align-items: center;
}

.left-section img {
  margin-right: 20px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  background-color: #252E40;
  padding: 0 30px;
  position: relative;
}

.nav-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

nav ul {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

nav ul li {
  margin: 0 15px;
}

.user-menu button {
  background-color: #0069d9;
  border-radius: 5px;
  border-color: #0069d9;
  color: #ffffff;
  font-weight: bold;
  width: 200px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.user-menu button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.user-menu button:active {
  background-color: #004085;
  transform: translateY(0);
}

.user-menu button:focus {
  outline: none;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  background-color: #252E40;
  padding: 0 30px;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
}

.username {
  color: #fff;
  font-weight: bold;
  padding-left: 50px;
}

.username {
  position: relative;
}

.username .user-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: #2f2f2f;
  transition: all 0.5s ease;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition-delay: 0.5s;
}

.username:hover .user-menu {
  display: block;
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}

.username .user-menu button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.username .user-menu button:hover {
  background-color: #444;
}
</style>
