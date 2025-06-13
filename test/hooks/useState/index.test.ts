import { describe, expect, test } from 'bun:test';
import { useEffect, useState } from 'dust';

describe('Hooks', () => {
  describe('useState', () => {
    describe('fundamentals', () => {
      test('stores initial value', () => {
        const [counter] = useState(0);
        expect(counter()).toBe(0);
      });

      test('stores initial object value', () => {
        const [user] = useState({ name: 'John', age: 30 });
        expect(user()).toEqual({ name: 'John', age: 30 });
      });

      test('changes state using setter', () => {
        const [counter, setCounter] = useState(0);

        setCounter(5);
        expect(counter()).toBe(5);
      });

      test('changes state using functional setter', () => {
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

      test('handles complex object updates', () => {
        interface State {
          items: string[];
          total: number;
        }

        const [data, setData] = useState<State>({ items: [], total: 0 });

        setData((prev: State) => ({
          items: [...prev.items, 'new item'],
          total: prev.total + 1,
        }));

        expect(data().items).toEqual(['new item']);
        expect(data().total).toBe(1);
      });
    });

    describe('object property access', () => {
      test('accesses object properties via function calls', () => {
        const [user] = useState({ name: 'John', age: 30, city: 'NYC' });

        expect(user.name()).toBe('John');
        expect(user.age()).toBe(30);
        expect(user.city()).toBe('NYC');
      });

      test('accesses nested object properties', () => {
        const [user] = useState({
          name: 'John',
          address: { city: 'NYC', zip: '10001' },
          preferences: { theme: 'dark', notifications: true },
        });

        expect(user.name()).toBe('John');
        expect(user.address.city()).toBe('NYC');
        expect(user.address.zip()).toBe('10001');
        expect(user.preferences.theme()).toBe('dark');
        expect(user.preferences.notifications()).toBe(true);
      });

      test('accesses deeply nested properties', () => {
        const [data] = useState({
          user: {
            profile: {
              personal: { name: 'John', age: 30 },
              work: { company: 'Acme', position: 'Developer' },
            },
          },
        });

        expect(data.user.profile.personal.name()).toBe('John');
        expect(data.user.profile.personal.age()).toBe(30);
        expect(data.user.profile.work.company()).toBe('Acme');
        expect(data.user.profile.work.position()).toBe('Developer');
      });

      test('accesses array properties and methods', () => {
        const [numbers] = useState([1, 2, 3, 4, 5]);

        expect(numbers.length).toBe(5);
        expect(numbers()[0]).toBe(1);
        expect(numbers.slice(1, 3)).toEqual([2, 3]);
        expect(numbers.indexOf(3)).toBe(2);
        expect(numbers.join(',')).toBe('1,2,3,4,5');
      });

      test('throws error for non-existent properties called as functions', () => {
        const [object] = useState({ existing: 'value' });

        expect(object.existing()).toBe('value');
        expect(() =>
          (object as unknown as { nonExistent: () => void }).nonExistent(),
        ).toThrow();
      });

      test('updates property access when state changes', () => {
        const [user, setUser] = useState({ name: 'John', age: 30 });

        expect(user.name()).toBe('John');
        expect(user.age()).toBe(30);

        setUser({ name: 'Jane', age: 25 });

        expect(user.name()).toBe('Jane');
        expect(user.age()).toBe(25);
      });

      test('updates nested properties when state changes', () => {
        const [user, setUser] = useState({
          profile: { name: 'John', email: 'john@example.com' },
          settings: { theme: 'dark' },
        });

        expect(user.profile.name()).toBe('John');
        expect(user.settings.theme()).toBe('dark');

        setUser({
          profile: { name: 'Jane', email: 'jane@example.com' },
          settings: { theme: 'light' },
        });

        expect(user.profile.name()).toBe('Jane');
        expect(user.settings.theme()).toBe('light');
      });

      test('handles objects with methods', () => {
        const [calculator] = useState({
          value: 10,
          add(n: number): number {
            return this.value + n;
          },
          multiply(n: number): number {
            return this.value * n;
          },
        });

        expect(calculator.value()).toBe(10);
        expect(calculator.add(5)).toBe(15);
        expect(calculator.multiply(3)).toBe(30);
      });

      test('method context updates when state changes', () => {
        const [calculator, setCalculator] = useState({
          value: 10,
          add(n: number): number {
            return this.value + n;
          },
        });

        expect(calculator.add(5)).toBe(15);

        setCalculator((prev) => ({ ...prev, value: 20 }));
        expect(calculator.add(5)).toBe(25);
      });
    });

    describe('destructuring and object operations', () => {
      test('works with destructuring from function call', () => {
        const [source] = useState({ a: 1, b: 2, c: 3 });

        const { a, b } = source();
        expect(a).toBe(1);
        expect(b).toBe(2);

        const { a: newA, ...rest } = source();
        expect(newA).toBe(1);
        expect(rest).toEqual({ b: 2, c: 3 });
      });

      test('destructuring reactive getter vs nested reactive getters', () => {
        const [data, setData] = useState({
          user: { name: 'John', age: 30 },
          settings: { theme: 'dark' },
        });

        const { user, settings } = data;

        expect(user()).toEqual({ name: 'John', age: 30 });
        expect(settings()).toEqual({ theme: 'dark' });

        expect(user.name()).toBe('John');
        expect(settings.theme()).toBe('dark');

        setData({
          user: { name: 'Jane', age: 25 },
          settings: { theme: 'light' },
        });

        expect(user()).toEqual({ name: 'Jane', age: 25 });
        expect(settings()).toEqual({ theme: 'light' });
        expect(user.name()).toBe('Jane');
        expect(settings.theme()).toBe('light');
      });

      test('destructuring with renaming and rest operator', () => {
        const [profile, setProfile] = useState({
          personal: { name: 'John', age: 30 },
          work: { company: 'Acme', position: 'Developer' },
          social: { twitter: '@john', github: 'john' },
        });

        const { personal: info, work, ...social } = profile;

        expect(info.name()).toBe('John');
        expect(info.age()).toBe(30);
        expect(work.company()).toBe('Acme');
        expect(work.position()).toBe('Developer');
        expect(social.social().twitter).toBe('@john');

        setProfile({
          personal: { name: 'Jane', age: 25 },
          work: { company: 'Tech Corp', position: 'Senior Dev' },
          social: { twitter: '@jane', github: 'jane' },
        });

        expect(info.name()).toBe('Jane');
        expect(work.company()).toBe('Tech Corp');
        expect(social.social().twitter).toBe('@jane');
      });

      test('nested destructuring patterns', () => {
        const [app, setApp] = useState({
          ui: {
            header: { title: 'My App', subtitle: 'Welcome' },
            sidebar: { collapsed: false, width: 250 },
          },
          data: {
            users: [{ id: 1, name: 'John' }],
            posts: [{ id: 1, title: 'Hello' }],
          },
        });

        const { ui, data } = app;
        const { header, sidebar } = ui;
        const { users, posts } = data;

        expect(header.title()).toBe('My App');
        expect(sidebar.collapsed()).toBe(false);
        expect(users()[0].name).toBe('John');
        expect(posts()[0].title).toBe('Hello');

        setApp({
          ui: {
            header: { title: 'Updated App', subtitle: 'New Version' },
            sidebar: { collapsed: true, width: 200 },
          },
          data: {
            users: [{ id: 1, name: 'Jane' }],
            posts: [{ id: 1, title: 'Updated Post' }],
          },
        });

        expect(header.title()).toBe('Updated App');
        expect(sidebar.collapsed()).toBe(true);
        expect(users()[0].name).toBe('Jane');
        expect(posts()[0].title).toBe('Updated Post');
      });

      test('destructuring array elements as reactive getters', () => {
        const [state, setState] = useState({
          items: ['first', 'second', 'third'],
          config: { mode: 'production', debug: false },
        });

        const { items, config } = state;

        expect(items()[0]).toBe('first');
        expect(items()[1]).toBe('second');
        expect(items.length).toBe(3);

        expect(config.mode()).toBe('production');
        expect(config.debug()).toBe(false);

        setState({
          items: ['updated', 'values'],
          config: { mode: 'development', debug: true },
        });

        expect(items()[0]).toBe('updated');
        expect(items.length).toBe(2);
        expect(config.mode()).toBe('development');
        expect(config.debug()).toBe(true);
      });

      test('destructuring mixed types and methods', () => {
        const [calculator, setCalculator] = useState({
          x: 10,
          y: 5,
          add(): number {
            return this.x + this.y;
          },
          multiply(): number {
            return this.x * this.y;
          },
          metadata: { created: '2023-01-01', version: '1.0' },
        });

        const { metadata } = calculator;

        expect(calculator.x()).toBe(10);
        expect(calculator.y()).toBe(5);
        expect(calculator.add()).toBe(15);
        expect(calculator.multiply()).toBe(50);

        expect(metadata.created()).toBe('2023-01-01');
        expect(metadata.version()).toBe('1.0');

        setCalculator(({ add, multiply }) => ({
          x: 20,
          y: 3,
          add,
          multiply,
          metadata: { created: '2023-12-01', version: '2.0' },
        }));

        expect(calculator.x()).toBe(20);
        expect(calculator.y()).toBe(3);
        expect(metadata.version()).toBe('2.0');
      });

      test('partial destructuring with selective updates', () => {
        const [dashboard, setDashboard] = useState({
          user: { name: 'John', role: 'admin' },
          stats: { views: 100, clicks: 50 },
          settings: { theme: 'dark', notifications: true },
          cache: { lastUpdate: '2023-01-01', size: 1024 },
        });

        const { user, stats } = dashboard;

        expect(user.name()).toBe('John');
        expect(user.role()).toBe('admin');
        expect(stats.views()).toBe(100);
        expect(stats.clicks()).toBe(50);

        setDashboard((prev) => ({
          ...prev,
          user: { ...prev.user, name: 'Jane' },
          stats: { ...prev.stats, views: 200 },
        }));

        expect(user.name()).toBe('Jane');
        expect(user.role()).toBe('admin');
        expect(stats.views()).toBe(200);
        expect(stats.clicks()).toBe(50);

        expect(dashboard.settings.theme()).toBe('dark');
        expect(dashboard.cache.size()).toBe(1024);
      });

      test('works with Object.assign and spread operator', () => {
        const [source, setSource] = useState({ a: 1, b: 2 });

        const target = Object.assign({}, source());
        const spread = { ...source() };
        const { a, ...rest } = source();

        expect(target).toEqual({ a: 1, b: 2 });
        expect(spread).toEqual({ a: 1, b: 2 });
        expect(a).toBe(1);
        expect(rest).toEqual({ b: 2 });

        (setSource as (value: Record<string, number>) => void)({ c: 3, d: 4 });
        const { c, ...tail } = source() as Record<string, number>;

        expect(c).toBe(3);
        expect(tail).toEqual({ d: 4 });
      });

      test('works with JSON serialization', () => {
        const [user] = useState({ name: 'John', age: 30 });
        const [numbers] = useState([1, 2, 3]);
        const [counter] = useState(42);

        expect(JSON.stringify(user())).toBe('{"name":"John","age":30}');
        expect(JSON.stringify(numbers())).toBe('[1,2,3]');
        expect(JSON.stringify(counter())).toBe('42');
      });
    });

    describe('edge cases', () => {
      test('handles null and undefined values', () => {
        const [nullValue] = useState<string | null>(null);
        const [undefinedValue] = useState<string | undefined>(undefined);

        expect(nullValue()).toBe(null);
        expect(undefinedValue()).toBeUndefined();
      });

      test('handles functions as values', () => {
        const testFn = (): string => 'test result';
        const [fn] = useState(testFn);

        expect(fn()).toBe(testFn);
        expect(fn()()).toBe('test result');
      });

      test('handles empty objects and arrays', () => {
        const [emptyObj] = useState({});
        const [emptyArr] = useState([]);

        expect(emptyObj()).toEqual({});
        expect(emptyArr()).toEqual([]);
        expect(emptyArr.length).toBe(0);
      });

      test('handles class instances', () => {
        class Person {
          constructor(
            public name: string,
            public age: number,
          ) {}

          greet(): string {
            return `Hello, I'm ${this.name}`;
          }
        }

        const [person] = useState(new Person('Alice', 25));

        expect(person().name).toBe('Alice');
        expect(person().age).toBe(25);
        expect(person().greet()).toBe("Hello, I'm Alice");
      });

      test('handles Date objects', () => {
        const [date] = useState(new Date('2023-01-01'));

        expect(date().getFullYear()).toBe(2023);
        expect(date().getMonth()).toBe(0);
        expect(date().getDate()).toBe(1);
      });

      test('handles Map and Set objects', () => {
        const [map] = useState(
          new Map([
            ['key1', 'value1'],
            ['key2', 'value2'],
          ]),
        );
        const [set] = useState(new Set([1, 2, 3]));

        expect(map().get('key1')).toBe('value1');
        expect(map().has('key2')).toBe(true);
        expect(map().size).toBe(2);

        expect(set().has(2)).toBe(true);
        expect(set().size).toBe(3);
      });

      test('handles primitive arrays', () => {
        const [numbers, setNumbers] = useState([1, 2, 3]);

        expect(numbers()).toEqual([1, 2, 3]);
        expect(numbers.length).toBe(3);
        expect(numbers()[1]).toBe(2);

        setNumbers([4, 5, 6, 7]);
        expect(numbers()).toEqual([4, 5, 6, 7]);
        expect(numbers.length).toBe(4);
      });
    });

    describe('reactivity', () => {
      test('single dependency', () => {
        const [counter, setCounter] = useState(0);
        let result: number | undefined;

        useEffect(() => {
          result = counter() * 2;
        }, [counter]);

        expect(result).toBe(0);

        setCounter(5);
        expect(result).toBe(10);

        setCounter(10);
        expect(result).toBe(20);
      });

      test('multiple dependencies', () => {
        const [name, setName] = useState('John');
        const [age, setAge] = useState(30);
        let result: string | undefined;

        useEffect(() => {
          result = `${name()} is ${age()} years old`;
        }, [name, age]);

        expect(result).toBe('John is 30 years old');

        setName('Jane');
        expect(result).toBe('Jane is 30 years old');

        setAge(25);
        expect(result).toBe('Jane is 25 years old');
      });

      test('primitive state updates', () => {
        const [name, setName] = useState('Paul');
        let greet: string | undefined;

        useEffect(() => {
          greet = `I'm ${name()}`;
        }, [name]);

        expect(greet).toBe("I'm Paul");

        setName('Batman');
        expect(greet).toBe("I'm Batman");

        setName('Superman');
        expect(greet).toBe("I'm Superman");

        setName((prev) => `${prev} (just kidding)`);
        expect(greet).toBe("I'm Superman (just kidding)");
      });

      test('object state updates', () => {
        const [person, setPerson] = useState({ name: 'Paul' });
        let greet: string | undefined;

        useEffect(() => {
          greet = `I'm ${person.name()}`;
        }, [person]);

        expect(greet).toBe("I'm Paul");
        expect(person()).toEqual({ name: 'Paul' });

        setPerson({ name: 'Batman' });
        expect(greet).toBe("I'm Batman");

        setPerson((prev) => ({ name: `${prev.name} (just kidding)` }));
        expect(greet).toBe("I'm Batman (just kidding)");
        expect(person()).toEqual({ name: 'Batman (just kidding)' });
      });

      test('destructured object state', () => {
        const [person, setPerson] = useState({ name: 'Paul' });
        const { name } = person;
        let greet: string | undefined;

        useEffect(() => {
          greet = `I'm ${name()}`;
        }, [person]);

        expect(greet).toBe("I'm Paul");
        expect(name()).toBe('Paul');
        expect(person()).toEqual({ name: 'Paul' });

        setPerson({ name: 'Batman' });
        expect(greet).toBe("I'm Batman");

        setPerson((prev) => ({ name: `${prev.name} (just kidding)` }));
        expect(greet).toBe("I'm Batman (just kidding)");
        expect(person()).toEqual({ name: 'Batman (just kidding)' });
      });

      test('object property access', () => {
        const [user, setUser] = useState({ name: 'John', age: 30 });
        let result: string | undefined;

        useEffect(() => {
          result = `Hello ${user.name()}`;
        }, [user]);

        expect(result).toBe('Hello John');

        setUser({ name: 'Jane', age: 25 });
        expect(result).toBe('Hello Jane');
      });

      test('nested object properties', () => {
        const [user, setUser] = useState({
          profile: { name: 'John', email: 'john@example.com' },
          settings: { theme: 'dark', notifications: true },
        });

        let profileResult: string | undefined;
        let settingsResult: string | undefined;

        useEffect(() => {
          profileResult = `User: ${user.profile.name()}`;
        }, [user]);

        useEffect(() => {
          settingsResult = `Theme: ${user.settings.theme()}`;
        }, [user]);

        expect(profileResult).toBe('User: John');
        expect(settingsResult).toBe('Theme: dark');

        setUser({
          profile: { name: 'Jane', email: 'jane@example.com' },
          settings: { theme: 'light', notifications: false },
        });

        expect(profileResult).toBe('User: Jane');
        expect(settingsResult).toBe('Theme: light');
      });

      test('complex nested state with methods and partial updates', () => {
        const trim = (val: string | undefined): string =>
          (val ?? '')
            .split('\n')
            .map((line) => line.trim())
            .join('\n');

        const [person, setPerson] = useState({
          firstName: 'Paul',
          lastName: 'Engel',
          alterEgo: 'PME Legend',
          getName(): string {
            return `${this.firstName} ${this.lastName} a.k.a. ${this.alterEgo}`;
          },
          bio: {
            parents: {
              father: 'Dirk',
              mother: 'Anna',
            },
            profession: 'Software Developer',
          },
        });

        let greet: string | undefined;

        useEffect(() => {
          greet = `
            My name is ${person().getName()}.
            My father is ${person.bio.parents.father()}.
            My mother is ${person.bio.parents.mother()}.
            I am a ${person.bio.profession()}.
          `;
        }, [person]);

        expect(trim(greet)).toBe(
          trim(`
            My name is Paul Engel a.k.a. PME Legend.
            My father is Dirk.
            My mother is Anna.
            I am a Software Developer.
          `),
        );

        setPerson(({ getName }) => ({
          getName,
          firstName: 'Bruce',
          lastName: 'Wayne',
          alterEgo: 'Batman - Dark Knight',
          bio: {
            parents: {
              father: 'Thomas',
              mother: 'Martha',
            },
            profession: 'Super Hero',
          },
        }));

        expect(trim(greet)).toBe(
          trim(`
            My name is Bruce Wayne a.k.a. Batman - Dark Knight.
            My father is Thomas.
            My mother is Martha.
            I am a Super Hero.
          `),
        );

        setPerson(({ bio, getName }) => ({
          getName,
          firstName: 'Clark',
          lastName: 'Kent',
          alterEgo: 'Superman - Man of Steel',
          bio: {
            ...bio,
            parents: {
              ...bio.parents,
              father: 'Jonathan',
            },
          },
        }));

        expect(trim(greet)).toBe(
          trim(`
            My name is Clark Kent a.k.a. Superman - Man of Steel.
            My father is Jonathan.
            My mother is Martha.
            I am a Super Hero.
          `),
        );

        setPerson(({ getName }) => ({
          getName,
          firstName: '',
          lastName: '',
          alterEgo: 'Onslaught - That Which Shall Survive',
          bio: {
            parents: { father: '', mother: '' },
            profession: 'Super Villain',
          },
        }));

        expect(trim(greet)).toBe(
          trim(`
            My name is   a.k.a. Onslaught - That Which Shall Survive.
            My father is .
            My mother is .
            I am a Super Villain.
          `),
        );

        setPerson(({ bio, getName }) => ({
          getName,
          firstName: 'Harry',
          lastName: 'Osborn',
          alterEgo: 'Green Goblin - Flying Green Elf',
          bio: {
            ...bio,
            parents: {
              father: 'Norman',
              mother: 'Emily',
            },
          },
        }));

        expect(trim(greet)).toBe(
          trim(`
            My name is Harry Osborn a.k.a. Green Goblin - Flying Green Elf.
            My father is Norman.
            My mother is Emily.
            I am a Super Villain.
          `),
        );
      });

      test('conditional logic', () => {
        const [user, setUser] = useState({ name: 'John', isActive: true });
        const [counter, setCounter] = useState(0);

        let result: string | undefined;

        useEffect(() => {
          if (user.isActive()) {
            result = `Active user: ${user.name()} (${counter()})`;
          } else {
            result = 'User inactive';
          }
        }, [user, counter]);

        expect(result).toBe('Active user: John (0)');

        setCounter(5);
        expect(result).toBe('Active user: John (5)');

        setUser({ name: 'John', isActive: false });
        expect(result).toBe('User inactive');

        setCounter(10);
        expect(result).toBe('User inactive');
      });

      test('array reactivity', () => {
        const [items, setItems] = useState(['a', 'b', 'c']);

        let count: number | undefined;

        useEffect(() => {
          count = items.length;
        }, [items]);

        expect(count).toBe(3);

        setItems(['x', 'y']);
        expect(count).toBe(2);

        setItems((prev) => [...prev, 'z']);
        expect(count).toBe(3);
      });

      test('destructured reactive values', () => {
        const [data, setData] = useState({
          user: { name: 'John', age: 30 },
          settings: { theme: 'dark' },
        });

        const { user, settings } = data;
        let result: string | undefined;

        useEffect(() => {
          result = `${user.name()} likes ${settings.theme()} theme`;
        }, [user, settings]);

        expect(result).toBe('John likes dark theme');

        setData({
          user: { name: 'Jane', age: 25 },
          settings: { theme: 'light' },
        });

        expect(result).toBe('Jane likes light theme');
      });
    });
  });
});
