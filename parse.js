#!/usr/bin/env node

const fs = require('fs');
const spawn = require('child_process').spawn; // ①

const workDir = '/Users/zhoudali/Desktop/脚本/parse';
const readFilePath = `${workDir}/json.json`;
const writeFilePath = `${workDir}/json.json`;

function isValidJSONString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

fs.readFile(readFilePath, function(err, data) {
  if (err) return console.log(err);

  // 1. 匹配JSON字符串
  const dataString = data.toString();
  const math =  dataString.match(/{"i(\S*)/);
  console.log('ddd dataString: '+ dataString);
  const json = math ? math[0] : dataString;
  const isValid = isValidJSONString(json);
  const writeStr = isValid ?  JSON.stringify(JSON.parse(json), null, 2) : dataString;

  // 2. 写入文件
  fs.writeFile(writeFilePath, writeStr, "utf8", function (err) {
    if (err) return console.log(err);

    const code='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code'
    // 3. 打开文件
    spawn(`${code}`, [`${writeFilePath}`]);
  });
});