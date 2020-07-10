// FAT位示图数组元素
export class FATStack {
    constructor(index, isFree, char, nextIndex) {
        this.index = index;
        // 盘块号
        this.isFree = isFree;
        // 是否空闲
        this.char = char; 
        // 存储字符，为空则是'' 
        this.nextIndex = nextIndex;
        // 下一个盘块号，为空则是null
    }
}
// 文件（目录项）
export class file {
    constructor(fileName, firstStack, length, power) {
        this.fileName = fileName;
        // 文件名
        this.firstStack = firstStack;
        // 首地址
        this.length = length;
        // 文件长度
        this.power = power;
        // 文件权限，1->只读，2->只写，3->可读可写
    }
}
// 目录
export class dir {
    constructor(parentDir, absolutePath, dirName) {
        this.parentDir = parentDir;
        // 父目录
        this.absolutePath = absolutePath;
        // 绝对目录
        this.dirName = dirName;
        // 目录名
        this.dirArr = []; 
        // 子目录数组
        this.fileArr = [];
        // 目录项数组
    }
}
