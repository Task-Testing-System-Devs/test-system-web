<!-- CreateStudentAccount.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
export default {
  name: "AdminPanel",
  components: {
    SiteHeader,
    SiteFooter
  },
  methods: {
  },
};
</script>

<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
    <main>
      <div class="form-container">
        <h2>Создание профиля</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="first-name">Имя:</label>
            <input type="text" id="first-name" name="first-name" v-model="firstName" required>
          </div>
          <div class="form-group">
            <label for="last-name">Фамилия:</label>
            <input type="text" id="last-name" name="last-name" required>
          </div>
          <div class="form-group">
            <label for="last-name">Отчество:</label>
            <input type="text" id="last-name" name="last-name" required>
          </div>
          <div class="form-group">
            <label for="email">Почта:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="email">Роль:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <div class="form-group">
            <label for="email">Направление:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="email">Группа:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <button type="submit" class="btn-save">Сохранить</button>
        </form>
      </div>
    </main>
      <site-footer></site-footer>
      </div>
  </div>
</template>

<style>
.form-group {
    margin-bottom: 20px;
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
.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
    width: 100%;
    box-sizing: border-box;
}
</style>
