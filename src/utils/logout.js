// src/utils/logout.js
export async function logout(vm) {
    // удаление токена из localStorage или вызов API для выхода
    vm.$router.push('/');
}
