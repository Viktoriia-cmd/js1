//отримую елементи з HTML

const addBtn = document.getElementById('addBtn');
const pairList = document.getElementById('pairList');
const sortByNameBtn = document.getElementById('sortByNameBtn');
const sortByValueBtn = document.getElementById('sortByValueBtn');
const deleteBtn = document.getElementById('deleteBtn');

const pairRegex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/; //регулярний вираз, що перевіряє, чи відповідає формату строки: <імя> = <значення>
//додаю дію
addBtn.addEventListener('click', () => {

    const input = pairInput.value.trim(); //При клікі add отримую значення без зайвих пробілів
    const match = pairRegex.exec(input); // При клікі add перевіряю, чи відповідає формату Name=Value за допомогою регулярного вираза

    if (match) {
        const name = match[1]; // Отримую ім'я з регулярного виразу
        const value = match[2]; // Отримую значення з регулярного виразу

        // Створюю новий елемент div з парою Name=Value
        const div = document.createElement('div');
        // додаю чекбокс для можливості видалення, виводжу текст із парою Name=Value
        div.innerHTML = `
                    <input type="checkbox" /> 
                    <span>${name} = ${value}</span> 
                `;
        // Додаю div до списку
        pairList.appendChild(div);
        // Очищаю поле введення
        pairInput.value = '';
    } else {
        alert('Invalid format! Please enter as Name=Value with alphanumeric characters.'); // Якщо формат некоректний, показує попередження.
    }
});
// Виймаю імена частину рядка до =. Порівнює їх у алфавітному порядку. Повертаю результат порівняння
sortByNameBtn.addEventListener('click', () => {
    sortList((a, b) => {
        const nameA = a.querySelector('span').textContent.split('=')[0].trim();
        const nameB = b.querySelector('span').textContent.split('=')[0].trim();
        return nameA.localeCompare(nameB);
    });
});

// Для сортування списку за значенням додаю дію на кнопку. Використовую localeCompare для порівняння значень.
sortByValueBtn.addEventListener('click', () => {
    sortList((a, b) => {
        const valueA = a.querySelector('span').textContent.split('=')[1].trim();
        const valueB = b.querySelector('span').textContent.split('=')[1].trim();
        return valueA.localeCompare(valueB);
    });
});

// Для видалення вибраних елементів
deleteBtn.addEventListener('click', () => {
    const selected = pairList.querySelectorAll('div input:checked');
    selected.forEach(input => input.parentElement.remove());
});

// Функція сортування
function sortList(compareFn) {
    const items = Array.from(pairList.children); // Перетворюю елементи на масив
    items.sort(compareFn); // Сортую масив
    items.forEach(item => pairList.appendChild(item)); // Додаю елементи назад у DOM
}