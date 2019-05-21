import * as Interfaces from '../interfaces';
import { sealed } from '../decorators';

@sealed('UniversityLibrarian')
class UniversityLibrarian implements Interfaces.Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }
}

export default UniversityLibrarian;
