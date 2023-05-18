<!-- SiteHeader.vue -->
<script>
import {logout} from "@/utils/logout";
import checkAuth from "@/utils/checkAuth";
import axios from "axios";

export default {
  async created() {
    checkAuth(this.$router);
    this.userRole = this.$store.state.userRole;
    if (this.userRole === "teacher") {
      await this.fetchTeacherInfo();
    } else if (this.userRole === "student") {
      await this.fetchStudentInfo();
    }
  },
  name: "SiteHeader",
  data() {
    return {
      userRole: "",
      isNavVisible: false,
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
  <header v-cloak>
    <div class="header-container">
      <div class="left-section">
        <img class="logo" src="../assets/logo.svg" width="75" height="75" alt="logo"/>
        <div class="logo">Лицей НИУ ВШЭ</div>
      </div>
      <div class="nav-container" v-bind:class="{ 'show': isNavVisible }">
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
      <button class="hamburger" @click="isNavVisible = !isNavVisible">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <div class="username" style="min-width: 200px;">
        <a href="#">
          <span v-if="user.first_name">{{ user.first_name }} {{ user.middle_name }}</span>
          <span v-else>Загрузка...</span>
        </a>
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
  flex-direction: column;
  align-items: center;
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
.hamburger {
  display: none;
  position: absolute;
  right: 15px;
  z-index: 1;
}

.hamburger-box {
  width: 40px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}

.hamburger-inner, .hamburger-inner:before, .hamburger-inner:after {
  width: 40px;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}

.hamburger-inner:before, .hamburger-inner:after {
  content: "";
  display: block;
}

.hamburger-inner:before {
  top: -10px;
}

.hamburger-inner:after {
  bottom: -10px;
}

.hamburger.show .hamburger-inner {
  transform: rotate(45deg);
}

.hamburger.show .hamburger-inner:before {
  transform: rotate(-45deg);
  top: 0;
}

.hamburger.show .hamburger-inner:after {
  transform: rotate(-45deg);
  bottom: 0;
}

.nav-container {
  margin-top: 30px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transition: all 0.3s;
  transform: translateY(-120%);
  display: flex;
  justify-content: center;
}


.nav-container.show {
  transform: translateY(0%);
}

@media screen and (min-width: 768px) {
  nav ul {
    flex-direction: row;
  }
  .nav-container, .hamburger {
    position: static;
    transform: none;
  }
  .nav-container {
    display: flex;
  }

  .hamburger {
    display: none;
  }

  .header-container {
    flex-direction: row;
  }
}
</style>
