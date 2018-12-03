/**
 * async函数使用方式和generator函数很像，像在代码中自动打了断点。
 * 但是async函数是基于promise实现的！
 * async函数内部的执行顺序可以是同步，但调用还是异步，并且返回结果始终是一个promise 
 * 需要注意的是，async函数可能会重写promise chain
 * 以下测试均在chrome中
 */
var resolveAfter2Seconds = function() {
    console.log("starting slow promise");
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(20);
        console.log("slow promise is done");
      }, 2000);
    });
  };
  
  var resolveAfter1Second = function() {
    console.log("starting fast promise");
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(10);
        console.log("fast promise is done");
      }, 1000);
    });
  };
  var sequentialStart = async function() {
  
    const slow = await resolveAfter2Seconds();
  
    const fast = await resolveAfter1Second();
    console.log(slow);
    console.log(fast);
  }

  sequentialStart()
  /**
   * 输出结果：
   * starting slow promise
   * slow promise is done
   * starting fast promise
   * fast promise is done
   * 20
   * 10
   */
  
/**
 * 用promise模拟sequentialStart函数
 * mock函数，为实现同步执行，将后续代码写在then中
 * 但是如果在其他地方调用mock函数，执行完resolveAfter2Seconds后，js执行线程会继续mock函数后面代码，不会阻断在mock中
 */
function mock () {
    let slow = null,
        fast = null;
    resolveAfter2Seconds() //等待两秒
    .then (resp => {
        slow = resp;
        return resolveAfter1Second()
    })
    .then (resp => { // 等待一秒
        fast = resp;
        console.log(slow);
        console.log(fast);
    })
}

/**
 * 关于重写promise chain
 * 参考下列两个函数
 */
async function concurrentStart () { // 重写了promise chain
    const slow = resolveAfter2Seconds(); 
    const fast = resolveAfter1Second();
    console.log(await slow);
    console.log(await fast); 
}// 输出结果：starting slow promise -> starting fast promise -> fast promise is done -> slow promise is done -> 20 ->10


function parallel () { // 正常状态
    resolveAfter2Seconds().then((message)=>console.log(message));
    resolveAfter1Second().then((message)=>console.log(message));
}//输出结果：starting slow promise -> starting fast promise -> fast promise is done -> 10 -> slow promise is done -> 20