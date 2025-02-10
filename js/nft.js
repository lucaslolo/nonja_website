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
    
    // Création normale de balz (toutes les 50ms)
    normalInterval = setInterval(createBalz, 50);

    
}

// Initialisation au chargement de la page
window.addEventListener('load', createFallingBalz);







//-------------------------------------NFT-------------------------------------*/
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const placeholder = document.getElementById('nft-placeholder');

        // Si un filtre autre que "all" est coché, on décoche "all"
        if (this.id !== 'all' && this.checked) {
            document.getElementById('all').checked = false;
        }
        // Si "all" est coché, on décoche tous les autres
        if (this.id === 'all' && this.checked) {
            
            document.querySelectorAll('.filter-checkbox:not(#all)').forEach(other => {
                other.checked = false;
            });
        }


        // Si un filtre autre que "anft" est coché, on décoche "anft"
        if (this.id !== 'anft' && this.checked) {
            document.getElementById('anft').checked = false;
        }
        // Si "anft" est coché, on décoche tous les autres
        if (this.id === 'anft' && this.checked) {
            
            document.querySelectorAll('.filter-checkbox:not(#anft)').forEach(other => {
                other.checked = false;
            });
        }

        // Si un filtre autre que "OG" est coché, on décoche "OG"
        if (this.id !== 'og_nft' && this.checked) {
            document.getElementById('og_nft').checked = false;
        }
        // Si "OG" est coché, on décoche tous les autres
        if (this.id === 'og_nft' && this.checked) {
            
            document.querySelectorAll('.filter-checkbox:not(#og_nft)').forEach(other => {
                other.checked = false;
            });
        }
        
        // Si un filtre autre que "one_one" est coché, on décoche "one_one"
        if (this.id !== 'one_one' && this.checked) {
            document.getElementById('one_one').checked = false;
        }
        // Si "one_one" est coché, on décoche tous les autres
        if (this.id === 'one_one' && this.checked) {
            
            document.querySelectorAll('.filter-checkbox:not(#one_one)').forEach(other => {
                other.checked = false;
            });
        }


        // Si un filtre autre que "custom" est coché, on décoche "custom"
        if (this.id !== 'custom' && this.checked) {
            document.getElementById('custom').checked = false;
        }
        // Si "custom" est coché, on décoche tous les autres
        if (this.id === 'custom' && this.checked) {
            
            document.querySelectorAll('.filter-checkbox:not(#custom)').forEach(other => {
                other.checked = false;
            });
        }


        
        // Récupération des filtres cochés
        const activeFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);

        // Si "all" est sélectionné, affiche tous les NFT
        if (activeFilters.includes('all')) {
            placeholder.style.display = 'none';
            document.querySelectorAll('.nft-item').forEach(item => {
                item.style.display = 'block';
                // Redéclenche l'animation
                item.classList.remove('animate');
                void item.offsetWidth; // Forcer le reflow
                item.classList.add('animate');
            });
        }
        // S'il y a exactement 1 filtre sélectionné (hors "all"), affiche uniquement cette catégorie
        else if (activeFilters.length === 1) {
            placeholder.style.display = 'none';
            document.querySelectorAll('.nft-item').forEach(item => {
                if (item.classList.contains(activeFilters[0])) {
                    item.style.display = 'block';
                    // Redéclenche l'animation
                    item.classList.remove('animate');
                    void item.offsetWidth; // Forcer le reflow
                    item.classList.add('animate');
                } else {
                    item.style.display = 'none';
                }
            });
        }
        // Sinon, affiche le placeholder et masque les items
        else {
            placeholder.style.display = 'block';
            document.querySelectorAll('.nft-item').forEach(item => {
                item.style.display = 'none';
            });
        }
    });
});