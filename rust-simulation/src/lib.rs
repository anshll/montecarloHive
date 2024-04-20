mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn monte_carlo_hypersphere_volume(num_samples: usize, num_dimensions: usize, _worker_index: usize, _num_workers: usize) -> f64 {
    let mut inside_sphere = 0;

    // Calculate the number of samples to process per worker
    let samples_per_worker = num_samples / _num_workers;

    // Process samples
    for _ in 0..samples_per_worker {
        // Generate a random point in the hypercube [-1, 1]^num_dimensions
        let mut point = vec![0.0; num_dimensions];
        for d in 0..num_dimensions {
            point[d] = js_sys::Math::random() * 2.0 - 1.0; // Random point within [-1, 1] in each dimension
        }

        // Check if the point falls within the hypersphere of radius 1 centered at the origin
        let distance_squared = point.iter().fold(0.0, |acc, &val| acc + val * val);
        if distance_squared <= 1.0 {
            inside_sphere += 1;
        }
    }

    inside_sphere as f64
}
