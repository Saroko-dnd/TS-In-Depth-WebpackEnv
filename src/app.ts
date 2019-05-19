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

function getAllBooks(): any[] {
    let books: any[] = [
        {
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            category: Category.JavaScript,
            available: true
        },
        {
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            category: Category.JavaScript,
            available: false
        },
        {
            title: 'CSS Secrets',
            author: 'Lea Verou',
            category: Category.CSS,
            available: true
        },
        {
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

// ====================showing results in console==================================
console.log(logFirstAvailable(getAllBooks()));
