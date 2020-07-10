import { file } from './class';
import FAT_util from './FAT';

// 写入新的文件，成功则返回新的文件
function newFile( fileName, fileStr, power) {
    let firstStack = FAT_util.writeStack(fileStr);
    if(firstStack == -1) {
        // FAT剩余空间不足够写入该字符串
        return false;
    } 
    // 写入新文件,并返回
    return new file(fileName, firstStack, fileStr.length, power);
}
// 读文件，成功则返回文件字符串
function readFile(file) {
    let result = FAT_util.readStack(file.firstStack);
    if (result == false) {
        return false;
    }
    return result;
}
// 删文件，成功则返回true
function delFile(file) {
    let result = FAT_util.delStack(file.firstStack);
    if (result == false) {
        return false;
    }
    return result;
}
// 改写文件
function changeFile(oldFile, newFileName, newFileStr) {
    let oldLength = oldFile.length;
    let newLength = newFileStr.length;
    if(!FAT_util.ifEnoughFAT(newLength - oldLength)) {
        // FAT剩余空间不足够足够修改成newFileStr
        return false;
    }
    let power = oldFile.power;
    // 权限不修改
    delFile(oldFile); 
    // 删除旧文件的FAT
    return newFile(newFileName, newFileStr, power);
    // 返回新文件
}

export default {
    newFile,
    readFile,
    delFile,
    changeFile
}