import ReferenceItem from './referenceItem';

class Encyclopedia extends ReferenceItem {
    constructor(newTitle: string, newYear: number, public edition: number) {
        super(newTitle, newYear);
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
