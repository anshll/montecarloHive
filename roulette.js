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

// Build a worker from an anonymous function body
var blobURL = URL.createObjectURL(new Blob(['(',

    function() {
        let wasm;

        const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } });

        if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

        let cachedUint8Memory0 = null;

        function getUint8Memory0() {
            if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
                cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
            }
            return cachedUint8Memory0;
        }

        function getStringFromWasm0(ptr, len) {
            ptr = ptr >>> 0;
            return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
        }

        /**
         * @param {number} num_samples
         * @param {number} num_dimensions
         * @param {number} _worker_index
         * @param {number} _num_workers
         * @returns {number}
         */
        function monte_carlo_hypersphere_volume(num_samples, num_dimensions, _worker_index, _num_workers) {
            return wasm.monte_carlo_hypersphere_volume(num_samples, num_dimensions, _worker_index, _num_workers);
        }

        function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

        async function __wbg_load(module, imports) {
            if (typeof Response === 'function' && module instanceof Response) {
                if (typeof WebAssembly.instantiateStreaming === 'function') {
                    try {
                        return await WebAssembly.instantiateStreaming(module, imports);

                    } catch (e) {
                        if (module.headers.get('Content-Type') != 'application/wasm') {
                            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                        } else {
                            throw e;
                        }
                    }
                }

                const bytes = await module.arrayBuffer();
                return await WebAssembly.instantiate(bytes, imports);

            } else {
                const instance = await WebAssembly.instantiate(module, imports);

                if (instance instanceof WebAssembly.Instance) {
                    return { instance, module };

                } else {
                    return instance;
                }
            }
        }

        function __wbg_get_imports() {
            const imports = {};
            imports.wbg = {};
            imports.wbg.__wbg_random_26e2d782b541ca6b = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
            imports.wbg.__wbindgen_throw = function(arg0, arg1) {
                throw new Error(getStringFromWasm0(arg0, arg1));
            };

            return imports;
        }

        function __wbg_init_memory(imports, maybe_memory) {

        }

        function __wbg_finalize_init(instance, module) {
            wasm = instance.exports;
            __wbg_init.__wbindgen_wasm_module = module;
            cachedUint8Memory0 = null;


            return wasm;
        }

        function initSync(module) {
            if (wasm !== undefined) return wasm;

            const imports = __wbg_get_imports();

            __wbg_init_memory(imports);

            if (!(module instanceof WebAssembly.Module)) {
                module = new WebAssembly.Module(module);
            }

            const instance = new WebAssembly.Instance(module, imports);

            return __wbg_finalize_init(instance, module);
        }

        async function __wbg_init(input) {
            if (wasm !== undefined) return wasm;

            const wasmUrl = 'https://cdn.jsdelivr.net/gh/anshll/roulette@main/rust-simulation/pkg/rust_simulation_bg.wasm'; // Adjust the path to your WASM file

            const imports = __wbg_get_imports();

            if (typeof input === 'undefined') {
                input = wasmUrl;
            }

            // No need to use `fetch` if input is already a URL
            if (!(input instanceof URL)) {
                input = new URL(input, self.location.href);
            }

            __wbg_init_memory(imports);

            const { instance, module } = await __wbg_load(await fetch(input), imports);

            return __wbg_finalize_init(instance, module);
        }

        // Listen for messages from the main thread
        self.onmessage = async function(event) {
            if (event.data.type === 'start') {

                const workerIndex = event.data.workerID; // The index of this worker
                const numWorkers = event.data.numWorkers; // Total number of workers

                const numSamples = event.data.workerSamples; // Number of samples for the simulation
                console.log(numSamples);
                const numDimensions = event.data.numDimensions; // Number of dimensions

                await __wbg_init();

                let result = monte_carlo_hypersphere_volume(numSamples, numDimensions, workerIndex, numWorkers)

                self.postMessage([result, numSamples / numWorkers]);

            }
        };
    }.toString(),

    ')()'], { type: 'application/javascript' }))


if (permission) {

    const numWorkers = (numCores / 2).toFixed();
    const workers = [];

    const numDimensions = 10; // n-dimensioned sphere
    const hypercubeVolume = Math.pow(2, numDimensions); // vol of the enclosing cube

    const totalSamples = 1e9;
    let cumSamples = 0;
    let cumInside = 0;

    for (let i = 0; i < numWorkers; i++) {
        const worker = new Worker(blobURL);
        workers.push(worker);

        worker.postMessage({ type: 'start', workerID: i, numWorkers, numDimensions, workerSamples: (totalSamples / 4).toFixed() });

        worker.onmessage = function(event) {
            console.log('Message from Worker:', event.data);
            const [inside, samps] = event.data;
            cumInside += inside;
            cumSamples += parseInt(samps);
            console.log('Cumulative = ' + cumInside + " / " + cumSamples + " " + cumInside / cumSamples * hypercubeVolume);
        };
    }

}