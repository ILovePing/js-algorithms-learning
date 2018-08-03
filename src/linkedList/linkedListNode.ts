export default class LinkedListNode {
    public value: any;
    public next: LinkedListNode;
    constructor(value, next: LinkedListNode = null ) {
        this.value = value;
        this.next = next;
    }
    public toString(): string {
        return this.value.toString();
    }
}
