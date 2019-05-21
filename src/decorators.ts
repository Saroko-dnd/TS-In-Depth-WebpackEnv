function sealed(parameter: string): Function {
    return (constructor: Function): void => {
        console.log(`Sealing the constructor ${parameter}`);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export { sealed };
