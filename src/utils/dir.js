import { dir } from './class';
import store from '../store';
import File_util from './file';

// 初始化根目录
function initRoot() {
    let root = new dir(null, '/', 'root');
    store.state.nowDir = store.state.root = root;
}
// 判断该目录下的 子目录名/目录项名 是否已经存在
function isExistName(nameStr, type) {
    // type 0->校验子目录名，1->校验目录项名
    let nowDir = store.state.nowDir;
    if (type == 0) {
        let len = nowDir.dirArr.length;
        for (let i = 0; i < len; i++) {
            if (nowDir.dirArr[i].dirName == nameStr) {
                return true;
            }
        }
    } else {
        let len = nowDir.fileArr.length;
        for (let i = 0; i < len; i++) {
            if (nowDir.fileArr[i].fileName == nameStr) {
                return true;
            }
        }
    }
}
// 查找该目前下 子目录数组/目录项数组 里名字为nameStr的元素，并返回下标
function findIndex(nameStr, type) {
    // type 0->校验子目录名，1->校验目录项名
    let nowDir = store.state.nowDir;
    let index = -1;
    if (type == 0) {
        let len = nowDir.dirArr.length;
        for (let i = 0; i < len; i++) {
            if (nowDir.dirArr[i].dirName == nameStr) {
                index = i;
                break;
            }
        }
    } else {
        let len = nowDir.fileArr.length;
        for (let i = 0; i < len; i++) {
            if (nowDir.fileArr[i].fileName == nameStr) {
                index = i;
                break;
            }
        }
    }
    return index;
}
// 新建子目录
function newSubDir(dirName) {
    if (!dirName) {
        // 目录名为空
        return false;
    }
    if (isExistName(dirName, 0)) {
        // 该子目录名已存在
        return false;
    }
    let absolutePath = store.state.nowDir.absolutePath + `${dirName}/`;
    let newDir = new dir(store.state.nowDir, absolutePath, dirName);
    store.state.nowDir.dirArr.push(newDir);
    return true;
}
// 删除子目录
function delSubDir(dir) {
    let index = findIndex(dir.dirName, 0);
    store.state.nowDir.dirArr.splice(index, 1);
}
// 返回父目录（上一级目录）
function toParentDir() {
    store.state.nowDir = store.state.nowDir.parentDir;
}

// 进入子目录（下一级目录）
function toSubDir(childIndex) {
    store.state.nowDir = store.state.nowDir.dirArr[childIndex];
}

// 新建目录项
function newFile(fileName, fileStr, power) {
    if (!fileName) {
        // 文件名不能为空
        return false;
    }
    if (!fileStr) {
        // 文件字符串不能为空
        return false;
    }
    if (isExistName(fileName, 1)) {
        // 该文件名已存在
        return false;
    }
    let file = File_util.newFile(fileName, fileStr, power);
    store.state.nowDir.dirArr.push(file);
}
// 删除目录项
function delFile(file) {
    let index = findIndex(file.fileName, 1);
    File_util.delFile(file);  
    store.state.nowDir.fileArr.splice(index, 1);
}
// 读取目录项
function readFile(file) {
    return File_util.readFile(file);
}
// 修改目录项
function changeFile(oldFile, newFileName, newFileStr) {
    let index = findIndex(oldFile.fileName, 1);
    store.state.nowDir[index] = File_util.changeFile(oldFile, newFileName, newFileStr);
}

export default {
    initRoot,   // 初始化根目录
    newSubDir,  // 新建子目录
    delSubDir,  // 删除子目录
    toParentDir,// 返回上一级目录
    toSubDir,   // 到下一级目录
    newFile,    // 新建目录项
    delFile,    // 删除目录项
    readFile,   // 读取目录项
    changeFile  // 修改目录项
}
