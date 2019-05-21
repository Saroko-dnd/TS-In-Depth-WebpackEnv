import { ShelfItem } from '../interfaces';

export default class Shelf<T extends ShelfItem> {
    private _items: T[] = [];

    add(item: T): void {
        this._items.push(item);
    }

    find(title: string): T {
        return this._items.find(item => item.title === title);
    }

    getFirst(): T {
        return this._items[0];
    }

    printTitles(): void {
        this._items.forEach(item => console.log(item.title));
    }
}
