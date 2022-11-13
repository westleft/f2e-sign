export function useThrottle(){
    function throttle(func: Function, timeout: number = 250) {
        let last: number;
        let timer: ReturnType<typeof setTimeout>;
       
        return function (this: any) {
          const context = this;
          const args = arguments;
          const now = +new Date();
       
          if (last && now < last + timeout) {
            clearTimeout(timer)
            timer = setTimeout(function () {
              last = now
              func.apply(context, args)
            }, timeout)
          } else {
            last = now
            func.apply(context, args)
          }
        }
      }

    return { throttle }
}