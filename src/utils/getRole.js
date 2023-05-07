import axios from 'axios';

export async function fetchUserRole(token) {
    try {
        const response = await axios.get("http://37.252.0.155:8080/api/profile/get-role", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data) {
            console.log('Роль пользователя успешно Получена:', response.data);
        } else {
            console.error('Ошибка: данные о роли пользователя не найдены');
        }
    } catch (error) {
        console.error('Ошибка при получении роли пользователя с сервера:', error);
    }
}