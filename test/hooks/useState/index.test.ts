import { describe, expect, test } from 'bun:test';
import { useState } from 'dust';

describe('Hooks', () => {
  describe('useState', () => {
    describe('fundamentals', () => {
      test('stores initial value', () => {
        const [counter] = useState(0);
        expect(counter()).toBe(0);
      });

      test('changes state using setter', () => {
        const [counter, setCounter] = useState(0);

        setCounter(5);
        expect(counter()).toBe(5);
      });

      test('changes state using __setter__', () => {
        const [counter] = useState(0);

        counter.__setter__(6);
        expect(counter()).toBe(6);
      });

      test('changes state using prev', () => {
        const [counter, setCounter] = useState(2);

        setCounter((prev: number): number => prev + 8);
        expect(counter()).toBe(10);
      });

      test('sets value with undefined/null', () => {
        const [value, setValue] = useState<number | null | undefined>(42);

        setValue(null);
        expect(value()).toBe(null);

        setValue(undefined);
        expect(value()).toBeUndefined();
      });
    });

    describe('primitive conversion', () => {
      describe('toString behavior', () => {
        test('converts numbers to string in template literals', () => {
          const [counter] = useState(42);
          expect(`Count: ${counter}`).toBe('Count: 42');
        });

        test('converts strings to string in template literals', () => {
          const [name] = useState('Paul');
          expect(`Name: ${name}`).toBe('Name: Paul');
        });

        test('converts booleans to string in template literals', () => {
          const [bool] = useState(true);
          expect(`Boolean: ${bool}`).toBe('Boolean: true');
        });

        test('converts objects to string in template literals', () => {
          const [user] = useState({ name: 'John' });
          expect(`${user}`).toBe('[object Object]');
        });

        test('works with String() constructor', () => {
          const [counter] = useState(42);
          expect(String(counter)).toBe('42');
        });

        test('works with toString() method', () => {
          const [counter] = useState(42);
          expect(counter.toString()).toBe('42');
        });

        test('updates string representation when state changes', () => {
          const [counter, setCounter] = useState(0);
          expect(`${counter}`).toBe('0');

          setCounter(5);
          expect(`${counter}`).toBe('5');
        });
      });

      describe('valueOf behavior', () => {
        test('converts to number in arithmetic operations', () => {
          const [counter] = useState(42);
          expect(counter + 10).toBe(52);
          expect(counter - 2).toBe(40);
          expect(counter * 2).toBe(84);
          expect(counter / 2).toBe(21);
        });

        test('converts strings to number in arithmetic', () => {
          const [text] = useState('123');
          expect(text + 10).toBe('12310'); // String concatenation, not addition
          expect(+text + 10).toBe(133); // Explicit number conversion
        });

        test('works with Number() constructor', () => {
          const [counter] = useState(42);
          expect(Number(counter)).toBe(42);
        });

        test('works with valueOf() method', () => {
          const [counter] = useState(42);
          expect(counter.valueOf()).toBe(42);
        });

        test('handles boolean values', () => {
          const [flag] = useState(true);
          expect(Number(flag)).toBe(1);
          expect(flag.valueOf()).toBe(true);
        });
      });

      describe('type coercion edge cases', () => {
        test('equality comparisons work correctly', () => {
          const [counter] = useState(42);

          // CAVEAT: we cannot make === work as expected because getter is a proxy
          expect(counter === 42).toBe(false);
          // WORKAROUND: to make === work as expected (by calling the proxy)
          expect(counter() === 42).toBe(true);

          const [text] = useState('42');

          // CAVEAT: we cannot make === work as expected because getter is a proxy
          expect(text === '42').toBe(false);
          // WORKAROUND: to make === work as expected (by calling the proxy)
          expect(text() === '42').toBe(true);
        });

        test('loose equality with string', () => {
          const [counter] = useState(42);
          expect(counter == 42).toBe(true);
          expect((counter as unknown as string) == '42').toBe(true);

          const [text] = useState('42');
          expect((text as unknown as number) == 42).toBe(true);
          expect(text == '42').toBe(true);
        });

        test('comparison with numbers', () => {
          const [counter] = useState(42);
          expect(counter > 41).toBe(true);
          expect(counter > 43).toBe(false);
          expect(counter < 41).toBe(false);
          expect(counter < 43).toBe(true);
          expect(counter >= 42).toBe(true);
          expect(counter <= 42).toBe(true);
          expect(counter !== 41).toBe(true);
          expect(counter !== 43).toBe(true);
          expect(counter != 42).toBe(false);

          // CAVEAT: we cannot make !== work as expected because getter is a proxy
          expect(counter !== 42).toBe(true);
          // WORKAROUND: to make !== work as expected (by calling the proxy)
          expect(counter() !== 42).toBe(false);
        });

        test('truthy/falsy behavior', () => {
          const [zero] = useState(0);
          const [nonZero] = useState(42);
          const [emptyString] = useState('');
          const [text] = useState('hello');

          expect(!!nonZero).toBe(true);
          expect(!!emptyString).toBe(true);
          expect(!!text).toBe(true);

          // CAVEAT: it is impossible to make this behave as !!0 as `zero` is a proxy and thus truthy
          expect(!!zero).toBe(true);
          expect(!!zero && true).toBe(true);

          // WORKAROUND: this is the only way to make this behave as !!0 (by calling the proxy)
          expect(!!zero()).toBe(false);
          expect(!!zero() && true).toBe(false);
        });

        test('concatenation with strings', () => {
          const [counter] = useState(42);
          expect(counter + '').toBe('42');
          expect('' + counter).toBe('42');
        });

        test('handles null and undefined', () => {
          const [nullValue] = useState(null);
          const [undefinedValue] = useState(undefined);

          expect(`${nullValue}`).toBe('null');
          expect(`${undefinedValue}`).toBe('undefined');
        });

        test('type checks', () => {
          const [date] = useState(new Date());
          const [array] = useState([1, 2, 3]);
          const [object] = useState({});

          expect(date.constructor === Date).toBe(true);
          expect(array.constructor === Array).toBe(true);
          expect(object.constructor === Object).toBe(true);

          expect(date instanceof Date).toBe(true);
          expect(array instanceof Array).toBe(true);
          expect(object instanceof Object).toBe(true);

          // CAVEAT: we cannot make isArray return true if current value is an array (engine limitation)
          expect(Array.isArray(array)).toBe(false);
          // WORKAROUND: to make isArray return true if current value is an array (by calling the proxy)
          expect(Array.isArray(array())).toBe(true);

          // CAVEAT: these we cannot make typeof return the type of the current value (engine limitation)
          expect(typeof date).toBe('function');
          expect(typeof array).toBe('function');
          expect(typeof object).toBe('function');
          // WORKAROUND: to make typeof return the type of the current value (by calling the proxy)
          expect(typeof date()).toBe('object');
          expect(typeof array()).toBe('object');
          expect(typeof object()).toBe('object');

          expect(Object.prototype.toString.call(date)).toBe('[object Date]');
          expect(Object.prototype.toString.call(array)).toBe('[object Array]');
          expect(Object.prototype.toString.call(object)).toBe(
            '[object Object]',
          );
        });
      });

      describe('complex data types', () => {
        test('handles arrays', () => {
          const [array] = useState([1, 2, 3]);
          expect(`${array}`).toBe('1,2,3');
          expect(String(array)).toBe('1,2,3');
        });

        test('handles nested objects', () => {
          const [object] = useState({ user: { name: 'Alice', age: 30 } });
          expect(`${object}`).toBe('[object Object]');
        });

        test('handles functions as values', () => {
          const testFn = (): string => 'test';
          const [fn] = useState(testFn);
          expect(fn()).toBe(testFn);
          expect(`${fn}`).toBe('() => "test"');
        });

        test('functional updates with complex calculations', () => {
          interface State {
            items: string[];
            total: number;
          }

          const [data, setData] = useState<State>({ items: [], total: 0 });

          setData((prev: State) => ({
            items: [...prev.items, 'new item'],
            total: prev.total + 1,
          }));

          expect(data.items).toEqual(['new item']);
          expect(data.total).toBe(1);
        });
      });

      describe('JSON serialization', () => {
        test('serializes primitive values', () => {
          const [counter] = useState(42);
          const [text] = useState('hello');
          const [flag] = useState(true);

          expect(JSON.stringify(counter)).toBe('42');
          expect(JSON.stringify(text)).toBe('"hello"');
          expect(JSON.stringify(flag)).toBe('true');
        });

        test('serializes null and undefined', () => {
          const [nullValue] = useState(null);
          const [undefinedValue] = useState(undefined);

          expect(JSON.stringify(nullValue)).toBe('null');
          expect(JSON.stringify(undefinedValue)).toBeUndefined();
        });

        test('serializes objects and arrays', () => {
          const [user] = useState({ name: 'John', age: 30 });
          const [numbers] = useState([1, 2, 3]);
          const [nested] = useState({ items: [{ id: 1 }, { id: 2 }] });

          expect(JSON.stringify(user)).toBe('{"name":"John","age":30}');
          expect(JSON.stringify(numbers)).toBe('[1,2,3]');
          expect(JSON.stringify(nested)).toBe('{"items":[{"id":1},{"id":2}]}');
        });

        test('works when state is part of larger object', () => {
          const [counter] = useState(5);
          const [name] = useState('Alice');
          const [items] = useState([1, 2]);

          const json = JSON.stringify({
            count: counter,
            userName: name,
            data: items,
          });

          expect(json).toBe('{"count":5,"userName":"Alice","data":[1,2]}');
        });

        test('updates JSON representation after state changes', () => {
          const [counter, setCounter] = useState(10);
          expect(JSON.stringify(counter)).toBe('10');

          setCounter(20);
          expect(JSON.stringify(counter)).toBe('20');
        });

        test('handles functions as values', () => {
          const testFn = (): string => 'test';
          const [fn] = useState(testFn);

          expect(JSON.stringify(fn)).toBeUndefined();
        });

        test('works with JSON.stringify in arrays', () => {
          const [a] = useState(1);
          const [b] = useState('hello');
          const [c] = useState({ x: 10 });

          const json = JSON.stringify([a, b, c]);
          expect(json).toBe('[1,"hello",{"x":10}]');
        });
      });

      describe('state updates with primitive conversion', () => {
        test('string representation updates after setter', () => {
          const [counter, setCounter] = useState(0);
          expect(`${counter}`).toBe('0');

          setCounter(100);
          expect(`${counter}`).toBe('100');
        });

        test('arithmetic operations work after updates', () => {
          const [counter, setCounter] = useState(5);
          expect(counter + 5).toBe(10);

          setCounter(20);
          expect(counter + 5).toBe(25);
        });

        test('updates with functional setter maintain conversion', () => {
          const [counter, setCounter] = useState(10);
          expect(`${counter}`).toBe('10');

          setCounter((prev) => prev * 2);
          expect(`${counter}`).toBe('20');
          expect(counter + 5).toBe(25);
        });

        test('complex type updates maintain conversion', () => {
          const [object, setObject] = useState({ count: 5 });
          expect(`${object}`).toBe('[object Object]');
          expect(JSON.stringify(object)).toBe('{"count":5}');

          setObject({ count: 10 });
          expect(`${object}`).toBe('[object Object]');
          expect(JSON.stringify(object)).toBe('{"count":10}');
        });
      });
    });

    describe('proxy traps', () => {
      describe('getPrototypeOf behavior', () => {
        test('returns correct prototype for objects', () => {
          const [object] = useState({ name: 'test' });
          expect(Object.getPrototypeOf(object)).toBe(Object.prototype);
        });

        test('returns correct prototype for arrays', () => {
          const [array] = useState([1, 2, 3]);
          expect(Object.getPrototypeOf(array)).toBe(Array.prototype);
        });

        test('returns correct prototype for dates', () => {
          const [date] = useState(new Date());
          expect(Object.getPrototypeOf(date)).toBe(Date.prototype);
        });

        test('returns correct prototype for custom classes', () => {
          class CustomClass {
            value = 42;
          }
          const [instance] = useState(new CustomClass());
          expect(Object.getPrototypeOf(instance)).toBe(CustomClass.prototype);
        });

        test('returns correct prototype for primitive values', () => {
          const [number] = useState(42);
          const [string] = useState('hello');
          const [bool] = useState(true);

          expect(Object.getPrototypeOf(number)).toBe(Number.prototype);
          expect(Object.getPrototypeOf(string)).toBe(String.prototype);
          expect(Object.getPrototypeOf(bool)).toBe(Boolean.prototype);
        });

        test('updates prototype when state changes', () => {
          const [value, setValue] = useState<number | string>(42);
          expect(Object.getPrototypeOf(value)).toBe(Number.prototype);

          setValue('hello');
          expect(Object.getPrototypeOf(value)).toBe(String.prototype);
        });
      });

      describe('has behavior', () => {
        test('detects properties in objects', () => {
          const [user] = useState({ name: 'John', age: 30 });
          expect('name' in user).toBe(true);
          expect('age' in user).toBe(true);
          expect('email' in user).toBe(false);
        });

        test('detects array indices and properties', () => {
          const [array] = useState([1, 2, 3]);
          expect(0 in array).toBe(true);
          expect(1 in array).toBe(true);
          expect(2 in array).toBe(true);
          expect(3 in array).toBe(false);
          expect('length' in array).toBe(true);
          expect(array.length).toBe(3);
        });

        test('detects inherited properties', () => {
          const [object] = useState({});
          expect('toString' in object).toBe(true);
          expect('valueOf' in object).toBe(true);
          expect('hasOwnProperty' in object).toBe(true);
        });

        test('works with Reflect.has', () => {
          const [object] = useState({ prop: 'value' });
          expect(Reflect.has(object, 'prop')).toBe(true);
          expect(Reflect.has(object, 'missing')).toBe(false);
        });

        test('updates when state changes', () => {
          const [object, setObject] = useState<Record<string, unknown>>({
            a: 1,
          });

          expect('a' in object).toBe(true);
          expect('b' in object).toBe(false);

          setObject({ b: 2 });

          expect('a' in object).toBe(false);
          expect('b' in object).toBe(true);
        });
      });

      describe('ownKeys behavior', () => {
        test('returns own keys for objects', () => {
          const [user] = useState({ name: 'John', age: 30, city: 'NYC' });
          const keys = Object.keys(user);
          expect(keys).toEqual(['name', 'age', 'city']);
        });

        test('returns indices for arrays', () => {
          const [array] = useState(['a', 'b', 'c']);
          const keys = Object.keys(array);
          expect(keys).toEqual(['0', '1', '2']);
        });

        test('works with Object.getOwnPropertyNames', () => {
          const [array] = useState([1, 2]);
          const names = Object.getOwnPropertyNames(array);
          expect(names).toContain('0');
          expect(names).toContain('1');
          expect(names).toContain('length');
        });

        test('works with Reflect.ownKeys', () => {
          const [object] = useState({ prop: 'value' });
          const keys = Reflect.ownKeys(object);
          expect(keys).toEqual(['prop']);
        });

        test('includes symbol keys', () => {
          const symbol = Symbol('test');
          const [object] = useState({
            [symbol]: 'symbolValue',
            normalProp: 'value',
          });

          const keys = Reflect.ownKeys(object);
          expect(keys).toContain('normalProp');
          expect(keys).toContain(symbol);
        });

        test('updates when state changes', () => {
          const [object, setObject] = useState<Record<string, number>>({
            a: 1,
          });

          expect(Object.keys(object)).toEqual(['a']);
          setObject({ a: 1, b: 2, c: 3 });
          expect(Object.keys(object)).toEqual(['a', 'b', 'c']);
        });

        test('handles primitive values', () => {
          const [string] = useState('hello');
          const stringKeys = Object.keys(string);
          expect(stringKeys).toEqual(['0', '1', '2', '3', '4']);

          const [number] = useState(42);
          const numberKeys = Object.keys(number);
          expect(numberKeys).toEqual([]);
        });
      });

      describe('getOwnPropertyDescriptor behavior', () => {
        test('returns descriptors for object properties', () => {
          const [user] = useState({ name: 'John', age: 30 });
          const nameDesc = Object.getOwnPropertyDescriptor(user, 'name');
          const ageDesc = Object.getOwnPropertyDescriptor(user, 'age');

          expect(nameDesc).toEqual({
            value: 'John',
            writable: true,
            enumerable: true,
            configurable: true,
          });
          expect(ageDesc).toEqual({
            value: 30,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        });

        test('returns descriptors for array indices', () => {
          const [array] = useState(['a', 'b', 'c']);
          const zeroDesc = Object.getOwnPropertyDescriptor(array, '0');
          const lengthDesc = Object.getOwnPropertyDescriptor(array, 'length');

          expect(zeroDesc).toEqual({
            value: 'a',
            writable: true,
            enumerable: true,
            configurable: true,
          });

          expect(lengthDesc).toEqual({
            value: 3,
            writable: true,
            enumerable: false,
            configurable: true,
          });
        });

        test('returns undefined for non-existent properties', () => {
          const [object] = useState({ prop: 'value' });
          const descriptor = Object.getOwnPropertyDescriptor(object, 'missing');
          expect(descriptor).toBeUndefined();
        });

        test('works with Reflect.getOwnPropertyDescriptor', () => {
          const [object] = useState({ test: 42 });
          const descriptor = Reflect.getOwnPropertyDescriptor(object, 'test');
          expect(descriptor).toEqual({
            value: 42,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        });

        test('updates when state changes', () => {
          const [object, setObject] = useState({ value: 10 });

          let descriptor = Object.getOwnPropertyDescriptor(object, 'value');
          expect(descriptor?.value).toBe(10);

          setObject({ value: 20 });

          descriptor = Object.getOwnPropertyDescriptor(object, 'value');
          expect(descriptor?.value).toBe(20);
        });

        test('handles primitive values', () => {
          const [string] = useState('hello');
          const zeroDesc = Object.getOwnPropertyDescriptor(string, '0');
          const lengthDesc = Object.getOwnPropertyDescriptor(string, 'length');

          expect(zeroDesc).toMatchObject({
            value: 'h',
            writable: false,
            enumerable: true,
          });

          expect(lengthDesc).toMatchObject({
            value: 5,
            writable: false,
            enumerable: false,
          });
        });
      });

      describe('combined proxy trap behavior', () => {
        test('all traps work together for object introspection', () => {
          const [user] = useState({
            name: 'Alice',
            age: 25,
            city: 'Boston',
          });

          // Check prototype
          expect(Object.getPrototypeOf(user)).toBe(Object.prototype);

          // Check property existence
          expect('name' in user).toBe(true);
          expect('email' in user).toBe(false);

          // Check own keys
          expect(Object.keys(user)).toEqual(['name', 'age', 'city']);

          // Check property descriptors
          const nameDesc = Object.getOwnPropertyDescriptor(user, 'name');
          expect(nameDesc?.value).toBe('Alice');
          expect(nameDesc?.enumerable).toBe(true);
        });

        test('traps update consistently when state changes', () => {
          const [data, setData] = useState<Record<string, number>>({ a: 1 });

          expect('a' in data).toBe(true);
          expect(Object.keys(data)).toEqual(['a']);
          expect(Object.getOwnPropertyDescriptor(data, 'a')?.value).toBe(1);

          setData({ b: 2, c: 3 });

          expect('a' in data).toBe(false);
          expect('b' in data).toBe(true);
          expect('c' in data).toBe(true);
          expect(Object.keys(data)).toEqual(['b', 'c']);
          expect(Object.getOwnPropertyDescriptor(data, 'b')?.value).toBe(2);
          expect(Object.getOwnPropertyDescriptor(data, 'c')?.value).toBe(3);
        });

        test('works with Object.assign and spread operator', () => {
          const [source, setSource] = useState<Record<string, number>>({
            a: 1,
            b: 2,
          });

          const target = Object.assign({}, source);
          const spread = { ...source };
          const { a, ...rest } = source;

          expect(target as unknown as Record<string, number>).toEqual({
            a: 1,
            b: 2,
          });

          expect(spread as unknown as Record<string, number>).toEqual({
            a: 1,
            b: 2,
          });

          expect(a).toBe(1);
          expect(rest as unknown as Record<string, number>).toEqual({ b: 2 });

          setSource({ c: 3, d: 4 });
          const { c, ...tail } = source;

          expect(c).toBe(3);
          expect(tail as unknown as Record<string, number>).toEqual({ d: 4 });
        });
      });
    });

    describe('object property access', () => {
      test('accesses object properties directly', () => {
        const [user] = useState({ name: 'John', age: 30, city: 'NYC' });

        expect(user.name).toBe('John');
        expect(user.age).toBe(30);
        expect(user.city).toBe('NYC');
      });

      test('binds object methods to current value', () => {
        const [object, setObject] = useState({
          value: 42,
          getValue(): number {
            return this.value;
          },
          multiply(factor: number): number {
            return this.value * factor;
          },
        });

        expect(object.getValue()).toBe(42);
        expect(object.multiply(2)).toBe(84);

        const { getValue } = object;
        expect(getValue()).toBe(42);

        setObject((prev) => ({ ...prev, value: 100 }));

        expect(object.getValue()).toBe(100);
        expect(object.multiply(2)).toBe(200);
      });

      test('handles objects with getters and setters', () => {
        const [object] = useState({
          _value: 100,
          get value(): number {
            return this._value;
          },
          set value(newValue: number) {
            this._value = newValue;
          },
          getValue(): number {
            return this.value;
          },
        });

        expect(object.value).toBe(100);
        expect(object.getValue()).toBe(100);

        object.value = 200;

        expect(object.value).toBe(200);
        expect(object.getValue()).toBe(200);
      });

      test('handles nested objects with methods', () => {
        const [calculator, setCalculator] = useState({
          operations: {
            current: 10,
            add(n: number): number {
              return this.current + n;
            },
            subtract(n: number): number {
              return this.current - n;
            },
          },
        });

        expect(calculator.operations.add(5)).toBe(15);
        expect(calculator.operations.subtract(3)).toBe(7);

        setCalculator((prev) => ({
          ...prev,
          operations: { ...prev.operations, current: 20 },
        }));

        expect(calculator.operations.add(5)).toBe(25);
        expect(calculator.operations.subtract(3)).toBe(17);
      });

      test('works with array methods', () => {
        const [numbers] = useState([1, 2, 3, 4, 5]);

        expect(numbers.length).toBe(5);
        expect(numbers.join(',')).toBe('1,2,3,4,5');
        expect(numbers.slice(1, 3)).toEqual([2, 3]);
        expect(numbers.indexOf(3)).toBe(2);

        const { map } = numbers;
        expect(map((x) => x * 2)).toEqual([2, 4, 6, 8, 10]);
      });

      test('handles Date object methods', () => {
        const [date] = useState(new Date('2023-01-01'));

        expect(date.getFullYear()).toBe(2023);
        expect(date.getMonth()).toBe(0);
        expect(date.getDate()).toBe(1);

        const { getFullYear } = date;
        expect(getFullYear()).toBe(2023);
      });

      test('preserves method context when state updates', () => {
        const createCounter = (
          initial: number,
        ): {
          count: number;
          increment(): number;
          getCount(): number;
        } => ({
          count: initial,
          increment(): number {
            this.count++;
            return this.count;
          },
          getCount(): number {
            return this.count;
          },
        });

        const [counter, setCounter] = useState(createCounter(0));

        expect(counter.getCount()).toBe(0);
        expect(counter.increment()).toBe(1);

        setCounter(createCounter(10));

        expect(counter.getCount()).toBe(10);
        expect(counter.increment()).toBe(11);
      });

      test('handles Map and Set objects', () => {
        const [map] = useState(
          new Map([
            ['key1', 'value1'],
            ['key2', 'value2'],
          ]),
        );
        const [set] = useState(new Set([1, 2, 3]));

        expect(map.get('key1')).toBe('value1');
        expect(map.has('key2')).toBe(true);
        expect(map.size).toBe(2);

        expect(set.has(2)).toBe(true);
        expect(set.size).toBe(3);

        const mapGet = map.get;
        expect(mapGet('key1')).toBe('value1');

        const setHas = set.has;
        expect(setHas(3)).toBe(true);
      });

      test('returns undefined for non-existent properties', () => {
        const [object] = useState({ existing: 'value' });

        expect(object.existing).toBe('value');

        expect(
          (object as unknown as Record<string, unknown>).nonExistent,
        ).toBeUndefined();
      });

      test('works with class instances', () => {
        class Person {
          constructor(
            public name: string,
            public age: number,
          ) {}

          greet(): string {
            return `Hello, I'm ${this.name}`;
          }

          getAge(): number {
            return this.age;
          }
        }

        const [person] = useState(new Person('Alice', 25));
        expect(person.name).toBe('Alice');
        expect(person.age).toBe(25);
        expect(person.greet()).toBe("Hello, I'm Alice");
        expect(person.getAge()).toBe(25);

        const { greet } = person;
        expect(greet()).toBe("Hello, I'm Alice");

        person.name = 'Bob';
        person.age = 30;

        expect(person.name).toBe('Bob');
        expect(person.greet()).toBe("Hello, I'm Bob");
        expect(person.getAge()).toBe(30);
      });

      test('handles functions as property values', () => {
        const object = {
          name: 'test',
          callback: (): string => 'callback result',
          boundMethod(): string {
            return `Method called on ${this.name}`;
          },
        };

        const [state] = useState(object);
        expect(state.name).toBe('test');
        expect(state.callback()).toBe('callback result');
        expect(state.boundMethod()).toBe('Method called on test');

        state.name = '1-2-3';
        const { boundMethod } = state;

        expect(boundMethod()).toBe('Method called on 1-2-3');
      });

      test('throws TypeError when attempting to set properties on null/undefined', () => {
        const [nullValue] = useState(null);
        const [undefinedValue] = useState(undefined);

        expect(() => {
          (nullValue as unknown as Record<string, unknown>).prop = 'test';
        }).toThrow();

        expect(() => {
          (undefinedValue as unknown as Record<string, unknown>).prop = 'test';
        }).toThrow();
      });
    });
  });
});
