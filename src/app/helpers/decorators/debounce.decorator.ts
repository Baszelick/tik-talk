export function Debounce(delay: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    let timeout: any

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(()=> {
        original.apply(this, args);
      }, delay);
    }
    return descriptor;
  }
}


