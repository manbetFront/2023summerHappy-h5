export function _debounce(func, delay) {
  let delayTime = delay || 1000;
  let timer;
  return function() {
    let _ = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      timer = null;
      func.apply(_, args);
    }, delayTime);
  };
}
