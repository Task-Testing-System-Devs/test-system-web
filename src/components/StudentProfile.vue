<!-- StudentProfile.vue -->
<script>
export default {
  name: 'StudentProfile',
}
</script>

<template>
  <div>
    <header>
      <div class="header-container">
        <div class="logo">Лицей НИУ ВШЭ</div>
        <nav>
          <ul>
            <li><a href="#">Моя профиль</a></li>
            <li><a href="#">Рейтинг</a></li>
            <li><a href="#">Мои контесты</a></li>
          </ul>
        </nav>
        <div class="username">
          <a href="#">Иван Иванов</a>
          <div class="user-menu">
            <button>Личный кабинет</button>
            <button>Выйти</button>
          </div>
        </div>
      </div>
    </header>
    <main class="content">
      <div class="profile-container">
        <h1>Мой профиль</h1>
        <p>Имя: Иван Иванов</p>
        <p>Направление: Программная инженерия</p>
        <p>Группа: ПИ17-1</p>
      </div>
      <div class="info">
        <h2>Личная информация</h2>
        <ul>
          <li><span>ID:</span> <span id="id"></span></li>
          <li><span>Эл.почта:</span> <span id="mail"></span></li>
          <li><span>Класс:</span> <span id="class"></span></li>
          <li><span>Программа:</span> <span id="program"></span></li>
          <li><span>Группа:</span> <span id="group"></span></li>
          <li><span>Всего решено заданий:</span> <span id="tasks"></span></li>
          <li><span>Рейтинг по заданиям:</span> <span id="task-rating"></span></li>
          <li><span>Рейтинг по оценкам:</span> <span id="grade-rating"></span></li>
        </ul>
      </div>
      <div class="rating-container">
        <h1>Мой рейтинг</h1>
        <div class="rating-box">
          <h2>Место в рейтинге по направлению</h2>
          <p>5</p>
        </div>
        <div class="rating-box">
          <h2>Место в рейтинге по группе</h2>
          <p>2</p>
        </div>
        <div class="rating-box">
          <h2>Место в общем рейтинге</h2>
          <p>12</p>
        </div>
      </div>
    </main>
    <footer>
      <div id="footer" class="footer-container">
        <p>2023 Лицей НИУ ВШЭ.</p>
      </div>
    </footer>
  </div>
</template>

<style>

</style>
