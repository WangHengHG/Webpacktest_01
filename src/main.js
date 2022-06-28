import count from './js/count';
import sum from './js/sum';
//要想webpack打包资源, 必须要引入资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
import './css/iconfont.css';
const result = count(2, 2);

console.log(result);
console.log(sum(1, 2, 3, 4));
if(module.hot) {
    //判断是否支持热模块替换功能
    module.hot.accept("./js/count");
    module.hot.accept("./js/sum");
}