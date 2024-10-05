# roulette
CoinHive but instead of mining crypto, doing paid monte carlo methods. Also with forced user notification/consent.

Read the pdf for more info. 

Putting this script in a site will prompt a user to consent or not. It will run Webworkers running Rust compiled to WebAssembly to do many monte carlo simulations per second. Ideally this will be a monte carlo simulation that is actually useful for business or research, currently just doing a standard one (volume of 10D sphere). 
