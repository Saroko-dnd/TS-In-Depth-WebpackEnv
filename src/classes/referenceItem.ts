abstract class ReferenceItem {
    constructor(public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
    }

    /*constructor(newTitle: string, newYear: number) {
        console.log('Creating a new ReferenceItem...');

        this.title = newTitle;
        this.year = newYear;
    }

    title: string;
    year: number;*/

    static department = 'Programming';

    private _publisher: string;

    get publisher() {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    abstract printCitation(): void;

    printItem() {
        console.log(
            `${this.title} from ${
                ReferenceItem.department
            } department was published in ${this.year}`
        );
    }
}

export default ReferenceItem;
