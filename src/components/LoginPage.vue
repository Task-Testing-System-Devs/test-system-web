// LoginPage.vue
<script>
import axios from 'axios';
import SiteFooter from "@/components/SiteFooter.vue";

export default {
  components: {SiteFooter},
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      const requestData = {
        email: this.email,
        password: this.password
      };
      console.log('Request data:', requestData);
      try {
        const response = await axios.post('http://37.252.0.155:8080/api/auth/login', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Response data:', response.data);
        localStorage.setItem('token', response.data.token);
        if (response.data) {
          const role = response.data.role;
          localStorage.setItem('role', response.data.role);
          if (role === 'student') {
            this.$router.push('/StudentProfile');
          } else if (role === 'teacher') {
            this.$router.push('/AdminPanel');
          } else {
            this.errorMessage = 'Неизвестный тип пользователя';
          }
        } else {
          this.errorMessage = 'Неверный адрес электронной почты или пароль';
        }
      } catch (error) {
        console.log('Error:', error);
        // Проверка ошибок, связанных с сетью или CORS
        if (error.response) {
          this.errorMessage = 'Ошибка сервера, пожалуйста, попробуйте позже';
        } else if (error.request) {
          this.errorMessage = 'Ошибка сети, пожалуйста, проверьте ваше интернет-соединение';
        } else {
          this.errorMessage = 'Ошибка при отправке запроса';
        }
      }
    }
  },
}
</script>

<template>
  <div>
    <header>
      <div class="header-container">
        <img class="logo" src="../assets/logo.svg" width="75" height="75" alt="logo"/>
        <div class="logo">Лицей НИУ ВШЭ</div>
      </div>
    </header>
  </div>
  <div class="content-wrapper">
    <main>
      <div class="login-container">
        <h1>Авторизация</h1>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" v-model="email" placeholder="example@edu.hse.ru" required>
          </div>
          <div class="form-group">
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" v-model="password" required>
          </div>
          <button id="login-button" type="submit" class="button center gray">Войти</button>
          <div id="error-message" class="error-message">{{ errorMessage }}</div>
        </form>
        <p>Нет аккаунта? <a href="#">Свяжитесь с преподавателем</a></p>
      </div>
    </main>
    <site-footer></site-footer>
  </div>
</template>

<style>
.error-message {
  display: block;
  color: red;
  margin-top: 10px;
  text-align: center;
}

form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  margin-top: 20px;
}

</style>

