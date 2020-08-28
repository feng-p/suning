const gulp = require("gulp");
const connect = require("gulp-connect");
//拷贝html文件到dist/html
gulp.task("html", done => {
    gulp.src("html/*.html")
        .pipe(gulp.dest("dist/html"))
        .pipe(connect.reload());
    done();
});
//拷贝css文件到dist/css
gulp.task("css", done => {
    gulp.src("css/*")
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
    done();
});
//拷贝js文件到dist/js
gulp.task("js", done => {
    gulp.src("js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
    done();
});
//拷贝img文件到dist/img
gulp.task("img", done => {
    gulp.src("img/*")
        .pipe(gulp.dest("dist/img"))
        .pipe(connect.reload());
    done();
});
//拷贝font文件到dist/css/font
gulp.task("font", done => {
    gulp.src("css/font/*")
        .pipe(gulp.dest("dist/css/font"))
        .pipe(connect.reload());
    done();
});
//监听文件变化
gulp.task("watch", done => {
    gulp.watch("html/*.html", gulp.series("html"));
    gulp.watch("css/*.css", gulp.series("css"));
    gulp.watch("js/*.js", gulp.series("js"));
    gulp.watch("img/*", gulp.series("img"));
    gulp.watch("font/*", gulp.series("font"));
    done();
})

gulp.task("bulid", gulp.parallel("html", "css", "js", "img", "font"));

//创建服务器
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    })
    done();
});

gulp.task("default", gulp.series("bulid", "watch", "server"))