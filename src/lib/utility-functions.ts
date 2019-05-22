import { Book, LibMgrCallback } from '../interfaces';
import { Category } from '../enums';

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function getAllBooks(): Book[] {
    let books: Book[] = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            category: Category.JavaScript,
            available: true
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            category: Category.JavaScript,
            available: false
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            category: Category.CSS,
            available: true
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            category: Category.JavaScript,
            available: true
        }
    ];

    return books;
}

export function logFirstAvailable(books = getAllBooks()): void {
    const numberOfBooks: number = books.length;
    let firstAvailableTitle: string;

    for (const book of books) {
        if (book.available) {
            firstAvailableTitle = book.title;
            break;
        }
    }

    console.log(`Number of books: ${numberOfBooks}`);
    console.log(`First available title: ${firstAvailableTitle}`);
}

export function getBookTitlesByCategory(
    category = Category.JavaScript
): Array<string> {
    const titles: Array<string> = [];

    for (const book of getAllBooks()) {
        if (book.category === category) {
            titles.push(book.title);
        }
    }

    return titles;
}

export function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

export function getBookByID(id: number): Book | undefined {
    return getAllBooks().find(book => book.id === id);
}

export function createCustomerID(name: string, id: number): string {
    return `${name}${id}`;
}

export function createCustomer(
    name: string,
    age?: number,
    city?: string
): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`age: ${age}`);
    }
    if (city) {
        console.log(`city: ${city}`);
    }
}

export function сheckoutBooks(
    customer: string,
    ...bookIDs: number[]
): string[] {
    const availableTitles: string[] = [];

    console.log(`Request was made by: ${customer}`);

    bookIDs.forEach(id => {
        const book: Book | undefined = getBookByID(id);

        if (book && book.available) {
            availableTitles.push(book.title);
        }
    });

    return availableTitles;
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(bookProperty: string | boolean): string[] {
    const propType: string = typeof bookProperty;

    return getAllBooks()
        .filter(book =>
            propType === 'string'
                ? book.author === bookProperty
                : book.available === bookProperty
        )
        .map(book => book.title);
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function printBookDamegeDescription(reason: string): void {
    console.log(`Damaged: ${reason}`);
}

export function simpleDamageLogger(damage: string): void {
    console.log(`Damage description: ${damage}`);
}

export function getBooksByCategory(
    category: Category,
    callback: LibMgrCallback
): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);

            if (!titles.length) {
                throw new Error(`No books found.`);
            }

            callback(null, titles);
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}
