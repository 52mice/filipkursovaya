const API_URL = 'http://127.0.0.1:8000/api';

async function loadData(endpoint) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<p class="loading">Загрузка данных...</p>';

    try {
        const response = await fetch(`${API_URL}/${endpoint}/`);
        if (!response.ok) throw new Error('Ошибка сети');
        
        const data = await response.json();
        renderTable(endpoint, data);
    } catch (error) {
        contentDiv.innerHTML = `<p class="loading" style="color:red;">Ошибка при загрузке: ${error.message}</p>`;
    }
}

function renderTable(endpoint, data) {
    const contentDiv = document.getElementById('content');
    let html = '';

    if (data.length === 0) {
        contentDiv.innerHTML = '<p class="loading">Данных пока нет.</p>';
        return;
    }

    if (endpoint === 'classes') {
        html = `<h2>Список классов</h2><table><tr><th>ID</th><th>Название</th><th>Учебный год</th></tr>`;
        data.forEach(item => {
            html += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.academic_year}</td></tr>`;
        });
    } 
    else if (endpoint === 'students') {
        html = `<h2>Список студентов</h2><table><tr><th>ID</th><th>User ID</th><th>Class ID</th></tr>`;
        data.forEach(item => {
            html += `<tr><td>${item.id}</td><td>${item.user}</td><td>${item.class_id}</td></tr>`;
        });
    } 
    else if (endpoint === 'grades') {
        html = `<h2>Ведомость оценок</h2><table><tr><th>ID</th><th>Студент (ID)</th><th>Предмет (ID)</th><th>Оценка</th><th>Дата</th></tr>`;
        data.forEach(item => {
            html += `<tr><td>${item.id}</td><td>${item.student}</td><td>${item.subject}</td><td><strong>${item.value}</strong></td><td>${item.date}</td></tr>`;
        });
    } 
    else if (endpoint === 'schedule') {
        html = `<h2>Расписание</h2><table><tr><th>ID</th><th>Класс (ID)</th><th>День</th><th>Урок</th><th>Предмет (ID)</th></tr>`;
        data.forEach(item => {
            html += `<tr><td>${item.id}</td><td>${item.class_id}</td><td>${item.day_of_week}</td><td>${item.lesson_number}</td><td>${item.subject}</td></tr>`;
        });
    }

    html += `</table>`;
    contentDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadData('classes');
});