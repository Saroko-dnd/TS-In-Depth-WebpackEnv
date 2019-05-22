function sealed(className: string): Function {
    return (constructor: Function): void => {
        console.log(`Sealing the constructor ${className}`);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

function logger(target: Function): Function {
    const newConstructor: Function = function() {
        console.log(`Creating new instance ${target.name}`);

        this.age = 30;
    };

    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;

    return newConstructor;
}

export { sealed, logger };
