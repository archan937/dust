const deepClone = require("lodash.clonedeep");
const deepMerge = require("lodash.merge");
const microDiff = require("microdiff").default;

const REACTIVITY_LOSS =
  "Reading state from a function with arity > 0 (reactivity behaviour will be lost)";

const isFunction = (value) => typeof value === "function";
const isObject = (value) => value === Object(value);
const isUndefined = (value) => typeof value === "undefined";

const randomHash = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "";
  for (let i = 0; i < 6; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};

const useState = (value, owner) => {
  const hash = randomHash();
  const listeners = [];

  const register = (caller) => {
    if (
      !caller ||
      caller === owner ||
      caller.__skip__ ||
      caller.__states__?.includes(hash)
    ) {
      return;
    }
    if (caller.length) {
      console.warn(REACTIVITY_LOSS, caller.toString());
      return;
    }
    caller.__states__ = [...(caller.__states__ || []), hash];
    listeners.push(caller);
  };

  function getter(skipRegister, caller) {
    if (caller || !skipRegister) {
      register(caller || arguments.callee.caller);
    }
    return value;
  }

  function setter(funcOrValue) {
    value = isFunction(funcOrValue) ? funcOrValue(value) : funcOrValue;
    listeners.forEach((listener) => (listener.__handler__ || listener)());
  }

  getter.__setter__ = setter;

  return [getter, setter];
};

const useObjectState = (object, owner) => {
  const [objectState, setObjectState] = useState(
    Object.entries(object).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: isFunction(value)
          ? (() => {
              value.__skip__ = true;
              return value;
            })()
          : exports.useState(value, owner)[0],
      }),
      {}
    ),
    owner
  );

  const getter = new Proxy(objectState(true), {
    get: function (target, prop) {
      if (prop === "___") {
        return target;
      }
      if (prop.match(/__\w+__/)) {
        return target[prop];
      }
      const value = target[prop];
      return isFunction(value)
        ? value.bind(getter)(true, arguments.callee.caller)
        : value;
    },
  });

  function setter(funcOrObject) {
    const newObject = isFunction(funcOrObject)
      ? funcOrObject((obj) => deepMerge(deepClone(object), obj))
      : funcOrObject;

    if (isUndefined(object)) {
      object = newObject;
      setObjectState(newObject);
      return;
    }

    if (isUndefined(newObject)) {
      object = undefined;
      setObjectState(undefined);
      return;
    }

    console.log({ object, newObject });
    microDiff(object, newObject).forEach(({ type, path, value, oldValue }) => {
      if (!isFunction(oldValue)) {
        switch (type) {
          case "CHANGE":
          case "REMOVE":
            const prop = path.pop();
            const obj = path.reduce(
              (o, k) => (isFunction(o[k]) ? o[k](true) : o[k]),
              objectState(true)
            );
            obj.__get__(prop).__setter__(value);
            path.reduce((o, k) => o[k], object)[prop] = value;
            break;
          default:
            console.log({ type, path, value, oldValue });
        }
      }
    });
  }

  getter.__get__ = (prop) => objectState(true)[prop];
  getter.__setter__ = setter;

  return [getter, setter];
};

exports.useState = function (value, owner) {
  owner = owner || arguments.callee.caller;
  if (isObject(value)) {
    return useObjectState(value, owner);
  }
  return useState(value, owner);
};
