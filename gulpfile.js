var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		jade         = require('gulp-jade'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts', 'jade'], function() {
		browserSync.init({
				server: {
						baseDir: "./public"
				},
				notify: false
		});
		
});

gulp.task('styles', function () {
	return gulp.src('src/sass/main.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('public/css'))
	.pipe(browserSync.stream());
});

gulp.task('jade', function() {
	return gulp.src('src/jade/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('public'));
});

gulp.task('scripts', function() {
	return gulp.src([
		//тут подключаем скрипты
		'./lib/jquery/dist/jquery.min.js',
		'./src/js/app.js',
		])
		.pipe(concat('app.js'))
		//.pipe(uglify()) //Minify app.js
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function () {
	gulp.watch('src/sass/*.sass', ['styles']);
	gulp.watch('src/jade/*.jade', ['jade']);
	gulp.watch(['lib/**/*.js', 'src/js/app.js'], ['scripts']);
	gulp.watch('public/js/*.js').on("change", browserSync.reload);
	gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);