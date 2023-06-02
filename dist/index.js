import Jsoning from 'jsoning';
/**
 * @class TypedJsoning
 * @extends Jsoning
 * @template T
 * @description A typed version of Jsoning
 */
export class TypedJsoning extends Jsoning {
    /**
     * @constructor
     * @param path The path to the JSON file
     * @description Creates a new TypedJsoning instance
     */
    constructor(path) {
        super(path);
    }
    /**
     * @method set
     * @param {string} key The key of the element to set
     * @param {T} value
     * @returns
     */
    async set(key, value) {
        return await super.set(key, value);
    }
    get(key) {
        return super.get(key);
    }
    all() {
        return super.all();
    }
}
export default TypedJsoning;
