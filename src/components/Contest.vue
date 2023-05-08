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
        async submitSolutionToServer(code)  {
            try {
                console.log(code, this.selectedLanguage, this.solutionStatus, this.failureTest, this.taskTitle);
                const response = await axios.post(
                    "http://37.252.0.155:8080/api/solutions/add",
                    {
                        code: code,
                        language: this.selectedLanguage,
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
            } catch (error) {
                console.error("Ошибка при отправке решения на сервер:", error);
            }
        },

        async fetchResult(code) {
            try {
                const response = await axios.get("http://37.252.0.155:3000/getResult");
                const { status, error } = response.data;
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
        <div class="main-headline">{{contestName}}</div>
        <div class="content-container">
          <section class="task-container">
            <div class="task-switch">
              <button class="task-button" id="task1" @click="updateTask(1)">1 - N/A</button>
              <button class="task-button" id="task2" @click="updateTask(2)">2 - N/A</button>
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
            <h3>Последняя посылка: <span class="last-status">{{ solutionStatus }}</span></h3>
            <h3>Ошибка на тесте: <span class="last-status">{{ failureTest }}</span></h3>
            <h3>Последние 4 посылки:</h3>
            <ol class="submissions">
              <li>Посылка 1 - RE</li>
              <li>Посылка 2 - WA1</li>
              <li>Посылка 3 - WA9</li>
              <li>Посылка 4 - OK</li>
            </ol>
            <div class="submit-container">
              <input type="file" id="solution" name="solution" @change="onFileChange">
              <select name="language" id="language" @change="onLanguageChange">
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
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
