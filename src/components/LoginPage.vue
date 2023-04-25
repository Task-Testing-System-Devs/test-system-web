<!-- LoginPage.vue -->
<script>
export default {
  data() {
    return {
      errorMessage: ''
    };
  },
  methods: {
    submitForm() {
      // Здесь можно добавить код для проверки учетных данных пользователя, например, отправить запрос на сервер
      // Если аутентификация прошла успешно, выполните следующую строку:
      this.$router.push('/StudentProfile');
      this.$router.push('/AdminPanel')
    }
  }
}
</script>

<template>
  <div>
    <header>
      <div class="header-container">
        <img class="logo" src="../assets/logo.svg" width="75" height="75" alt="logo"/>
        <div class="logo">Лицей НИУ ВШЭ</div>
        <div class="username">Войти</div>
      </div>
    </header>
  </div>
  <main>
    <div class="login-container">
      <h1>Авторизация</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="example@edu.hse.ru" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button id="login-button" type="submit" class="button center gray" @click="submitForm">Войти</button>
      </form>
      <div id="error-message">{{ errorMessage }}</div>
      <p>Нет аккаунта? <a href="#">Свяжитесь с преподавателем</a></p>
    </div>
  </main>
  <footer>
    <div class="footer-container">
      <p>2023 Лицей НИУ ВШЭ.</p>
    </div>
  </footer>
</template>

<style>

</style>
