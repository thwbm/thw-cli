import { createStore } from "vuex";

/**
 * @description: 自动化获取文件
 * @param {String} 读取文件的路径
 * @param {Boolean} 是否遍历文件的子目录
 * @param {RegExp} 匹配文件的正则
 */
const modulesFiles = require.context("./modules", true, /\.ts/);

/**
 * @description: 处理文件函数
 * @param {*} modules 返回类型的空值
 * @param {*} modulePath 数组对应值
 */
function getModules(modules: { [x: string]: any }, modulePath: string) {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}

/**
 * @description: 解析文件内容
 * @param {Function} 处理函数
 * @param {*} 返回类型
 */
const modules = modulesFiles.keys().reduce(getModules, {});

export default createStore({
  modules,
});
