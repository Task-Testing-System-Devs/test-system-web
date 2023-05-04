<!-- AdminPanel.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
export default {
  name: "AdminPanel",
  components: {
    SiteHeader,
    SiteFooter
  },
};
</script>

<template>
  <div>
    <site-header></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Админ-панель преподавателя</div>
        <div class="button-container">
          <a href="#" class="button">Список всех посылок</a>
          <router-link class="button" to="/CreateStudentAccount">
            <a>Создать аккаунт студента</a>
          </router-link>
          <router-link class = "button" to="/ImportContest">
            <a>Импорт контеста из Ejudge</a>
          </router-link>
        </div>
      </main>
      <site-footer></site-footer>
    </div>
  </div>
</template>

<style>

.button, .button a {
  color: #292929;
  display: block;
}
.button:hover {
  background-color: #999999;
}
</style>
