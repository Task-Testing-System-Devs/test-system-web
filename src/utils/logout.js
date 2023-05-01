// src/utils/logout.js
export async function logout(vm) {
    // удаление токена из localStorage или вызов API для выхода
    localStorage.removeItem('token');
    vm.$router.push('/');
}
