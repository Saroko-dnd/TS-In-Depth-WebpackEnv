import { Category } from './enums';
import { UniversityLibrarian, Encyclopedia as RefBook, Shelf } from './classes';
import { Book, Author, Logger, Librarian, Magazine } from './interfaces';
import {
    purge,
    createCustomerID,
    getTitles,
    printBookDamegeDescription,
    simpleDamageLogger,
    сheckoutBooks,
    logFirstAvailable,
    getAllBooks,
    logBookTitles,
    getBookTitlesByCategory,
    createCustomer,
    printBook,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryPromise
} from './lib/utility-functions';

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
const fLibrarian: UniversityLibrarian = new UniversityLibrarian();

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
fLibrarian.name = 'Anna';

// ====================showing results in console + some task specific code==================================
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

// task 22
console.log('\n Testing new method printLibrarian from decorator logger:');
fLibrarian['printLibrarian']();

// task 26
console.log('\n Testing of property decorator @format:');
console.log(favoriteLibrarian.name);

// task 27
console.log('\n Testing of @positiveInteger accessor decorator:');
const randomNumbers = [-10, 0, 4.5, 5];
randomNumbers.forEach(value => {
    try {
        refBook.copies = value;
    } catch (error) {
        console.log(error);
    }
});

// task 28
console.log('\n Testing function getBooksByCategory:');
console.log('BEFORE async function getBooksByCategory was called');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('AFTER async function getBooksByCategory has been called');

// task 29
console.log('\n Testing function getBooksByCategoryPromise:');
console.log('BEFORE async function getBooksByCategoryPromise was called');
getBooksByCategoryPromise(Category.JavaScript)
    .then(titles => {
        console.log(titles.join(', '));

        return titles.length;
    })
    .then(numerOfBooks => {
        console.log(`Number of books in category Javascript: ${numerOfBooks}`);
    })
    .catch(err => console.log(err));
getBooksByCategoryPromise(Category.Software)
    .then(titles => {
        console.log(titles.join(', '));

        return titles.length;
    })
    .then(numerOfBooks => {
        console.log(`Number of books in category Software: ${numerOfBooks}`);
    })
    .catch(err => console.log(err));
console.log('AFTER async function getBooksByCategoryPromise has been called');

console.log('\n\n\n Results of asynchronous operations:');
