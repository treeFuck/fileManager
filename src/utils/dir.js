import { dir } from './class';
import store from '../store';
import File_util from './file';

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
// 返回父目录（上一级目录）
function toParentDir() {
    if(!store.state.nowDir.parentDir) {
        return;
    }
    store.state.nowDir = store.state.nowDir.parentDir;
}
// 进入子目录（下一级目录）
function toSubDir(childIndex) {
    store.state.nowDir = store.state.nowDir.dirArr[childIndex];
}
// 新建文件
function newFile(fileName, fileStr, power) {
    if (!fileName) {
        // 文件名不能为空
        return 0;
    }
    if (!fileStr) {
        // 文件字符串不能为空
        return 1;
    }
    if (isExistName(fileName, 1)) {
        // 该文件名已存在
        return 2;
    }
    let file = File_util.newFile(fileName, fileStr, power);
    if(!file) {
        // FAT剩余空间不足够
        return 3;
    }
    store.state.nowDir.fileArr.push(file);
    return 4;
}
// 删除文件
function delFile(file) {
    let index = findIndex(file.fileName, 1);
    File_util.delFile(file);  
    store.state.nowDir.fileArr.splice(index, 1);
}
// 读取文件
function readFile(file) {
    return File_util.readFile(file);
}
// 修改文件
function changeFile(oldFile, newFileName, newFileStr) {
    if (!newFileName) {
        // 文件名不能为空
        return 0;
    }
    if (!newFileStr) {
        // 文件字符串不能为空
        return 1;
    }
    let index = findIndex(oldFile.fileName, 1);
    let newFile =  File_util.changeFile(oldFile, newFileName, newFileStr);
    if(!newFile) {
        // FAT剩余空间不足够
        return 2;
    }
    store.state.nowDir[index] = newFile;
    return 3;
}
// 新建子目录
function newSubDir(dirName) {
    if (!dirName) {
        // 目录名为空
        return 0;
    }
    if (isExistName(dirName, 0)) {
        // 该子目录名已存在
        return 1;
    }
    let absolutePath = store.state.nowDir.absolutePath + `${dirName}/`;
    let newDir = new dir(store.state.nowDir, absolutePath, dirName);
    store.state.nowDir.dirArr.push(newDir);
    return 2;
}
// 删除一个目录里的全部文件
function delDir(dir) {
    // 先删除子目录的全部文件
    let fileLen = dir.fileArr.length;
    for(let i = 0; i < fileLen; i++) {
        File_util.delFile(dir.fileArr[i]);  
    }
    // 再递归删除子目录的子目录
    let subLen = dir.dirArr.length;
    for(let i = 0; i < subLen; i++) {
        delDir(dir.dirArr[i]);
    }
}
// 删除子目录
function delSubDir(dir) {
    delDir(dir);
    let index = findIndex(dir.dirName, 0);
    store.state.nowDir.dirArr.splice(index, 1);
}

// 初始化根目录
function initRoot() {
    let root = new dir(null, '/', 'root');
    // 根目录/
    store.state.nowDir = store.state.root = root;
    newSubDir('待删除子目录');
    newSubDir('测试子目录');
    newFile('只读文件', '只读文本', 1);
    newFile('只写文件', '只写文本', 2);
    newFile('可读可写文件', '可读可写文本', 3);
    // 根目录/待删除子目录/
    store.state.nowDir = root.dirArr[0];
    newSubDir('子目录1');
    newSubDir('子目录2');
    newFile('测试文件1', 'zzzz', 1);
    newFile('测试文件2', 'zzzz', 2);
    newFile('测试文件3', 'zzzz', 3);
    // 根目录/待删除子目录/子目录1/
    store.state.nowDir = root.dirArr[0].dirArr[0];
    newFile('测试文件1', 'zzzz', 1);
    newFile('测试文件2', 'zzzz', 2);
    newFile('测试文件3', 'zzzz', 3);
    // 根目录/待删除子目录/子目录1/
    store.state.nowDir = root.dirArr[0].dirArr[1];
    newFile('测试文件3', 'zzzz', 1);
    newFile('测试文件4', 'zzzz', 2);
    newSubDir('子目录3');
    // 根目录/待删除子目录/子目录1/子目录3
    store.state.nowDir = root.dirArr[0].dirArr[1].dirArr[0];
    newFile('测试文件5', 'zzzz', 1);
    newFile('测试文件6', 'zzzz', 2);
    newSubDir('子目录5');
    newSubDir('子目录6');
    // 回到根目录
    store.state.nowDir = store.state.root;
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
