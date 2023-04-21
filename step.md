

new folder src/index.js



see new folder > dist/main.js

"scripts": {
  "build": "rimraf dist && webpack" // добавили удаление папки
}

Настраиваем локальный сервер:
npm i webpack-dev-server --save-dev


# Создаём вторую сборку

Всё, что остаётся, — создать отдельную сборку для разработки. Для этого пропишем её в разделе scripts файла package.json:

	"scripts": {
    "build": "rimraf dist && webpack",
		"dev": "webpack serve"
  },




Команда *** webpack serve *** запустит проект на локальном сервере.



npm run dev
npm run build