(function () {
  const { assert, test } = QUnit;

  let useState;

  try {
    useState = require("../src/state").useState;
  } catch (error) {
    useState = Hydrogen.useState;
  }

  QUnit.module("useState", () => {
    test("setting with a value", () => {
      const [counter, setCounter] = useState(0);
      assert.equal(counter(), 0);

      setCounter(5);
      assert.equal(counter(), 5);

      counter.__setter__(6);
      assert.equal(counter(), 6);
    });

    test("setting with a function", () => {
      const [counter, setCounter] = useState(10);
      assert.equal(counter(), 10);

      setCounter((counter) => counter + 1);
      assert.equal(counter(), 11);

      counter.__setter__((counter) => counter + 1);
      assert.equal(counter(), 12);
    });

    test("basic reactivity", () => {
      const [name, setName] = useState("Paul");

      let greet;

      function sayHello() {
        greet = `I'm ${name()}`;
      }

      assert.equal(greet, undefined);

      sayHello();
      assert.equal(greet, "I'm Paul");

      setName("Batman");
      assert.equal(greet, "I'm Batman");

      setName("Superman");
      assert.equal(greet, "I'm Superman");
    });

    test("object based reactivity", () => {
      const [person, setPerson] = useState({ name: "Paul" });

      let greet;

      function sayHello() {
        greet = `I'm ${person().name()}`;
      }

      assert.equal(greet, undefined);

      sayHello();
      assert.equal(greet, "I'm Paul");

      setPerson({ name: "Batman" });
      assert.equal(greet, "I'm Batman");

      setPerson((p) => ({ ...p, name: "Superman" }));
      assert.equal(greet, "I'm Superman");
    });

    test("object based reactivity using destructuring", () => {
      const [person, setPerson] = useState({ name: "Paul" });
      const { name } = person(true);

      let greet;

      function sayHello() {
        greet = `I'm ${name()}`;
      }

      assert.equal(greet, undefined);

      sayHello();
      assert.equal(greet, "I'm Paul");

      setPerson({ name: "Batman" });
      assert.equal(greet, "I'm Batman");

      setPerson((p) => ({ ...p, name: "Superman" }));
      assert.equal(greet, "I'm Superman");
    });

    test("nested objects based reactivity", () => {
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
          return `${this.firstName()} ${this.lastName()} a.k.a. ${this.alterEgo()}`;
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
        My name is ${person().name()}.
        My father is ${person().bio().parents().father()}.
        My mother is ${person().bio().parents().mother()}.
        I am a ${person().bio().profession()}.
      `;
      }

      assert.equal(greet, undefined);

      sayHello();

      assert.equal(
        trim(greet),
        trim(`
        My name is Paul Engel a.k.a. PME Legend.
        My father is Dirk.
        My mother is Anna.
        I am a Software Developer.
      `)
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

      assert.equal(
        trim(greet),
        trim(`
        My name is Bruce Wayne a.k.a. Batman - Dark Knight.
        My father is Thomas.
        My mother is Martha.
        I am a Super Hero.
      `)
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
        })
      );

      assert.equal(
        trim(greet),
        trim(`
        My name is Clark Kent a.k.a. Superman - Man of Steel.
        My father is Jonathan.
        My mother is Martha.
        I am a Super Hero.
      `)
      );

      setPerson({
        firstName: "Clark",
        lastName: "Kent",
        alterEgo: "Superman - Man of Steel",
        bio: {
          parents: {
            father: "Jonathan",
          },
        },
      });
    });
  });
})();
