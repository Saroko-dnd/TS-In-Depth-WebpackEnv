function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export { purge };
