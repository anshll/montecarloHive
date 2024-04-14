// Listen for messages from the main thread
self.onmessage = async function(event) {
    if (event.data.type === 'start') {

        function monteCarloHypersphereVolume(numSamples, numDimensions) {
            let insideSphere = 0;

            for (let i = 0; i < numSamples; i++) {
                // Generate a random point in the hypercube [-1, 1]^numDimensions
                let point = [];
                for (let d = 0; d < numDimensions; d++) {
                    point[d] = Math.random() * 2 - 1; // Range [-1, 1]
                }

                // Check if the point falls within the hypersphere of radius 1 centered at the origin
                let distanceSquared = point.reduce((acc, val) => acc + val ** 2, 0);
                if (distanceSquared <= 1) {
                    insideSphere++;
                }
            }

            return insideSphere;
        }

        // Number of samples for the simulation
        const numSamples = event.data.workerSamples;
        console.log(numSamples);
        const numDimensions = event.data.numDimensions; // Number of dimensions

        const numSampBatch = 1e7;
        const numBatches = Math.ceil(numSamples / numSampBatch);
        for (let i = 0; i < numBatches; i++) {
            const inside = monteCarloHypersphereVolume(numSampBatch, numDimensions);
            self.postMessage([inside, numSampBatch]);
        }

    }
};