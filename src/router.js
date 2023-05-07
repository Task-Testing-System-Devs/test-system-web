import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import StudentProfile from './components/StudentProfile.vue';
import AdminPanel from "@/components/AdminPanel.vue";
import ParcelList from "@/components/ParcelsList.vue";
import CreateStudentAccount from "@/components/CreateStudentAccount.vue";
import ContestsList from "./components/AllContestsList.vue";
import MyContestsList from "./components/MyContestsList.vue";
import Contest from "./components/Contest.vue";
import GlobalRating from "./components/GlobalRating.vue";
import ImportContest from "@/components/ImportContest.vue";

const routes = [
    { path: '/', name: 'Login', component: LoginPage },
    { path: '/StudentProfile', name: 'StudentProfile', component: StudentProfile },
    { path: '/AdminPanel', name: 'AdminPanel', component: AdminPanel },
    { path: '/ParcelList', name: 'ParcelList', component: ParcelList },
    { path: '/CreateStudentAccount', name: 'CreateStudentAccount', component: CreateStudentAccount },
    { path: '/ContestsList', name: 'ContestsList', component: ContestsList },
    { path: '/MyContestsList', name: 'MyContestsList', component: MyContestsList },
    { path: '/Contest/:contestId', name: 'Contest', component: Contest, props: true },
    { path: '/GlobalRating', name: 'GlobalRating', component: GlobalRating },
    { path: '/ImportContest', name: 'ImportContest', component: ImportContest },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
    routes,
});

export default router;
