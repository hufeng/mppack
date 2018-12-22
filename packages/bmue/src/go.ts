/**
 * 统一 promise 的错误处理机制
 * 在使用 async/await 的过程中，对于错误的处理，通常第一选择是 try/catch,
 * 但是常常会出现 nested try/catch，代码就不会那么优雅
 * 针对异常或者异常的处理有很多方式，命令式的 try/catch, 函数式的 Optional, Either
 * 还比如 go 的多返回值，
 * f, err := os.Open("filename.ext")
 * if err != nil {
 *     log.Fatal(err)
 * }
 * 虽然 verbose 但是足够简单，规则统一
 *
 * 所以在这里对 promise 的错误处理进行值的统一包装，以此来简化
 *
 * Usage:
 *   function test() {
 *     return new Promise((resolve, reject) => {
 *       setTimeout(() => {
 *        resolve('hello');
 *        //reject(new Error('error'))
 *       }, 200)
 *     })
 *   }
 *
 *  (async () => {
 *    const {res, err} = await to(test());
 *    console.log(res) ;// hello
 *    console.log(err); //Error('error')
 *   })();
 *
 * @param promise
 */

export default function go<T>(
  promise: Promise<T>
): Promise<{ err: Error; res: T }> {
  return promise
    .then((res: T) => ({ res, err: null }))
    .catch(err => ({
      res: undefined,
      err
    }));
}
