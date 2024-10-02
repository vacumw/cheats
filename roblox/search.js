document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-name');
    const versionDropdownLinks = document.querySelectorAll('#version-dropdown a');
    const typeDropdownLinks = document.querySelectorAll('#type-dropdown a');
    const products = document.querySelectorAll('.product');
    const noResultsMessage = document.getElementById('no-results');

    let selectedVersion = 'all';
    let selectedType = 'all';

    // Filter products based on search input, version, and type
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        products.forEach((product) => {
            const name = product.getAttribute('data-name').toLowerCase();
            const version = product.getAttribute('data-version');
            const type = product.getAttribute('data-type');
            const tags = product.getAttribute('data-tags').toLowerCase();

            // Check if the product matches the search term, version, and type
            const matchesSearch = name.includes(searchTerm) || tags.includes(searchTerm);
            const matchesVersion = selectedVersion === 'all' || version === selectedVersion;
            const matchesType = selectedType === 'all' || type === selectedType;

            if (matchesSearch && matchesVersion && matchesType) {
                product.style.display = 'block'; // Show matching product
                visibleCount++;
            } else {
                product.style.display = 'none'; // Hide non-matching product
            }
        });

        // Show or hide the "no results" message
        noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Event listener for search input
    searchInput.addEventListener('input', filterProducts);

    // Event listeners for version dropdown
    versionDropdownLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            selectedVersion = this.getAttribute('data-version');
            filterProducts();
        });
    });

    // Event listeners for type dropdown
    typeDropdownLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            selectedType = this.getAttribute('data-type');
            filterProducts();
        });
    });
});
