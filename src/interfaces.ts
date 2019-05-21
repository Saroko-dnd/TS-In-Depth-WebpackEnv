import { Category } from './enums';

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface DamageLogger {
    (reason: string): void;
}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;

    pages?: number;

    markDamaged?: DamageLogger;
}

export { Person, Author, Librarian, DamageLogger as Logger, Book };
