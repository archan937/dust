const deepClone = require("lodash.clonedeep");
const deepMerge = require("lodash.merge");
const microDiff = require("microdiff").default;

const REACTIVITY_LOSS =
  "Reading state from a function with arity > 0 (reactivity behaviour will be lost)";

const isFunction = (value) => typeof value === "function";
const isObject = (value) => value === Object(value);

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

  function getter(skipRegister) {
    if (!skipRegister) {
      register(arguments.callee.caller);
    }
    return value;
  }

  function setter(funcOrValue) {
    value =
      typeof funcOrValue === "function" ? funcOrValue(value) : funcOrValue;
    listeners.forEach((listener) => (listener.__handler__ || listener)());
  }

  getter.__setter__ = setter;

  return [getter, setter];
};

const useObjectState = (object, owner) => {
  const [getter] = useState(
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

  function setter(funcOrObject) {
    const newObject =
      typeof funcOrObject === "function"
        ? funcOrObject((obj) => deepMerge(deepClone(object), obj))
        : funcOrObject;

    microDiff(object, newObject).forEach(({ type, path, value, oldValue }) => {
      if (!isFunction(oldValue)) {
        switch (type) {
          case "CHANGE":
          case "REMOVE":
            const prop = path.pop();
            const obj = path.reduce((o, k) => o[k](true), getter(true));
            obj[prop].__setter__(value);
            path.reduce((o, k) => o[k], object)[prop] = value;
            break;
          default:
            console.log({ type, path, value, oldValue });
        }
      }
    });
  }

  return [getter, setter];
};

exports.useState = function (value, owner) {
  owner = owner || arguments.callee.caller;
  if (isObject(value)) {
    return useObjectState(value, owner);
  }
  return useState(value, owner);
};
