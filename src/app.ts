import { Category } from './enums';
import { UniversityLibrarian, Encyclopedia as RefBook, Shelf } from './classes';
import { Book, Author, Logger, Librarian, Magazine } from './interfaces';
import { purge } from './lib/utility-functions';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

const myID: string = createCustomerID('Ann', 10);
const checkedOutBooks: string[] = getTitles(false);
const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: printBookDamegeDescription
};
const logDamage: Logger = simpleDamageLogger;
const favoriteAuthor: Author = {
    name: 'Ethan',
    email: 'ethan@gmail.com',
    numBooksPublished: 12
};
/*const favoriteLibrarian: Librarian = {
    name: 'Matthew',
    email: 'matthew@gmail.com',
    department: 'fiction',
    assistCustomer: (custName: string) => {}
};*/
const favoriteLibrarian: Librarian = new UniversityLibrarian();
/*const ref: ReferenceItem = new ReferenceItem(
    'Programming Foundations with JavaScript, HTML, and CSS',
    2010
);*/
const refBook = new RefBook('Programming languages', 2015, 3);
const myBooks: string[] = сheckoutBooks('Ann', 1, 2, 4);
const inventory: Book[] = [
    {
        id: 10,
        title: 'The C Programming Language',
        author: 'K & R',
        available: true,
        category: Category.Software
    },
    {
        id: 11,
        title: 'Code Complete',
        author: 'Steve McConnell',
        available: true,
        category: Category.Software
    },
    {
        id: 12,
        title: '8-Bit Graphics with Cobol',
        author: 'A. B.',
        available: true,
        category: Category.Software
    },
    {
        id: 13,
        title: 'Cool autoexec.bat Scripts!',
        author: 'C. D.',
        available: true,
        category: Category.Software
    }
];
const bookShelf: Shelf<Book> = new Shelf();
const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf: Shelf<Magazine> = new Shelf();

let idGenerator: (name: string, id: number) => string = (
    name: string,
    id: number
) => {
    return `${name}${id}`;
};

idGenerator = createCustomerID;
favoriteLibrarian.name = 'Joshua';
// ref.publisher = 'Arcadia Publishing';
inventory.forEach(book => {
    bookShelf.add(book);
});
magazines.forEach(magazine => {
    magazineShelf.add(magazine);
});

function getAllBooks(): Book[] {
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

function logFirstAvailable(books = getAllBooks()): void {
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

function getBookTitlesByCategory(
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

function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

function getBookByID(id: number): Book | undefined {
    return getAllBooks().find(book => book.id === id);
}

function createCustomerID(name: string, id: number): string {
    return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`age: ${age}`);
    }
    if (city) {
        console.log(`city: ${city}`);
    }
}

function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
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

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(bookProperty: string | boolean): string[] {
    const propType: string = typeof bookProperty;

    return getAllBooks()
        .filter(book =>
            propType === 'string'
                ? book.author === bookProperty
                : book.available === bookProperty
        )
        .map(book => book.title);
}

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

function printBookDamegeDescription(reason: string): void {
    console.log(`Damaged: ${reason}`);
}

function simpleDamageLogger(damage: string): void {
    console.log(`Damage description: ${damage}`);
}

// ====================showing results in console==================================
// task 1
logFirstAvailable(getAllBooks());

// task 2-3
console.log('\nTitles of books from JavaScript category:');
logBookTitles(getBookTitlesByCategory(Category.JavaScript));

// task 4
console.log(`\n${myID}`);
console.log(idGenerator('idGenerator', 123));

// task 5
console.log('\ncreateCustomer function testing:\n');
createCustomer('Jacob');
createCustomer('Mason', 30);
createCustomer('William', 28, 'New York');
console.log(
    '\nCalling function getBookTitlesByCategory without parameter (default category: JavaScript):\n'
);
logBookTitles(getBookTitlesByCategory());
console.log(
    '\nCalling logFirstAvailable without parameter (default value: result of getAllBooks function call):\n'
);
logFirstAvailable();
console.log('\nResult of сheckoutBooks(Ann, 1, 2, 4)\n');
myBooks.forEach(title => console.log(title));

// task 6
console.log('\nResult of getTitles(false)\n');
checkedOutBooks.forEach(title => console.log(title));

// task 7
console.log('\n printBook function test');
printBook(myBook);
console.log('\n myBook.markDamaged method test\n');
myBook.markDamaged('missing back cover');

// task 8
console.log(
    `\n Testing simpleDamageLogger function which was assigned to variable logDamage of type DamageLogger`
);
logDamage(`several pages was ripped out`);

// task 10
console.log('\n Result of favoriteLibrarian.assistCustomer(Michael):');
favoriteLibrarian.assistCustomer('Michael');

// task 11
/*console.log('\n Tests for class ReferenceItem:');
ref.printItem();
console.log(ref.publisher);*/

// task 12
console.log('\n Test of method printItem from class Encyclopedia');
refBook.printItem();

// task 13
console.log('\n Result of refBook.printCitation():');
refBook.printCitation();

// task 18
console.log('\n Testing of generic function purge: ');
console.log(purge<Book>(inventory));
console.log(purge<number>([1, 2, 3, 4, 5]));

// task 19
console.log('\n Testing methods getFirst and add of class Shelf:');
console.log(bookShelf.getFirst());
console.log(magazineShelf.getFirst());

// task 20
console.log('\n Testing methods printTitles and find of class Shelf:');
magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));
