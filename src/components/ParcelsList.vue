<!-- ParcelsList.vue -->
// ParcelsList.vue
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import axios from "axios";

export default {
    name: "AdminPanel",
    components: {
        SiteHeader,
        SiteFooter
    },
    data() {
        return {
            parcels: [],
            modalOpen: false,
            selectedCode: ''
        };
    },
    methods: {
        async fetchParcels() {
            try {
                const userRole = localStorage.getItem('userRole'); // Получаем роль пользователя
                const endpoint = userRole === 'teacher' ? 'get-all' : 'get-all-user'; // Определяем эндпоинт в зависимости от роли пользователя
                const response = await axios.get(`http://37.252.0.155:8080/api/solutions/${endpoint}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.parcels = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        openCodeModal(code) {
            this.selectedCode = code;
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
        },
    },
    created() {
        this.fetchParcels();
    }
};
</script>

<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
      <main>
        <div class="main-headline">Мои посылки</div>
        <div class="myposts-container">
          <p>Общее количество посылок: {{parcels.length}}</p>
          <div class="posts-list">
            <div v-if="modalOpen" class="modal-backdrop" @click="closeModal">
              <div class="modal-content" @click.stop>
                <h3>Код посылки</h3>
                <pre>{{ selectedCode }}</pre>
                <button @click="closeModal">Закрыть</button>
              </div>
            </div>
            <table>
              <thead>
              <tr>
                <th>ID</th> <!-- Добавлен столбец для ID -->
                <th>Просмотреть код</th>
                <th>Язык</th>
                <th>Статус</th>
                <th>Время работы</th>
                <th>Использованная память</th>
                <th>Тест</th>
                <th>Название контеста</th>
                <th>Название задачи</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(parcel, index) in parcels" :key="index">
                <td>{{ parcel.id }}</td>
                <td>
                  <button @click="openCodeModal(parcel.code)">Просмотреть код</button>
                </td>
                <td>{{ parcel.language }}</td>
                <td>{{ parcel.status }}</td>
                <td>{{ parcel.used_time}} с.</td>
                <td>{{ parcel.used_memory }} МБ.</td>
                <td>{{ parcel.error_test }}</td>
                <td>{{ parcel.contest_name }}</td>
                <td>{{ parcel.task_name }}</td>
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

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #3a475d;
  border-radius: 4px;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: relative;
}
</style>
