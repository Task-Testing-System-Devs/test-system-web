<!-- Contest.vue -->

<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import axios from "axios";

export default {
  name: "Contest",
  computed: {
    contestName() {
      return localStorage.getItem('contestName');
    },
    formattedInputExamples() {
      if (this.currentTask && this.currentTask.inputExamples) {
        return this.currentTask.inputExamples.join("\n");
      }
      return "";
    },
    formattedOutputExamples() {
      if (this.currentTask && this.currentTask.outputExamples) {
        return this.currentTask.outputExamples.join("\n");
      }
      return "";
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      processing: false,
      failureTest: null,
      solutionStatus: null,
      selectedFile: null,
      tasks: [],
      currentTask: null,
      taskTitle: "",
      taskDescription: "",
      contestName: localStorage.getItem('contestName'),
      selectedLanguage: "cpp",
      languageName: "python3",
      submissions: [],
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const authData = await this.authenticate();
        if (authData) {
          const response = await axios.get("http://37.252.0.155:3000/parseTasks", {});
          this.tasks = response.data.message;
          this.updateTask(1);
        } else {
          console.error("Не удалось произвести авторизацию");
        }
      } catch (error) {
        console.error("Ошибка при получении задач с сервера:", error);
      }
    },
    onLanguageChange(event) {
      this.selectedLanguage = event.target.value;
      this.languageName = event.target.options[event.target.selectedIndex].text;
    },
    updateTask(taskNumber) {
      const task = this.tasks.find((task) => task.probId === String(taskNumber));
      if (task) {
        this.currentTask = task;
        this.taskTitle = task.title;
        this.taskDescription = task.description;
      } else {
        this.taskTitle = "";
        this.taskDescription = "";
      }
    },
    async authenticate() {
      try {
        const contestID = localStorage.getItem('contestId');
        console.log("Загружаю контест с id: ", contestID);
        const authResponse = await axios.post(
            "http://37.252.0.155:3000/auth",
            {
              login: "ejudge",
              password: "ejudge",
              "contestID": contestID,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        console.log(authResponse.data);
        return authResponse.data;
      } catch (error) {
        console.error("Ошибка при авторизации:", error);
        return null;
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      } else {
        console.error("Файл не выбран");
      }
    },

    async convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });
    },
    async readFileAsText(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async submitSolution() {
      if (this.selectedFile) {
        const base64File = await this.convertFileToBase64(this.selectedFile);
        const code = await this.readFileAsText(this.selectedFile);
        try {
          this.processing = true; // Устанавливаем processing в true перед отправкой решения
          const response = await axios.post("http://37.252.0.155:3000/handleSolution", {
            solutionFileBase64: base64File,
            taskID: this.currentTask.probId,
            language: this.selectedLanguage,
          });
          console.log(response.data);
          await this.fetchResult(code); // Вызываем метод fetchResult после отправки решения
        } catch (error) {
          console.error("Ошибка при отправке решения:", error);
        } finally {
          this.processing = false; // Устанавливаем processing в false после получения результата
        }
      } else {
        console.error("Файл не выбран");
      }
    },
    async submitSolutionToServer(code) {
      try {
        console.log(code, this.languageName, this.solutionStatus, this.failureTest, this.taskTitle);
        const response = await axios.post(
            "http://37.252.0.155:8080/api/solutions/add",
            {
              code: code,
              language: this.languageName,
              status: this.solutionStatus,
              used_time: 0.2,
              used_memory: 2.8,
              error_test: this.failureTest,
              contest_name: localStorage.getItem('contestName'),
              task_name: this.taskTitle,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
        );
        console.log(response.data);

        this.submissions.unshift({
          attempt: this.submissions.length + 1,
          language: this.languageName,
          status: this.solutionStatus,
        });
        this.submissions = this.submissions.slice(0, 4);
      } catch (error) {
        console.error("Ошибка при отправке решения на сервер:", error);
      }
    },

    async fetchResult(code) {
      try {
        const response = await axios.get("http://37.252.0.155:3000/getResult");
        const {status, error} = response.data;
        this.solutionStatus = status;
        this.failureTest = error;

        // Вызываем метод submitSolutionToServer после получения результата
        await this.submitSolutionToServer(code);
      } catch (error) {
        console.error("Ошибка при получении результата:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <site-header></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">{{ contestName }}</div>
        <div class="content-container">
          <section class="task-container">
            <div class="task-switch">
              <button
                  v-for="(task, index) in tasks"
                  :key="task.probId"
                  class="task-button"
                  :id="'task' + task.probId"
                  @click="updateTask(task.probId)"
              >
                {{ index + 1 }} - {{ task.title }}
              </button>
            </div>

            <h2 id="task-title">{{ taskTitle }}</h2>
            <p id="task-description" class="task-desc">{{ taskDescription }}</p>
            <h3>Примеры входных и выходных данных:</h3>
            <pre id="task-io"><span class="io-header">Ввод:</span><span class="input-example">{{ formattedInputExamples }}</span><span class="io-header">Вывод:</span><span class="output-example">{{ formattedOutputExamples }}</span></pre>
            <p>Сложность: <span class="difficulty">20</span></p>
            <h3>Последняя посылка: <span class="last-status">{{ solutionStatus }}</span></h3>
            <h3>Ошибка на тесте: <span class="last-status">{{ failureTest }}</span></h3>
            <h3>Последние 4 посылки:</h3>
            <div class="table-container">
              <table class="submissions">
                <thead>
                <tr>
                  <th>№</th>
                  <th>Язык</th>
                  <th>Вердикт</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="submission in submissions" :key="submission.attempt">
                  <td>{{ submission.attempt }}</td>
                  <td>{{ submission.language }}</td>
                  <td>{{ submission.status }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="submit-container">
              <input type="file" id="solution" name="solution" @change="onFileChange">
              <select name="language" id="language" @change="onLanguageChange">
                <option value=""></option>
                <option value="2">gcc - GNU C 11.3.0</option>
                <option value="3">g++ - GNU C++ 11.3.0</option>
                <option value="13">python - Python 2.7.18</option>
                <option value="14">perl - Perl 5.34.0</option>
                <option value="23">python3 - Python3 3.10.6</option>
                <option value="25">make - Make 4.3</option>
                <option value="50">nasm-x86 - NASM 2.15.05</option>
                <option value="51">clang - clang C 14.0.0-1ubuntu1</option>
                <option value="52">clang++ - clang C++ 14.0.0-1ubuntu1</option>
                <option value="54">make-vg - Make (valgrind) 4.3</option>
                <option value="57">gcc-32 - GNU C (32 bit) 11.3.0</option>
                <option value="61">clang-32 - clang C (32 bit) 14.0.0-1ubuntu1</option>
                <option value="66">gas-32 - GNU AS (32 bit) 11.3.0</option>
                <option value="67">gas - GNU AS 11.3.0</option>
                <option value="77">custom - Custom 1</option>
              </select>
              <button type="submit" @click.prevent="submitSolution">Отправить</button>
              <!-- Надпись "Обработка..." будет отображаться, когда processing имеет значение true -->
              <div v-if="processing" class="processing-status">Обработка...</div>
            </div>
          </section>
        </div>
      </main>
      <site-footer></site-footer>
    </div>
  </div>
</template>

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

.submit-container {
  margin-top: 20px;
  display: inline-block;
  text-align: left;
}

.table-container {
  width: 80%;
  margin: 0 auto;
}

.submissions {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
  background-color: #252E40;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.submissions th,
.submissions td {
  border: 1px solid #ffffff;
  padding: 8px 12px;
  text-align: center;
}

.submissions th {
  background-color: #1C2433;
  font-weight: bold;
}

.submissions tbody tr:nth-child(odd) {
  background-color: #2D3750;
}

.submissions tbody tr:hover {
  background-color: #38425C;
  cursor: pointer;
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

.processing-status {
  margin-top: 1rem;
  font-weight: bold;
  color: #37b345;
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
