import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import StudentProfile from './components/StudentProfile.vue'
import AdminPanel from "@/components/AdminPanel.vue";
import ParcelList from "@/components/ParcelsList.vue";
import CreateStudentAccount from "@/components/CreateStudentAccount.vue";
import ContestsList from "./components/AllContestsList.vue";
import MyContestsList from "./components/MyContestsList.vue";
import Contest from "./components/Contest.vue";
import GlobalRating from "./components/GlobalRating.vue";
import ImportContest from "@/components/ImportContest.vue";


const routes = [
    { path: '/', component: LoginPage },
    { path: '/StudentProfile', component: StudentProfile },
    { path: '/AdminPanel', component: AdminPanel },
    { path: '/ParcelList', component: ParcelList },
    { path: '/CreateStudentAccount', component: CreateStudentAccount },
    { path: '/ContestsList', component: ContestsList },
    { path: '/MyContestsList', component: MyContestsList },
    { path: '/Contest', component: Contest },
    { path: '/GlobalRating', component: GlobalRating },
    { path: '/ImportContest', component: ImportContest },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
    routes
})

export default router