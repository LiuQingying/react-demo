/**
 *  ProductWebpackPlugin
 *
 *  本插件针对 多项目部署发版并存时候将index.html更新操作
 *  WIKI: wiki.choicesaas.cn/pages/viewpage.action?pageId=13179939
 *                                             Knove
 */

const shell = require('shelljs');
const path = require('path');

class ProductWebpackPlugin {
  apply (compiler) {
    compiler.plugin('done', () => {
      const SAVE_PROJECT_NUM = 3; // 留存3个版本

      /**
       *  index.html change position to ./dist
       *  bwip-js font file position to ./dist
       */
      console.log('starting product pack');
      const outputPath = compiler.outputPath; // 获取的OUT页

      /**
       *  control SAVE_PROJECT_NUM project number
       */

      let action = shell.ls(outputPath);
      if (action.stderr) {
        console.error(`ProductWebpackPlugin - ERROR: 错误信息：${action.stderr}`);
      } else {
        // all floder
        const floder = action.stdout
          .split('\n')
          .sort((a, b) => b - a)
          .filter((item, i, self) => item && self.indexOf(item) === i && item.length === 8 && !isNaN(Number(item)));
        const basicFloder = [];
        // clear all empty floder
        floder.forEach((item) => {
          action = shell.ls(path.join(outputPath, item));
          if (action.stderr) {
            console.error(`ProductWebpackPlugin - ERROR: 错误信息：${action.stderr}`);
          } else if (action.stdout.length === 0) {
            // clear empty floder
            action = shell.rm('-rf', path.join(outputPath, item));
            if (action.stderr) {
              console.error(`ProductWebpackPlugin - ERROR: 错误信息：${action.stderr}`);
            } else {
              console.log(`> - ProductWebpackPlugin - delete empty project ${item} Success!`);
            }
          } else {
            basicFloder.push(item);
          }
        });

        // control project number
        if (basicFloder.length > SAVE_PROJECT_NUM) {
          for (let i = SAVE_PROJECT_NUM; i < basicFloder.length; i += 1) {
            // clear control floder
            action = shell.rm('-rf', path.join(outputPath, basicFloder[i]));
            if (action.stderr) {
              console.error(`ProductWebpackPlugin - ERROR: 错误信息：${action.stderr}`);
            } else {
              console.log(`> - ProductWebpackPlugin - delete old project ${basicFloder[i]} Success!`);
            }
          }
        }
      }
      action = shell.ls(outputPath);
      if (action.stderr) {
        console.log(`ProductWebpackPlugin - ERROR: 错误信息：${action.stderr}`);
      } else {
        console.log(`准备部署服务器内容包含：\n${action.stdout}`);
      }
      console.log('> - ProductWebpackPlugin - build Success!');
    });
  }
}

module.exports = ProductWebpackPlugin;
