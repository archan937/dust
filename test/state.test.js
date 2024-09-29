const { describe, expect, it, test } = require("bun:test");
const { useState } = require("src/state");

describe("useState", () => {
  describe("fundamentals", () => {
    it("stores initial value", () => {
      const [counter] = useState(0);
      expect(counter()).toBe(0);
    });

    it("changes state using setter", () => {
      const [counter, setCounter] = useState(0);

      setCounter(5);
      expect(counter()).toBe(5);
    });

    it("changes state using __setter__", () => {
      const [counter] = useState(0);

      counter.__setter__(6);
      expect(counter()).toBe(6);
    });

    it("changes state using prev", () => {
      const [counter, setCounter] = useState(2);
      expect(counter()).toBe(2);

      setCounter((prev) => prev + 8);
      expect(counter()).toBe(10);
    });
  });

  describe("reactivity", () => {
    test("string (primitive) based state", () => {
      const [name, setName] = useState("Paul");
      let greet;

      function sayHello() {
        greet = `I'm ${name()}`;
      }

      expect(greet).toBeUndefined();
      expect(sayHello.__states__).toBeUndefined();

      sayHello();
      expect(greet).toBe("I'm Paul");
      expect(typeof sayHello.__states__).toBe("object");
      expect(Object.values(sayHello.__states__)).toEqual([true]);

      setName("Batman");
      expect(greet).toBe("I'm Batman");

      setName("Superman");
      expect(greet).toBe("I'm Superman");

      setName((prev) => `${prev} (just kidding)`);
      expect(greet).toBe("I'm Superman (just kidding)");
    });

    test("object based state", () => {
      const [person, setPerson] = useState({ name: "Paul" });
      let greet;

      function sayHello() {
        greet = `I'm ${person.name()}`;
      }

      expect(person()).toEqual({ name: "Paul" });
      expect(greet).toBeUndefined();
      expect(sayHello.__states__).toBeUndefined();

      sayHello();
      expect(greet).toBe("I'm Paul");
      expect(typeof sayHello.__states__).toBe("object");
      expect(Object.values(sayHello.__states__)).toEqual([true, true]);

      setPerson({ name: "Batman" });
      expect(greet).toBe("I'm Batman");

      setPerson(({ name }) => ({ name: `${name()} (just kidding)` }));
      expect(greet).toBe("I'm Batman (just kidding)");
      expect(person()).toEqual({ name: "Batman (just kidding)" });
    });

    test("object based state using destructuring", () => {
      const [person, setPerson] = useState({ name: "Paul" });
      const { name } = person;

      let greet;

      function sayHello() {
        greet = `I'm ${name()}`;
      }

      expect(person()).toEqual({ name: "Paul" });
      expect(name()).toEqual("Paul");
      expect(greet).toBeUndefined();
      expect(sayHello.__states__).toBeUndefined();

      sayHello();
      expect(greet).toBe("I'm Paul");
      expect(typeof sayHello.__states__).toBe("object");
      expect(Object.values(sayHello.__states__)).toEqual([true]);

      setPerson({ name: "Batman" });
      expect(greet).toBe("I'm Batman");

      setPerson(({ name }) => ({ name: `${name()} (just kidding)` }));
      expect(greet).toBe("I'm Batman (just kidding)");
      expect(person()).toEqual({ name: "Batman (just kidding)" });
    });

    test("nested objects based state", () => {
      const trim = (string) =>
        string
          .split("\n")
          .map((line) => line.trim())
          .join("\n");

      const [person, setPerson] = useState({
        firstName: "Paul",
        lastName: "Engel",
        alterEgo: "PME Legend",
        name() {
          return `${this.firstName?.() || ""} ${this.lastName?.() || ""} a.k.a. ${
            this.alterEgo() || ""
          }`;
        },
        bio: {
          parents: {
            father: "Dirk",
            mother: "Anna",
          },
          profession: "Software Developer",
        },
      });

      let greet;

      function sayHello() {
        greet = `
        My name is ${person.name() || ""}.
        My father is ${person.bio.parents?.father?.() || ""}.
        My mother is ${person.bio.parents?.mother?.() || ""}.
        I am a ${person.bio.profession?.() || ""}.
      `;
      }

      expect(greet).toBeUndefined();

      sayHello();

      expect(trim(greet)).toBe(
        trim(`
        My name is Paul Engel a.k.a. PME Legend.
        My father is Dirk.
        My mother is Anna.
        I am a Software Developer.
      `),
      );

      setPerson({
        firstName: "Bruce",
        lastName: "Wayne",
        alterEgo: "Batman - Dark Knight",
        bio: {
          parents: {
            father: "Thomas",
            mother: "Martha",
          },
          profession: "Super Hero",
        },
      });

      expect(trim(greet)).toBe(
        trim(`
        My name is Bruce Wayne a.k.a. Batman - Dark Knight.
        My father is Thomas.
        My mother is Martha.
        I am a Super Hero.
      `),
      );

      setPerson((merge) =>
        merge({
          firstName: "Clark",
          lastName: "Kent",
          alterEgo: "Superman - Man of Steel",
          bio: {
            parents: {
              father: "Jonathan",
            },
          },
        }),
      );

      expect(trim(greet)).toBe(
        trim(`
        My name is Clark Kent a.k.a. Superman - Man of Steel.
        My father is Jonathan.
        My mother is Martha.
        I am a Super Hero.
      `),
      );

      setPerson({
        alterEgo: "Onslaught - That Which Shall Survive",
        bio: {
          profession: "Super Villain",
        },
      });

      expect(trim(greet)).toBe(
        trim(`
        My name is   a.k.a. Onslaught - That Which Shall Survive.
        My father is .
        My mother is .
        I am a Super Villain.
      `),
      );

      setPerson((merge) =>
        merge({
          firstName: "Harry",
          lastName: "Osborn",
          alterEgo: "Green Goblin - Flying Green Elf",
          bio: {
            parents: {
              father: "Norman",
              mother: "Emily",
            },
          },
        }),
      );

      expect(trim(greet)).toBe(
        trim(`
        My name is Harry Osborn a.k.a. Green Goblin - Flying Green Elf.
        My father is Norman.
        My mother is Emily.
        I am a Super Villain.
      `),
      );
    });
  });
});
