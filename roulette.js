const perf = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
let numCores = perf.hardwareConcurrency;
if (!numCores) {
    numCores = navigator.hardwareConcurrency || 1;
}
console.log("Number of CPU cores:", numCores);

/**
 Potential Security Weaknesses
 * Edit the parent js to auto delete the modal based on its ID | generate unique ID's at runtime
 * Edit the parent js to auto delete the modal just because it's new | idk
 */

const modal = `
<div id = "roulette">
        <style>
          #roulette {
            width: 400px;
            height: 160px;
            background-color: rgba(0, 0, 0, 0.9);
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-family: 'Courier New', Courier, monospace;
            color: lightgrey;
            padding: 10px;
          }

          #roulette a {
            color: lightgrey;
          }

          #roulette button {
            background-color: #f9e12a;
            border: none;
            padding: 5px;
            font-family: 'Courier New', Courier, monospace;
            margin: 0 10px;
            height: 35px;
          }

          #roulette .optOut {
            margin-left: 0;
            background-color: transparent;
            border: solid 1px lightgrey;
            color: lightgrey;
          }

          #roulette .info {
            display: block;
            margin-top: 12px;
            font-size: 10px;
          }

        </style>
        <span>This website uses <a href="https://github.com/anshll/montecarloHive">Roulette</a> for monetization. Roulette will use your spare computational power to run statistical simulations needed by researchers and industry.</span>
        <br><br>
        <button class="optOut">Opt Out</button><button class="optIn">Accept & Close</button>
        <br>
        <span class="info"><a href="https://github.com/anshll/montecarloHive">Learn more here</a></span>
</div>`

// Add Permission Modal
document.querySelector("body").innerHTML += modal

let permission = true;

const optIn = document.querySelector('#roulette .optIn')
const optOut = document.querySelector('#roulette .optOut')

modalDOM = document.querySelector("#roulette")

optIn.addEventListener("click", function() {
    permission = true;
    modalDOM.parentNode.removeChild(modalDOM);
    console.log(permission)
});

optOut.addEventListener("click", function() {
    permission = false;
    modalDOM.parentNode.removeChild(modalDOM);
    console.log(permission)
});

if (permission) {

    const numWorkers = (numCores / 2).toFixed();
    const workers = [];

    const numDimensions = 10; // n-dimensioned sphere
    const hypercubeVolume = Math.pow(2, numDimensions); // vol of the enclosing cube

    const totalSamples = 1e9;
    let cumSamples = 0;
    let cumInside = 0;

    for (let i = 0; i < numWorkers; i++) {
        const worker = new Worker('worker.js');
        workers.push(worker);

        worker.postMessage({ type: 'start', numDimensions, workerSamples: (totalSamples / 4).toFixed()});

        worker.onmessage = function(event) {
            console.log('Message from Worker:', event.data);
            const [inside, samps] = event.data;
            cumInside += inside;
            cumSamples += parseInt(samps);
            console.log('Cumulative = ' + cumInside + " / " + cumSamples + " " + cumInside/cumSamples * hypercubeVolume);
        };
    }

}