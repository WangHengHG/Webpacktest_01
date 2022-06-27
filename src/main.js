import count from './count';
import sum from './sum';
//要想webpack打包资源, 必须要引入资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
import './css/iconfont.css';
const result = count(2, 1);

console.log(result);
console.log(sum(1, 2, 3, 4));