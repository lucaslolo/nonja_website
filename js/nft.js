// Fetch the token data when the page loads
window.onload = () => {
    const allCheckbox = document.getElementById('all');
    allCheckbox.dispatchEvent(new Event('change'));
};

// Fonction pour filtrer les NFT
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
        document.querySelectorAll('.nft-item').forEach(item => {
            item.style.display = selectedFilters.some(filter => item.classList.contains(filter)) ? 'block' : 'none';
        });
    });
});

// Fonction pour activer/désactiver toutes les cases à cocher
document.querySelector('input[value="all"]').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.filter-checkbox:not([value="all"])');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
    // Déclencher l'événement de changement pour mettre à jour l'affichage des NFT
    checkboxes.forEach(checkbox => {
        checkbox.dispatchEvent(new Event('change'));
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const allCheckbox = document.getElementById('all');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox:not(#all)');
    const allLabel = document.querySelector('label[for="all"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAllButton);
    });

    function updateAllButton() {
        const activeCheckboxes = Array.from(filterCheckboxes).filter(checkbox => checkbox.checked);
        if (activeCheckboxes.length >= 5) {
            allLabel.style.background = 'linear-gradient(45deg, red, gold, purple, lightskyblue, white)';
            allLabel.style.color = 'black';
        } else {
            allLabel.style.background = 'black';
            allLabel.style.color = 'white';
        }
    }

    allCheckbox.addEventListener('change', function() {
        if (this.checked) {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        } else {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        updateAllButton();
    });

    updateAllButton();
});