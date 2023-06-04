import Jsoning, { JSONValue } from 'jsoning';
/**
 * Defines the return value of TypedJsoning#all()
 *
 * @typedef JsoningReturnAllValue
 * @type {Object<string, T>}
 */
/**
 * Defines the mathematical operations that can be performed on values of elements.
 *
 * @enum {string} JsoningMathOperand
 * @readonly
 *
 * @example
 * // Start with { "one": 1, "two": 2, "three": 3, "four": 4 }
 * database.math('one', JsoningMathOperands.Add, 1);
 * database.math('two', JsoningMathOperands.Subtract, 1);
 * database.math('three', JsoningMathOperands.Multiply, 2);
 * database.math('four', JsoningMathOperands.Divide, 2);
 * // database content is now { "one": 2, "two": 1, "three": 6, "four": 2 }·
 */
export declare enum JsoningMathOperands {
    Add = "add",
    Subtract = "subtract",
    Multiply = "multiply",
    Divide = "divide"
}
/**
 * @class
 * @extends Jsoning
 * @description A typed version of Jsoning
 * @template T The type of the value to be stored in the JSON file.
 */
export declare class TypedJsoning<T extends JSONValue> extends Jsoning {
    /**
     * Create a new JSON file for storing or initialize an exisiting file to be used.
     *
     * @constructor
     * @param {string} path Path to the JSON file to be created or used.
     *
     * @example <caption>Initialise a new JSON file or use an existing JSON file</caption>
     * import { TypedJsoning } from 'typed-jsoning';
     * const db = new TypedJsoning<number>('db.json');
     * // db.json is created if it doesn't exist
     * await db.set('foo', 1); // -> true
     * // The following line should throw a similar error in TypeScript
     * await db.set('bar', 'two'); // TypeError: Argument of type '"two"' is not assignable to parameter of type 'number'.
     */
    constructor(path: string);
    /**
     * Returns all the elements and their values of the JSON file.
     *
     * @returns {JsoningReturnAllValue<T>} All the key-value pairs of the database.
     *
     * @example
     * db.set('foo', 'bar');
     * db.set('hi', 'hello');
     * console.log(db.all()); // { "foo": "bar", "hi": "hello" }
     */
    all(): {
        [key: string]: T;
    };
    /**
     * Clears the database.
     *
     * @async
     * @returns {Promise<boolean>}
     *
     * @example
     * db.set('foo','bar');
     * db.set('en', 'db');
     * db.clear(); // database file content is now {}
     */
    clear(): Promise<boolean>;
    /**
     * Deletes an element from the database based on its key.
     *
     * @async
     * @param {string} key The key of the element to be deleted.
     * @returns {Promise<boolean>} Returns `true` if the value exists and was deleted; returns `false` otherwise.
     *
     * @example
     * database.set('ping', 'pong');
     * database.set('foo', 'bar');
     * database.delete('foo'); // -> true
     */
    delete(key: string): Promise<boolean>;
    /**
     * Returns the value of an element by key.
     *
     * @param {string} key The key of the element to be fetched.
     * @returns {T | null} Returns the value, if the element exists; returns `null` otherwise.
     *
     * @example
     * db.set('food', 'pizza');
     * console.log(db.get('food')); // -> 'pizza'
     */
    get(key: string): T | undefined;
    /**
     * Check if a particular element exists by key.
     *
     * @param {string} key The key of the element to see if the element exists.
     *
     * @returns {boolean} True if the element exists, false if the element doesn't exist.
     *
     * @example
     * db.set('a', 'b');
     * console.log(db.has('a')); // -> true
     * console.log(database.has('otherkey')); // -> false
     */
    has(key: string): boolean;
    /**
     * Performs basic mathematical operations on values of elements.
     *
     * @async
     * @param {string} key The key of the element on which the mathematical operation is to be performed.
     * @param {string} operation The operation to perform, one of add, subtract, multiply and divide.
     * @param {number} operand The number for performing the mathematical operation (the operand).
     *
     * @returns {Promise<boolean>} True if the operation succeeded, else false.
     *
     * @example
     * database.set("value1", 1);
     * database.set("value2", 10);
     *
     * database.math("value1", "add", 1);
     * database.math("value2", "multiply", 5);
     *
     * console.log(database.get("value1")); // returns 1+1 = 2
     * console.log(database.get("value2")); // returns 10*5 = 50
     */
    math(key: string, operation: JsoningMathOperands, operand: number): Promise<boolean>;
    /**
     * Adds the given value into the provided element (if it's an array) in the database based on the key. If no such element exists, it will initialize a new element with an empty array.
     *
     * @async
     * @param {string} key The key of the element.
     * @param {JSONValue} value The value to be added to the element array.
     *
     * @returns {Promise<boolean>} True if the the value was pushed to an array successfully, else false.
     *
     * @example
     * database.push('leaderboard', 'user1');
     * database.push('leaderboard', 'user2');
     */
    push(key: string, value: JSONValue): Promise<boolean>;
    /**
     *
     * Removes a given primitive value from an array in the database based on the key. If no existing array, it will do nothing.
     *
     * @async
     * @param {string} key The key of the element.
     * @param {JSONValue} value The value to be removed from the element array.
     *
     * @returns {Promise<boolean>} True if successfully removed or not found or the key does not exist, else false.
     *
     * @example
     * database.remove("leaderboard", "wh0");
     *
     */
    remove(key: string, value: JSONValue): Promise<boolean>;
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
     * db.set('en', 'db'); // currently { 'en': 'db' }
     * db.set('en', 'en'); // now at { 'en': 'en' }
     * db.set('foo', 'bar'); // currently { 'en': 'en', 'foo': 'bar' }
     * db.set('hi', 3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. Still at { 'en': 'en', 'foo': 'bar' }
     * console.log(await db.set('k', 'v')); // -> true
     */
    set(key: string, value: T): Promise<boolean>;
}
export default TypedJsoning;
