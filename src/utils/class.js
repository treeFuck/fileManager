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
