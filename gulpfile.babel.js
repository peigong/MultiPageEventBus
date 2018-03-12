import del from 'del';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

import conf from './build/conf';
import rollup from './build/rollup.js';

const $ = loadPlugins();

const error = console.error.bind( console ); // eslint-disable-line no-console
const clean = () => del([ conf.build.dest ]);

function lib(){
    return gulp.src('./node_modules/socket.io-client/dist/socket.io.js')
    .pipe(gulp.dest(`${ conf.build.dest }/socket.io`));
}
function server(){
    return gulp.src(conf.build.server.src)
    .pipe($.babel(conf.babel.server))
    .pipe(gulp.dest(conf.build.dest));
}
const build = gulp.series(clean, gulp.parallel(lib, server, rollup.build));
export { build };
export default build;