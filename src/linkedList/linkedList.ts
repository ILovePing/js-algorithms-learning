import { isEqual } from "lodash";
import LinkedListNode from "./linkedListNode";
interface findParam{
    findFunction: (value: any) => boolean
    value: any
}
/**
 * 单向链表(有头有尾)
 *
 * @export
 * @class LinkedList
 */
export default class LinkedList {
    protected HEAD: LinkedListNode;
    protected TAIL: LinkedListNode;
    constructor(head = null, tail= null) {
        this.HEAD = head;
        this.TAIL = tail;
    }
    public size(): number {
        if (!this.HEAD) { return 0; }
        let cur = this.HEAD;
        let count = 0;
        while (cur) {
            count ++;
            cur = cur.next;
        }
        return count;
    }
    /**
     * 头部插入节点
     *
     * @param {*} value
     * @returns {LinkedList}
     * @memberof LinkedList
     */
    public prepend(value: any): LinkedList {
        const newNode = new LinkedListNode(value, this.HEAD);
        this.HEAD = newNode;
        if (!this.TAIL) {
            this.TAIL = newNode; 
        }
        return this;
    }
    /**
     * 末尾插入节点
     *
     * @param {*} value
     * @returns {LinkedList}
     * @memberof LinkedList
     */
    public append(value: any): LinkedList {
        const newNode = new LinkedListNode(value);
        if (!this.HEAD) {
            this.HEAD = newNode;
            this.TAIL = newNode;
        }else{
            this.TAIL.next = newNode;
            this.TAIL = newNode;
        }
        return this;
    }
    /**
     * 删除匹配到输入值的节点
     *
     * @param {*} value
     * @returns {LinkedListNode}
     * @memberof LinkedList
     */
    public delete(value: any): LinkedListNode {
        if (!this.HEAD) {
            return null;
        }
        let deletedNode = null;
        if (this.HEAD && isEqual(this.HEAD.value, value)) {
            console.log(this.HEAD.value)
            deletedNode = this.HEAD;
            this.HEAD = this.HEAD.next;
        }
        let current = this.HEAD;
        if (current) {
            while (current.next) {
                if (isEqual(current.next.value, value)) {
                    deletedNode = current.next;
                    current.next = current.next.next;
                } else {
                    current = current.next;
                }
            }
        }
        // 确认tail节点的值是不是要删除的值，如果是的话，tail对应的节点被抛弃，失去tail的next指向，tail指向上文while循环下来的current节点
        if (isEqual(this.TAIL.value, value)) {
            this.TAIL = current;
        }
        return deletedNode;
    }
    /**
     * 
     * @param value 
     * @param findFunction 
     */
    public find(findParam:findParam): LinkedListNode {
        if(!this.HEAD) return null;
        let current = this.HEAD
        const { findFunction, value } = findParam
        while(current){
            if(findFunction && findFunction(current.value)){
                return current
            }
            if(value !== undefined && isEqual(value,current.value)){
                return current
            }
            current = current.next
        }
        return null
    }
    public deleteHead(): LinkedListNode{
        if(!this.HEAD){
            return null
        }
        const deleteNode = this.HEAD
        if( this.HEAD.next ){
            this.HEAD = this.HEAD.next
        }else{
            this.HEAD = null
            this.TAIL = null
        }
        return deleteNode
    }
    public deleteTail(): LinkedListNode{
        const deletedNode = this.TAIL;
        if(this.TAIL === this.HEAD){
            this.TAIL = null;
            this.HEAD = null;
            return deletedNode
        }
        let current = this.HEAD
        while(current.next){
            if(!current.next.next){
                current.next = null;
            }else{
                current = current.next;
            }
        }
        this.TAIL = current;
        return deletedNode
    }
    public toArray(): Array<any>{
        let current = this.HEAD,
            _arr = []
        while(current){
            _arr.push(current.value);
            current = current.next;
        }
        return _arr;
    }
    public toString(seperator: string = ','):string{
        return this.toArray().join(seperator);
    }
}
