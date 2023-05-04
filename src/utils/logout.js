// src/utils/logout.js
export async function logout(vm) {
    localStorage.removeItem('token');
    vm.$router.push('/');
}
