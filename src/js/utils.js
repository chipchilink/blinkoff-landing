export const pipe = (x, ...f) => f.reduce((x, f) => f(x), x);

export const desktopScreen = window.matchMedia('(min-width: 1140px)').matches;

export const only = (b, f) => {
  if(b){
    f();
  }
};

export const useToggled = (cb) => {
  let c = 0;
  return () => {
    c ^= 1;
    cb(c === 1);
  };
};
