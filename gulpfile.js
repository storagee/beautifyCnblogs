var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function() {
  exec('lessc --clean-css="--compatibility=ie8 --advanced" ./src/style/index.less ./dist/index.css', function(error, stdout, stderr) {
  	if (error) {
  		console.log(error, stderr);
  	}
  	console.log('compile less to css done.')
  })
});