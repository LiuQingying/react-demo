const fs = require('fs-extra');
const path = require('path');

const handleRouter = (fp1) => {
  const addList = [];
  const handleRouterCore = (fp) => {
    const filePath = path.resolve(fp);
    const files = fs.readdirSync(filePath);
    files.forEach((filename) => {
      // 获取当前文件的绝对路径
      const filedir = path.join(filePath, filename);
      // 根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filedir);
      const isFile = stats.isFile(); // 是文件
      const isDir = stats.isDirectory(); // 是文件夹
      if (isFile && filename === 'router.js') {
        const fr = fs.readFileSync(filedir, { encoding: 'utf-8' });
        const IndexEnum = 'default ';
        const index = fr.indexOf(IndexEnum);
        const targetList = fr.substring(index + IndexEnum.length);
        try {
          addList.push(targetList
            .replace(/\r|\n|\t|\s|\'|;/g, '')
            .replace(/,(?=}|])/g, '')
            .replace(/\[|\]/g, '')
            .replace(
              /([a-zA-Z]+):([a-zA-Z0-9_\/\-\u4e00-\u9fa5]*)/g,
              (m, $1, $2) => `"${$1}":"${$2}"`,
            ));
        } catch (error) {
          console.warn(error);
        }
      } else if (isDir) {
        handleRouterCore(filedir);
      }
    });
  };
  handleRouterCore(fp1);
  const utilPath = path.resolve('./src/common/utils');
  const utildir = path.join(utilPath, 'Menus.js');
  fs.writeFileSync(
    utildir,
    `/* eslint-disable */\r\nexport const Menus = [${addList}];`,
  );
};

module.exports = handleRouter;
