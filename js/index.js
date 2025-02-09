async function fetchTokenData() {
    try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/inj1fu5u29slsg2xtsj7v5la22vl4mr4ywl7wlqeck');
        const data = await response.json();
        const pair = data.pairs[0]; // Assurez-vous de vérifier la structure de la réponse de l'API

        const price = pair.priceUsd;
        const marketCap = pair.fdv; // Fully Diluted Valuation (FDV) as a proxy for market cap

        document.getElementById('token-price').textContent = `$${price}`;
        document.getElementById('token-marketcap').textContent = `$${Number(marketCap).toLocaleString()}`;
    } catch (error) {
        console.error('Error fetching token data:', error);
        document.getElementById('token-price').textContent = '$0.00';   
        document.getElementById('token-marketcap').textContent = '$0.00';
    }
}


// Initial total supply
const initialTotalSupply = 10000000000;

// Amount to decrease
const decreaseAmount = 3208000;

// Calculate the new total supply
const newTotalSupply = initialTotalSupply - decreaseAmount;

// Function to animate the total supply
function animateTotalSupply(start, end, duration) {
    const totalSupplyElement = document.getElementById('total-supply');
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(start + (end - start) * progress);
        totalSupplyElement.textContent = `${currentValue.toLocaleString()}`;

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Display the new total supply with animation
document.addEventListener('DOMContentLoaded', (event) => {
    animateTotalSupply(1000000000, newTotalSupply, 3500); // Animate over 3.5 seconds
});

// Fetch the token data when the page loads
window.onload = () => {
    fetchTokenData();
};


// Add the bounce animation to the image when hovering over the button
document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('acheterNonjaButton');
    const image = document.getElementById('bikBalzImage');

    button.addEventListener('mouseover', () => {
        image.classList.add('bounce');
    });

    button.addEventListener('mouseout', () => {
        image.classList.remove('bounce');
    });
});