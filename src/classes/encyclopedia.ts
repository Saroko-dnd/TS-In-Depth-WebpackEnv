import ReferenceItem from './referenceItem';

class Encyclopedia extends ReferenceItem {
    constructor(newTitle: string, newYear: number, public edition: number) {
        super(newTitle, newYear);
    }

    printCitation(): void {
        console.log(`${this.title}–${this.year}`);
    }

    printItem() {
        console.log(
            `${this.title} from ${
                ReferenceItem.department
            } department was published in ${this.year}`
        );
        console.log(`Edition: ${this.edition} (${this.year})`);
    }
}

export default Encyclopedia;
