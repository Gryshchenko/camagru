var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем scss пакет,
	pug          = require('gulp-pug'),//Подключаем Pug пакет
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'),// Подключаем библиотеку кеширования
	imageResize  = require('gulp-image-resize'),
	rename       = require('gulp-rename'), // Rename
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск scss
	return gulp.src('src/css/**/*.+(scss|sass)') // Берем источник
		.pipe(sass()) // Преобразуем scss в CSS посредством gulp-scss
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('pug', function(){ // Создаем таск "pug"

	return gulp.src('src/pug/index.pug') // Берем источник
		.pipe(pug({
			pretty: true
		})) // Берем все pug файлы из папки pug и дочерних преобразуем pug в html посредством gulp-pug
		.pipe(rename('index.php'))
		.pipe(gulp.dest('src')) // Выгружаем результата в папку src
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из src
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

	var buildCss = gulp.src([ 'src/css/main.css']) // Переносим библиотеки в продакшен
	.pipe(gulp.dest('dist/css'))
	var buildHtml = gulp.src('src/*+(html|php)') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
});

gulp.task('clear', function (callback) {
	return cache.clearAll(); //Чистка кеша
})

gulp.task('default', ['watch']);

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/css/**/*.sass', ['sass']); // Наблюдение за scss файлами в папке scss
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/*.php', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
	gulp.watch('src/php/**/*.php', browserSync.reload);   // Наблюдение за Php файлами в папке js
});

gulp.task('resize', function () {
	gulp.src('src/img/resize/*.png')
		.pipe(imageResize({
			width : 1280,
			height : 720,
			crop : true,
			upscale : false
		}))
		.pipe(rename(function (path) { path.basename += "_hd"; }))
		.pipe(gulp.dest('src/img/resize'));
});
