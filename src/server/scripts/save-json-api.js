const fs = require('node:fs');
const getDB = require('../db');

const db = getDB();

// Создаем папку build/static/db, если ее нет
fs.mkdirSync('./build/static/db', { recursive: true });

// Записываем каждый ключ из базы данных в отдельный JSON файл
for (let [key, value] of Object.entries(db)) {
    fs.writeFileSync(`./build/static/db/${key}.json`, JSON.stringify(value));
}