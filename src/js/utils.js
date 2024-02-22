export const pipe = (x, ...f) => f.reduce((x, f) => f(x), x);

export const useToggled = (cb) => {
  let c = 0;
  return () => {
    c ^= 1;
    cb(c === 1);
  };
};
