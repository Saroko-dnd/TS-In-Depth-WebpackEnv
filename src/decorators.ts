function sealed(className: string): Function {
    return (constructor: Function): void => {
        console.log(`Sealing the constructor ${className}`);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function(): void {
        console.log(`Creating new instance ${target.name}`);

        this.age = 30;
    };

    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;
    newConstructor.prototype.printLibrarian = function(): void {
        console.log(
            `Librarian name:  ${this.name}, Librarian age: ${this.age}`
        );
    };

    return <TFunction>newConstructor;
}

function writable(isWritable: boolean): Function {
    return function(
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.writable = isWritable;
    };
}

function timeout(milliseconds: number): Function {
    return function(
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const method = descriptor.value;

        descriptor.value = function(...args) {
            setTimeout(() => {
                method.apply(this, args);
            }, milliseconds);
        };

        return descriptor;
    };
}

function logParameter(target: Object, methodName: string, paramIndex: number) {
    const key = `${methodName}_decor_params_indexes`;

    if (Array.isArray(target[key])) {
        target[key].push(paramIndex);
    } else {
        target[key] = [paramIndex];
    }
}

export { sealed, logger, writable, timeout, logParameter };
