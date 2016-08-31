# quickstart-gulp-build-step

Run basic node applications built with babel using nodemon write client and sever sice js in es2015.
Serve out a directory and live reload it as our JS changes :)

$ mkdir folder
 
$ cd folder

$ npm init 

$ npm install gulpjs/gulp.git#4.0 --save-dev

$ npm install gulp-load-plugins gulp-babel babel-preset-es2015 browserify watchify babelify gulp-cached nodemon vinyl-source-stream --save-dev

$ npm install jquery lodash moment colour --save

$ $ npm install rxjs --save 

Add gulpfile.js && .babelrc to the root of the folder

Then add your es6 files to src-server dir 

:~/folder/src-server$ touch example.js


$ npm install live-server -g

$ gulp watch:scripts
