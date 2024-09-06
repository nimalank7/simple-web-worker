const first = document.querySelector('#number1');
const second = document.querySelector('#number2');
const result = document.querySelector('.result');

if (window.Worker) {
    // Creates the web worker
    const myWorker = new Worker("worker.js");
    /*
    Sets up event listeners for number1 and number 2.
    If the input has changed send both values to the worker.
    */
    [first, second].forEach(input => {
        input.onchange = function() {
            myWorker.postMessage([first.value, second.value]);
            console.log('Message posted to worker');
        }
    })

    /*
    Sets up an event listener to handle messages from the worker
    Set the result of the multiplication as the result.textContent
    */
    myWorker.onmessage = function(e) {
        result.textContent = e.data;
        console.log('Message received from worker');
    }
} else {
    console.log('Your browser doesn\'t support web workers.');
}