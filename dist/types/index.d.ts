import Jsoning, { JSONValue } from 'jsoning';
/**
 * @class TypedJsoning
 * @extends Jsoning
 * @template T
 * @description A typed version of Jsoning
 */
export declare class TypedJsoning<T extends JSONValue> extends Jsoning {
    /**
     * @constructor
     * @param path The path to the JSON file
     * @description Creates a new TypedJsoning instance
     */
    constructor(path: string);
    /**
     * @method set
     * @param {string} key The key of the element to set
     * @param {T} value
     * @returns
     */
    set(key: string, value: T): Promise<boolean>;
    get(key: string): T | undefined;
    all(): {
        [key: string]: T;
    };
}
export default TypedJsoning;
