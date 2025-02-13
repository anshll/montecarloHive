# roulette
Ads suck. But websites need to monetize somehow. What if anyone visiting a website instead could donate spare CPU power (around 20%) --- as we know, computational power is worth money in this world. CoinHive tried this, with using people's computational power to mine crypto currency.

But crypto is maybe not the best use of our resources and CoinHive had problems with security and consent (it wouldn't have a pop up asking for consent, which also made it easy for hackers to insert into unassuming websites and profit off it without users or the owner of the website to know).

Mining crypto is an embarrassingly parallel problem, meaning it can be infinitely split across different computers---essential for a service like CoinHive or roulette which would run on countless websites on countless people's laptops or phones (a huge distributed network of compute). There are other embarrassingly parallel problems, like Monte Carlo Simulations, which are essential parts of financial and weather modeling. I built roulette to just do Monte Carlo simulations to begin with, but it could easily be extended to do other embarrassingly parallel, or just other parallelizable problems that aren't as easy to distribute as embarrassingly parallel.

Putting this script in a site will prompt a user to consent or not. It will run Webworkers running Rust compiled to WebAssembly to do many Monte Carlo simulations per second. Ideally this will be a Monte Carlo simulation that is actually useful for business or research, currently just doing a standard one (finding the volume of a 10D sphere). 

Read the PDF poster for a nice overview.

Demo Available here: https://replit.com/@Anshul75/betterAds?v=1#roulette.js (sadly need to fork to run it)
Here's some images though:

An example news website, that could use this for monetization. Notice the popup.
<img width="713" alt="Screenshot 2024-11-13 at 10 59 03 AM" src="https://github.com/user-attachments/assets/29dace3a-293a-4012-89b2-5dc17a5f20b1">

The console output, showing it detected the number of cores on the computer and will only use some of them (currently set to 1/3). Notice it does about 6 million computations per worker (parallel process); this is hyper optimized with Rust WebAssembly and parallelization---my previous Javascript only code was at least 20x slower.
<img width="631" alt="Screenshot 2024-11-13 at 10 59 38 AM" src="https://github.com/user-attachments/assets/dcba06e8-0ade-490f-8bef-d5b145da4ae6">
