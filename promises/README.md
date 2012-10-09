#`comb.Promise` and friends

A Promise is an abstraction on top of asynchronous actions.

##Examples

###`callback_errback.js`

Example promise api with a `callback` and `errback`

###`then.js`

Example of using the `then` method which takes both a `callback` and `errback`

###`then-promise.js`

Example of using the `then` method and passing in a promise.

###`resolve.js`

Example of using the `resolve` method which acts as a `classic` node style callback.

###`classic.js`

Example of using the `classic` method which is invoked with a promise is resolved with an err as the first argument, or the success arguments if there was not an error.

###`chain.js`

Example of using the `chain` method which pipes the results of one promise into the next. This example also includes an example that bubbles up an error.

###`comb_when.js`

Example of using `comb.when` which will wait for a variable number of promises (or static value) to complete.

###`comb_when_array.js`

Example of using `comb.when` with an array of promises. 

###`comb_chain.js`

Example of using `comb.chain` which accepts an array of function that will be called in order. Chain will pipe the results from each function into the next.

###`comb_serial.js`

Example of using `comb.serial` which accepts an array of function that will be called in order. Serial will **not**
 pipe results of one function into the next.

###`comb_wrap.js`

Example of using `comb.wrap` which wraps a function that accepts a callback as the last argument and instead returns a promise.
