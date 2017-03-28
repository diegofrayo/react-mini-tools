//------------------------------------------------------------------
//-------------- Load Plugins And Their Settings -------------------
const gulp = require('gulp'),
	g = require('gulp-load-plugins')({
		lazy: false
	});

const htmlminOpts = {
	removeComments: true,
	collapseWhitespace: true,
	removeEmptyAttributes: false,
	collapseBooleanAttributes: true,
	removeRedundantAttributes: true
};

const DEST_PATH = './../website-router';


//--------------------------------------------------------------
//------------------------- Util Functions ---------------------
function buildJS() {
	return gulp.src(__dirname + '/src/assets/react-mini-tools/main.js')
		.pipe(gulp.dest(DEST_PATH + '/assets/react-mini-tools'));
}

function buildCSS() {
	return gulp.src(__dirname + '/src/assets/react-mini-tools/styles.css')
		.pipe(g.minifyCss())
		.pipe(gulp.dest(DEST_PATH + '/assets/react-mini-tools'));
}

function buildHTML() {
	return gulp.src(__dirname + '/src/index.html')
		.pipe(g.htmlmin(htmlminOpts))
		.pipe(g.rename('react-mini-tools.html'))
		.pipe(gulp.dest(DEST_PATH + '/templates'));
}

function copyAssets() {
	gulp.src(__dirname + '/src/assets/react-mini-tools/favicon.png')
		.pipe(gulp.dest(DEST_PATH + '/assets/react-mini-tools'));
}


//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-live', function() {
	copyAssets();
	buildJS();
	buildCSS();
	buildHTML();
});