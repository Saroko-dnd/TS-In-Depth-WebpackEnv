import ReferenceItem from './referenceItem';
import { positiveInteger } from '../decorators';

class Encyclopedia extends ReferenceItem {
    constructor(newTitle: string, newYear: number, public edition: number) {
        super(newTitle, newYear);
    }

    private _copies: number;

    @positiveInteger
    get copies() {
        return this._copies;
    }

    set copies(value: number) {
        this._copies = value;
    }

    printCitation(): void {
        console.log(`${this.title}–${this.year}`);
    }

    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }
}

export default Encyclopedia;
