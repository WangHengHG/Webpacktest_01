const path = require('path');//nodejs核心模块
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //入口
    entry: './src/main.js', //相对路径
    //输出
    output: {
        //输出路径
        //开发模式没有输出
        // path: path.resolve(__dirname, '../dist'),//绝对路径
        path: undefined,
        //入口文件打包输出的文件名
        filename: 'static/js/main.js',
        //自动清空上一次打包的结果
        //原理: 在打包前, 将path目录整个清空, 再进行打包
        clean: true,
    },
    //加载器
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,//只检测.css结尾的文件
                //执行顺序是从右到左, 从下到上
                use: [
                    'style-loader', //将js中css通过创建style标签添加html文件中生效
                    'css-loader'//将css资源变异成commonjs的模块到js中
                ]
            },
            {
                test: /\.less$/,
                //loader: 'xx' //只能使用一个loader
                use: ['style-loader', 'css-loader', 'less-loader'],//将less编译成css文件
            },
            {
                test: /\.s[a,c]ss$/,
                //loader: 'xx' //只能使用一个loader
                use: ['style-loader', 'css-loader', 'sass-loader'],//将sess编译成css文件
            },
            {
                test: /\.styl$/,
                //loader: 'xx' //只能使用一个loader
                use: ['style-loader', 'css-loader', 'stylus-loader'],//将styl编译成css文件
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                //loader: 'xx' //只能使用一个loader
                type: 'asset'
            },
            {
                test: /\.(png|jpe?g|gif|sebp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        //小于10kb的图片转base64
                        //优点: 减小请求数量  缺点: 体积会更大
                        maxSize: 10 * 1024 // 10kb
                    }
                },
                generator: {
                    //输出图片名称
                    //[hash:10]代表哈希值只去前十位
                    filename: 'static/images/[hash:10][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                type: 'asset/resource',
                generator: {
                    //[hash:10]代表哈希值只去前十位
                    filename: 'static/media/[hash:10][ext][query]'
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,//排除node_modules中的js文件(这些文件不处理)
                loader: 'babel-loader',
                // options: {
                //     presets: ['@babel/preset-env']
                // }
            }
        ],
    },
    //插件
    plugins: [
        //plugin的配置
        new ESLintPlugin({
            //检测哪些文件
            context: path.resolve(__dirname, "../src"),
        }),
        new HtmlWebpackPlugin({
            //模板:以public/index.html文件创建新的html文件
            //新的html文件特点: 1. 结构和原来一致, 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        })
        
    ],
    //开发服务器: 不会输出资源, 在内存中编译打包的
    devServer: {
        host: "localhost", //启动服务器域名
        port: "3000",//启动服务器端口号
        open: true, //是否自动打开浏览器
        hot: true, //开启HMR
    },
    //模式
    mode: 'development',
    devtool: "cheap-module-source-map",
}