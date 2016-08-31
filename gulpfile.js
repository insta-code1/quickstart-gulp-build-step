"use strict";

var gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    source = require("vinyl-source-stream"), // gives filename
    browserify = require("browserify"),
    watchify = require("watchify"),
    babelify = require("babelify"),
    path = require("path"),
    fs = require("fs");

gulp.task("scripts:server", () => {
    return gulp.src("./src-server/**/*js")
        .pipe($.cached("server"))
        .pipe($.babel())
        .pipe(gulp.dest("./build"));
});

gulp.task("watch:scripts:server", gulp.series(
	"scripts:server",
	() => gulp.watch("./src-server/**/*.js", gulp.series("scripts:server"))));

gulp.task("watch:scripts:client", () => {
	const files = fs.readdirSync("./src-client");
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (path.extname(file) !== ".js")
			continue;
			
		initBundlerWatch(path.join("src-client", file));
	}
	
	return gulp.watch("./src-client/**/*.js")
		.on("change", initBundlerWatch);
});


gulp.task("watch:scripts", gulp.series(
	"watch:scripts:client",
	"watch:scripts:server"))



//use gulp watch to check the files the exsit inside the src client 
// and on for every new file launch a gulp watchify 

let bundlers = {};
function initBundlerWatch(file) {
	if (bundlers.hasOwnProperty(file))
		return;
		
	const bundler = createBundler(file);
	bundlers[file] = bundler;
	
	const watcher = watchify(bundler);
	const filename = path.basename(file);
	
	function bundle() {
		return bundler
			.bundle()
			.on("error", error => console.error(error))
			.pipe(source(filename))
			.pipe(gulp.dest("./public/build"));
	}
	
	watcher.on("update", bundle);
	watcher.on("time", time => console.log(`Built client in ${time}ms`));
	
	bundle();
}


// createBundler takes in a file and instructs browserify to compile
// browserify pulls in the modules that we import
function createBundler(file) {
    const bundler = browserify(file);
    bundler.transform(babelify);
    return bundler;
}