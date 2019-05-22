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
        const originalMethod = descriptor.value;

        descriptor.value = function(...args) {
            setTimeout(() => {
                originalMethod.apply(this, args);
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

function logMethod(
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
        const indexes = target[`${methodName}_decor_params_indexes`];

        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.indexOf(index) !== -1) {
                    console.log(
                        `Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`
                    );
                }
            });
        }

        const result = originalMethod.apply(this, args);

        return result;
    };

    return descriptor;
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

function format(pref: string = 'Mr./Mrs.'): Function {
    return function(target: Object, propertyName: string) {
        makeProperty(
            target,
            propertyName,
            value => `${pref} ${value}`,
            value => value
        );
    };
}

function positiveInteger(
    target: Object,
    propertyName: string,
    descriptor: PropertyDescriptor
) {
    const originalSetter = descriptor.set;

    descriptor.set = function(value: number) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error(
                `Value ${value} is invalid, only integers > 0 can be assigned!`
            );
        }

        originalSetter.call(this, value);
    };

    return descriptor;
}

export {
    sealed,
    logger,
    writable,
    timeout,
    logParameter,
    logMethod,
    format,
    positiveInteger
};
