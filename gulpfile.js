/*
 * @Author: 张驰阳
 * @Date:   2017-06-14 11:34:37
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2017-06-14 18:26:40
 */

'use strict';

var gulp = require("gulp"),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    del = require("del"),
    bump = require("gulp-bump"),//更新版本号
    header=require("gulp-header");//添加头部注释


//css压缩
gulp.task("minify_css", ["clean"], function() {
    var cssSrc = ['./css/*.css'];

    return gulp.src(cssSrc)
        .pipe(concat("all.css"))
        .pipe(gulp.dest("./main/css")) //输出文件夹
        .pipe(rename({ suffix: ".min" }))
        .pipe(minifycss())
        .pipe(header("/*hello 这是用gulp插件完成的css合并、压缩、注释等，一些列工作*/\n"))
        .pipe(gulp.dest("./main/css"));

})

//js压缩

gulp.task("minify_js", ["clean"], function() {
    var jsSrc = ["./js/index.js", "./js/tools.js"];
    return gulp.src(jsSrc)
        // .pipe(concat("all.js"))
        .pipe(gulp.dest("./main/js"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
         .pipe(header("/*hello 这是用gulp插件完成的css合并、压缩、注释等，一些列工作*/\n"))
        .pipe(gulp.dest("./main/js"));

})

//packjson更新版本号
gulp.task("package_upv", function() {
    var pj = ["./package.json"];

    return gulp.src(pj)
        .pipe(bump({ type: "prerelease" }))
        .pipe(gulp.dest("./"));
});

//执行压缩前，先删除以前压缩文件

gulp.task("clean", function() {
    return del(["./main/css/all.css", "./main/css/all.min.css", "./main/js/*.js"])
});


gulp.task("default", function() {
    gulp.run("minify_css", "minify_js", "package_upv");
});
