// src/utils/logout.js
export async function logout(vm) {
    localStorage.clear();
    vm.$router.push('/');
}
