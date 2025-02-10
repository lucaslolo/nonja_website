async function fetchTokenData() {
    try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/inj1fu5u29slsg2xtsj7v5la22vl4mr4ywl7wlqeck');
        const data = await response.json();
        const pair = data.pairs[0];

        const priceElement = document.getElementById('token-price');
        const marketCapElement = document.getElementById('token-marketcap');

        // Formatage des nombres avec la fonction formatPrice
        if (priceElement && pair.priceUsd) {
            animateValue(priceElement, 0, parseFloat(pair.priceUsd), 1000, formatPrice);
        }
        
        if (marketCapElement && pair.fdv) {
            animateValue(marketCapElement, 0, parseFloat(pair.fdv), 1000, formatPrice);
        }
    } catch (error) {
        console.error('Error fetching token data:', error);
        // Afficher une valeur par défaut en cas d'erreur
        document.getElementById('token-price').textContent = 'N/A';
        document.getElementById('token-marketcap').textContent = 'N/A';
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
    // Rafraîchir les données toutes les 30 secondes
    setInterval(fetchTokenData, 30000);
};

// Variable pour stocker l'intervalle normal
let normalInterval;
// Variable pour stocker l'intervalle rapide
let fastInterval;

function createFallingBalz() {
    const container = document.querySelector('.falling-balz-container');
    
    function createBalz() {
        const balz = document.createElement('div');
        balz.classList.add('falling-balz');
        
        const startPositionX = Math.random() * window.innerWidth;
        balz.style.left = startPositionX + 'px';
        
        const fallDuration = Math.random() * 4 + 3; // Entre 3 et 7 secondes
        const size = Math.random() * 40 + 40;
        
        balz.style.width = size + 'px';
        balz.style.height = size + 'px';
        balz.style.animationDuration = fallDuration + 's';
        
        container.appendChild(balz);
        
        setTimeout(() => {
            balz.remove();
        }, fallDuration * 1000);
    }
    
    // Création normale de balz (toutes les 200ms)
    normalInterval = setInterval(createBalz, 200);
    
    // Création initiale de beaucoup plus de balz
    for(let i = 0; i < 40; i++) { // Doublé de 20 à 40 balz initiaux
        setTimeout(() => createBalz(), i * 100);
    }

    // Ajout des événements pour le bouton Buy Nonja
    const buyButton = document.getElementById('acheterNonjaButton');
    if (buyButton) {
        buyButton.addEventListener('mouseover', () => {
            // Arrêt de l'intervalle normal
            clearInterval(normalInterval);
            // Création rapide de balz (toutes les 100ms)
            fastInterval = setInterval(createBalz, 100);
            // Création immédiate d'une pluie de balz
            for(let i = 0; i < 60; i++) { // Augmenté de 40 à 60 pour le burst
                setTimeout(() => createBalz(), i * 50);
            }
        });

        buyButton.addEventListener('mouseout', () => {
            // Arrêt de l'intervalle rapide
            clearInterval(fastInterval);
            // Reprise de l'intervalle normal
            normalInterval = setInterval(createBalz, 200);
        });
    }
}

// Initialisation au chargement de la page
window.addEventListener('load', createFallingBalz);

// Amélioration du formatage des prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: price < 0.01 ? 8 : 2,
        maximumFractionDigits: price < 0.01 ? 8 : 2
    }).format(price);
}

// Animation des valeurs
function animateValue(element, start, end, duration, formatter) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end - start) * progress;
        element.textContent = formatter(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}