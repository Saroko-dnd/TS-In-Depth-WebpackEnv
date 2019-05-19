showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

function getAllBooks(): any[] {
    let books: any[] = [
        {
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true
        },
        {
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false
        },
        { title: 'CSS Secrets', author: 'Lea Verou', available: true },
        {
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true
        }
    ];

    return books;
}
