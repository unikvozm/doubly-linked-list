const Node = require("./node");

class LinkedList {
  constructor() {
    // nothing in the list
    this.length = 0;
    this._head = null;
    this._tail = null;
    this.linkedList = [];
  }

  append(data) {
    // should assign any nodes to this._head and this._tail if list is empty
    if (this.length === 0) {
      let element = new Node(data); // this is a 1st node => no prev, no next
      // set head to the start, tail to the end (now start = end)
      this._head = element;
      this._tail = element;
      // add element to the linked list
      this.linkedList.push(element);
      this.length++;
    } else {
      // if this is not the first node => append it next to the tail
      let element = new Node(data, this._tail);
      // move forward the tail
      this._tail = element;
      // add element to the end of the linked list
      this.linkedList.push(element);
      // change the previous node's next
      this.linkedList[this.length - 1].next = element;
      this.length++;
    }
    return this;
  }

  head() {
    // should return data from the this.head or null if it's empty
    return this.length > 0 ? this._head.data : null;
  }

  tail() {
    // should return data from the this.tail
    return this.length > 0 ? this._tail.data : null;
  }

  at(index) {
    // should return Node.data by index
    return this.length > 0 ? this.linkedList[index].data : null;
  }

  insertAt(index, data) {
    // should insert data by index
    if (index === this.length || this.length === 0) {
      this.append();
      return this;
    } else if (index === 0) {
      // create a new node and set its prev and next
      let newElement = new Node(data, null, index);
      // change the next element's prev
      this.linkedList[index].prev = newElement;
      // insert the new node into the linked list
      this.linkedList.splice(index, 0, newElement);
      this.length++;
      // move back the head
      this._head = newElement;
      return this;
    } else {
      // create a new node and set its prev and next
      let newElement = new Node(data, index - 1, index);
      // change the previos element's next and the next element's prev
      this.linkedList[index - 1].next = newElement;
      this.linkedList[index].prev = newElement;
      // insert the new node into the linked list
      this.linkedList.splice(index, 0, newElement);
      this.length++;
      return this;
    }
  }

  isEmpty() {
    // should return true if list is empty
    return this.length === 0;
  }

  clear() {
    // nothing in the list
    this.length = 0;
    this._head = null;
    this._tail = null;
    this.linkedList = [];
    return this;
  }

  deleteAt(index) {
    if (index < 0 || index > this.length) return this;
    if (index === 0) {
      if (this.length === 1) {
        this.clear();
        return this;
      }
      // change the next element's prev and the head
      this.linkedList[index + 1].prev = null;
      this._head = this.linkedList[index + 1];
      // delete the nthe first element
      this.linkedList.shift();
      this.length--;
      return this;
    } else if (index === this.length - 1) {
      // change the previous element's next and the tail
      this.linkedList[index - 1].next = null;
      this._tail = this.linkedList[index - 2];
      // delete the last element
      this.linkedList.pop();
      this.linkedList--;
      return this;
    } else {
      // change the previos element's next and the next element's prev
      this.linkedList[index - 1].next = this.linkedList[index + 1];
      this.linkedList[index + 1].prev = this.linkedList[index - 1];
      // delete the element
      this.linkedList.splice(index, 1);
      this.length--;
      return this;
    }
  }

  reverse() {
    //switch the tail and the head:
    this._head = this.linkedList[this.length - 1];
    this._tail = this.linkedList[0];
    // switch prev and next of each element
    this.linkedList.forEach(el => {
      let tmp = el.prev;
      el.prev = el.next;
      el.next = tmp;
    });
    // reverse the linked list
    this.linkedList.reverse();
    return this;
  }

  indexOf(data) {
    // should return index of element if data is found or return -1 if data is not found
    // collect all data values from each node
    let list = [];
    this.linkedList.forEach(obj => list.push(obj.data));

    return list.indexOf(data);
  }
}

module.exports = LinkedList;
