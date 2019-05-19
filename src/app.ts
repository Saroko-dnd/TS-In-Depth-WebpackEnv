showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

const myID: string = createCustomerID('Ann', 10);
let idGenerator: (name: string, id: number) => string = (
    name: string,
    id: number
) => {
    return `${name}${id}`;
};

idGenerator = createCustomerID;

function getAllBooks(): any[] {
    let books: any[] = [
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

function logFirstAvailable(books: any[]): void {
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

function getBookTitlesByCategory(category: Category): Array<string> {
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

function getBookByID(id: number): any {
    return getAllBooks().find(book => book.id === id);
}

function createCustomerID(name: string, id: number): any {
    return `${name}${id}`;
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
