import Jsoning from 'jsoning';
/**
 * Defines the return value of TypedJsoning#all()
 *
 * @typedef JsoningReturnAllValue
 * @type {Object<string, T>}
 */
/**
 * @class
 * @extends Jsoning
 * @description A typed version of Jsoning
 * @template T The type of the value to be stored in the JSON file.
 */
export class TypedJsoning extends Jsoning {
    /**
     * Create a new JSON file for storing or initialize an exisiting file to be used.
     *
     * @constructor
     * @param {string} path Path to the JSON file to be created or used.
     *
     * @example <caption>Initialise a new JSON file or use an existing JSON file</caption>
     * import Jsoning from 'jsoning';
     * const dbStrings = new Jsoning<string>('database.json');
     * const dbNumbers = new Jsoning<number>('../path/to/database.json');
     */
    constructor(path) {
        super(path);
    }
    /**
     * Adds an element to the database with the given value. If element with the given key exists, element value is updated.
     *
     * @async
     * @param {string} key Key of the element to be set.
     * @param {T} value Value of the element to be set.
     * @returns {Promise<boolean>} If element is set/updated successfully, returns `true`; returns `false` otherwise.
     *
     * @example
     * const db = new Jsoning<string>('database.json');
     *
     * db.set('en', 'db'); // currently { 'en': 'db' }
     * db.set('en', 'en'); // now at { 'en': 'en' }
     * db.set('foo', 'bar'); // currently { 'en': 'en', 'foo': 'bar' }
     * db.set('hi', 3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. Still at { 'en': 'en', 'foo': 'bar' }
     *
     * console.log(await db.set('k', 'v')); // -> true
     */
    async set(key, value) {
        return await super.set(key, value);
    }
    /**
     * Returns the value of an element by key.
     *
     * @param {string} key The key of the element to be fetched.
     * @returns {T | null} Returns the value, if the element exists; returns `null` otherwise.
     * @example
     * db.set('food', 'pizza');
     * console.log(db.get('food')); // -> 'pizza'
     */
    get(key) {
        return super.get(key);
    }
    /**
     * Deletes an element from the database based on its key.
     *
     * @param {string} key The key of the element to be deleted.
     * @returns {Promise<boolean>} Returns `true` if the value exists and was deleted; returns `false` otherwise.
     * @example
     * database.set('ping', 'pong');
     * database.set('foo', 'bar');
     * database.delete('foo'); // -> true
     */
    delete(key) {
        return super.delete(key);
    }
    /**
     * Returns all the elements and their values of the JSON file.
     *
     * @returns {JsoningReturnAllValue<T>} All the key-value pairs of the database.
     * @example
     * database.set("foo", "bar");
     * database.set("hi", "hello");
     *
     * const all = database.all();
     * console.log(all); // { "foo": "bar", "hi": "hello" }
     */
    all() {
        return super.all();
    }
}
export default TypedJsoning;
