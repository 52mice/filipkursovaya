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
        contentDiv.innerHTML = `<p class="loading" style="color:red;">Ошибка: ${error.message}</p>`;
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
        html += `</table>`;
    } 
    else if (endpoint === 'students') {
        html = `<h2>Список студентов</h2><table><tr><th>ID</th><th>Студент</th><th>Класс</th></tr>`;
        data.forEach(item => {
            html += `<tr><td>${item.id}</td><td>${item.user}</td><td>${item.class_id}</td></tr>`;
        });
        html += `</table>`;
    } 
     else if (endpoint === 'grades') {
        const students = [...new Set(data.map(item => item.student))]; 
        const dates = [...new Set(data.map(item => item.date))].sort(); 
        
        html = `<h2>Журнал успеваемости</h2>
                <div class="journal-container">
                <table class="journal-table">
                    <thead>
                        <tr>
                            <th>Ученик / Дата</th>`;
        
        dates.forEach(date => {
            const shortDate = date.split('-').slice(1).reverse().join('.');  
            html += `<th>${shortDate}</th>`;
        });
        html += `</tr></thead><tbody>`;

        students.forEach(student => {
            html += `<tr><td>${student}</td>`;
            
            dates.forEach(date => {
                const gradeObj = data.find(item => item.student === student && item.date === date);
                if (gradeObj) {
                    let colorClass = '';
                    if (gradeObj.value >= 5) colorClass = 'grade-5';
                    else if (gradeObj.value == 4) colorClass = 'grade-4';
                    else if (gradeObj.value == 3) colorClass = 'grade-3';
                    else if (gradeObj.value <= 2) colorClass = 'grade-2';

                    html += `<td><span class="grade-badge ${colorClass}">${gradeObj.value}</span></td>`;
                } else {
                    html += `<td></td>`; 
                }
            });
            html += `</tr>`;
        });
        
        html += `</tbody></table></div>`;
    } 
    else if (endpoint === 'schedule') {
        html = `<h2>Расписание</h2><table><tr><th>ID</th><th>Класс</th><th>День</th><th>Урок</th><th>Предмет</th></tr>`;
        data.forEach(item => {
            html += `<tr><td>${item.id}</td><td>${item.class_id}</td><td>${item.day_of_week}</td><td>${item.lesson_number}</td><td>${item.subject}</td></tr>`;
        });
        html += `</table>`;
    }

    contentDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadData('classes');
});