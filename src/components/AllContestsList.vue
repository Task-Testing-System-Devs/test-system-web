<!-- AllContestsList.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
export default {
  name: "ContestsList",
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
    <site-header></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Список контестов</div>
        <div class="myposts-container">
          <p>Всего контестов в системе: 3</p>
          <div class="posts-list">
            <table>
              <thead>
              <tr>
                <th>Название контеста</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Ссылка на контест</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Контест 1 - Жадные алгоритмы</td>
                <td>15.02.2023 - 9:00:00</td>
                <td>25.02.2023 - 23:59:59</td>
                <td><button>Перейти</button></td>
              </tr>
              <tr>
                  <td>Контест 2 - Бинарные деревья</td>
                  <td>15.03.2023 - 9:00:00</td>
                  <td>25.03.2023 - 23:59:59</td>
                  <td><button>Перейти</button></td>
              </tr>
              <tr>
                  <td>Контест 3 - КЧД</td>
                  <td>15.04.2023 - 9:00:00</td>
                  <td>25.04.2023 - 23:59:59</td>
                  <td><button>Перейти</button></td>
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
