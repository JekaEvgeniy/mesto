

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



```npm run dev``` - Браузер с адресом localhost:8080 откроется автоматически.



```npm run build``` - Проверьте, что в папке /dist появился JS-код (скорее всего, с дополнительными комментариями и обёртками от «Вебпака»).




```
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import jordanImage from './images/jordan.jpg';
import jamesImage from './images/james.jpg';
import bryantImage from './images/bryant.jpg';

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
];
```
## Есть и второй способ работать с такими изображениями. Этот способ отличается от первого только тем, что работает и без запуска «Вебпака». Свойство import.meta.url — служебный параметр, указывающий на адрес файла. :
```
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
const jamesImage = new URL('./images/james.jpg', import.meta.url);
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
];

```