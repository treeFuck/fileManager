import { FATStack } from './class';
import store from '../store';

const FATLen_x = 4; // FAT行数
const FATLen_y = 4; // FAT列数


// 初始化FAT
function initFAT() {
    let arr = [];
    for (let i = 0; i < FATLen_x; i++) {
        let arr2 = [];
        for (let j = 0; j < FATLen_y; j++) {
            arr2.push(new FATStack(i * FATLen_y + j, true, '', null))
        }
        arr.push(arr2);
    }
    store.state.FAT = arr;
}



// 判断FAT剩余空间是否足够继续写入
function ifEnoughFAT(enoughNum) {
    if(enoughNum <= 0) {
        return true;
    }
    let num = 0;
    for (let i = 0; i < FATLen_x; i++) {
        for (let j = 0; j < FATLen_y; j++) {
            if (store.state.FAT[i][j].isFree) {
                num++;
                if (num >= enoughNum) {
                    return true;
                }
            }
        }
    }
    return false;
}
// 顺序查找第一个空闲的FAT块
function findNullStack() {
    for (let i = 0; i < FATLen_x; i++) {
        for (let j = 0; j < FATLen_y; j++) {
            if (store.state.FAT[i][j].isFree) {
                // 找到空闲的块，返回
                return store.state.FAT[i][j]
            }
        }
    }
    return null;
}
// 递归，将一个字符串写入FAT块中
function writeChar(str, index) {
    let nextIndex = null;
    if (str[index + 1]) {
        nextIndex = writeChar(str, index + 1);
    }
    let writeStack = findNullStack();
    writeStack.char = str[index];
    writeStack.isFree = false;
    writeStack.nextIndex = nextIndex;
    return writeStack.index;
}
// 写入新的Stack
function writeStack(str) {
    if (!ifEnoughFAT(str.length)) {
        // FAT剩余空间不足够写入该字符串
        return false;
    }
    // 递归写入完毕，将首盘号返回
    return writeChar(str, 0);
}



// 根据盘号，获取FAT元素
function getStack(index) {
    if(index > FATLen_x * FATLen_y - 1) {
        return false;
    }
    let x = parseInt(index / FATLen_y);
    let y = index % FATLen_y;
    return store.state.FAT[x][y];
}
// 递归，读取一个字符串
function readChar(index) {
    let nextChar = '';
    let stack = getStack(index);
    if (stack.nextIndex != null) {
        nextChar = readChar(stack.nextIndex);
    }
    return stack.char + nextChar;
}
// 根据首盘号（首物理地址）读取stack，得到对应字符串的
function readStack(index) {
    if(index == false && isNaN(Number(index)) ) {
        return false;
    }
    return readChar(index);
}


// 递归，删除一个字符串
function delChar(index) {
    let stack = getStack(index);
    if (stack.nextIndex != null) {
        delChar(stack.nextIndex);
    }
    stack.char = '';
    stack.isFree = true;
    stack.nextIndex = null;
}
// 根据首盘号（首物理地址）删除一个字符串的stack
function delStack(index) {
    delChar(index);
    return true;
}


// 根据首盘号（首物理地址）修改stack，将oleStr置换为newStar
function changeStack(index, newStr) {
    let oleStr = readStack(index);
    if(!ifEnoughFAT(newStr.length - oleStr.length)) {
        // 空间是否足够字符串进行修改
        return false;
    }
    // 先删除oleStr
    delStack(index);
    // 再新增newStr
    writeStack(newStr);
    return true;
}

export default {
    initFAT,
    writeStack,
    readStack,
    delStack,
    changeStack
}