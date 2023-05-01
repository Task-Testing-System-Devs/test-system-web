<!-- AdminPanel.vue -->
<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Контест 1</div>
        <div class="content-container">
          <section class="task-container">
            <div class="task-switch">
              <button class="task-button" id="task1" @click="updateTask(1)">1 - OK</button>
              <button class="task-button" id="task2" @click="updateTask(2)">2 - WA</button>
              <button class="task-button" @click="updateTask(3)">3 - N/A</button>
              <button class="task-button" @click="updateTask(4)">4 - N/A</button>
            </div>
            <h2 id="task-title">{{ taskTitle }}</h2>
            <p id="task-description" class="task-desc">{{ taskDescription }}</p>
            <h3>Примеры входных и выходных данных:</h3>
            <pre id="task-io">
          <span class="io-header">Ввод:</span>
          <span class="input-example">4 3 1 2 1 4 0 2 2 0 4 3 2 0 2 1 0
            </span>
          <span class="io-header">Вывод:</span>
          <span class="output-example">2</span>
          </pre>
            <p>Сложность: <span class="difficulty">20</span></p>
            <h3>Последняя посылка: <span class="last-status">OK</span></h3>
            <h3>Последние 4 посылки:</h3>
            <ol class="submissions">
              <li>Посылка 1 - RE</li>
              <li>Посылка 2 - WA1</li>
              <li>Посылка 3 - WA9</li>
              <li>Посылка 4 - OK</li>
            </ol>
            <div class="submit-container">
              <input type="file" id="solution" name="solution">
              <select name="language" id="language">
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button type="submit">Отправить</button>
            </div>
          </section>
        </div>
      </main>
      <site-footer></site-footer>
    </div>
  </div>
</template>

<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import {logout} from "@/utils/logout.js";

export default {
  name: "Contest",
  components: {
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      taskTitle: "A. Конструктивная задача",
      taskDescription: "Описание задачи A...",
    };
  },
  methods: {
    handleLogout() {
      logout(this);
    },
    updateTask(taskNumber) {
      if (taskNumber === 1) {
        this.taskTitle = "A. Первая задача";
        this.taskDescription = "Описание задачи А...";
      } else if (taskNumber === 2) {
        this.taskTitle = "B. Вторая задача";
        this.taskDescription = "Описание задачи B...";
      } else if (taskNumber === 3) {
        this.taskTitle = "C. Третья задача";
        this.taskDescription = "Описание задачи C...";
      } else if (taskNumber === 4) {
        this.taskTitle = "D. Четвертая задача";
        this.taskDescription = "Описание задачи D...";
      }
    },
  },
};
</script>

<style>
.task-container {
  text-align: center;
  background-color: #252E40;
}

h2, h3 {
  margin-bottom: 10px;
}

pre {
  background-color: #4f618e;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  display: inline-block;
  text-align: left;
  margin: 0;
  white-space: pre-wrap;
}

.difficulty {
  font-weight: bold;
}

.submissions {
  padding-left: 20px;
  display: inline-block;
  text-align: left;
}

.submit-container {
  margin-top: 20px;
  display: inline-block;
  text-align: left;
}

input[type="file"] {
  margin-bottom: 10px;
}

select {
  margin-bottom: 10px;
  display: block;
}

button[type="submit"] {
  background-color: #4f618e;
  border: none;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
}

button[type="submit"]:hover {
  background-color: #6c7cb5;
}

.task-switch {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.task-button {
  background-color: #4f618e;
  border: none;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
}

.task-button:hover {
  background-color: #6c7cb5;
}

.input-example,
.output-example {
  display: block;
  white-space: pre-wrap;
}

.io-header {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.task-desc {
  padding: 30px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px); /* Вычитаем высоту футера */
}
</style>
