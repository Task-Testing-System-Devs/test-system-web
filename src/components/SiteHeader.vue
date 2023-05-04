<!-- SiteHeader.vue -->
<template>
  <header>
    <div class="header-container">
      <div class="logo">Лицей НИУ ВШЭ</div>
      <nav>
        <ul>
          <li><router-link to="/ParcelList">Мои посылки</router-link></li>
          <li><router-link to="/MyContestsList">Мои контесты</router-link></li>
          <li><router-link to="/GlobalRating">Рейтинг</router-link></li>
          <li><router-link to="/ContestsList">Все контесты</router-link></li>
        </ul>
      </nav>
      <div class="username">
        <a href="#">Иван Иванов</a>
        <div class="user-menu">
          <router-link v-if="userRole === 'admin'" to="/AdminPanel"><button>Админ-панель</button></router-link>
          <router-link v-else to="/StudentProfile"><button>Личный кабинет</button></router-link>
          <button @click="handleLogout">Выйти</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {logout} from "@/utils/logout";
import checkAuth from "@/utils/checkAuth";

export default {
  created() {
    checkAuth(this.$router);
  },
  name: "SiteHeader",
  data() {
    return {
      userRole: localStorage.getItem('role'),
    };
  },
  methods: {
    handleLogout() {
      logout(this);
    },
  },
};

</script>


<style>
.user-menu button {
    background-color: #0069d9;
    border-radius: 5px;
    border-color: #0069d9;
    color: #ffffff;
    font-weight: bold;
    width: 150px;
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
    width: 150px;
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
