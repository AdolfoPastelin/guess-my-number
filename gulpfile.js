const { series, src, dest } = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

const paths = {
	js: 'src/js/**/*.js',
}

function minifyJS() {
	return src(paths.js)
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(dest('public/js/'))
}

exports.default = series(minifyJS)