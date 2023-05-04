<!-- ParcelsList.vue -->
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
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Мои посылки</div>
        <div class="myposts-container">
          <p>Общее количество посылок: 10</p>
          <div class="posts-list">
            <table>
              <thead>
              <tr>
                <th>Название задачи</th>
                <th>ID задачи</th>
                <th>ID посылки</th>
                <th>Сложность задачи</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Задача 1</td>
                <td>1</td>
                <td>12345</td>
                <td>Легко</td>
              </tr>
              <tr>
                <td>Задача 2</td>
                <td>2</td>
                <td>12346</td>
                <td>Средне</td>
              </tr>
              <tr>
                <td>Задача 3</td>
                <td>3</td>
                <td>12347</td>
                <td>Сложно</td>
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

</style>
