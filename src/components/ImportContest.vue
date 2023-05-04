<!-- CreateStudetAccount.vue -->
<script>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import { logout } from "@/utils/logout.js";
export default {
  name: "ImportContest",
  components: {
    SiteHeader,
    SiteFooter
  },
  methods: {
    handleLogout() {
      logout(this);
    },
  },
};
</script>

<template>
  <div>
    <site-header @logout="handleLogout"></site-header>
    <div class="content-wrapper">
    <main>
      <div class="form-container">
        <h2>Импорт контеста из Ejudge по ID</h2>
        <form>
          <div class="form-group">
            <label for="contestId">ID:</label>
            <input type="text" id="contestId-name" name="contestId" required placeholder="12345">
          </div>
          <button type="submit" class="btn-save">Импортировать</button>
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
.form-group input[type="text"] {
    width: 100%;
    box-sizing: border-box;
}
</style>
