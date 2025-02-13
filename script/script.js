// Resource management functionality
document.addEventListener('DOMContentLoaded', function() {
    const resourceForm = document.querySelector('form[method="POST"]');
    const masonryGrid = document.querySelector('.masonry-grid');

    resourceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const courseSelect = document.querySelector('select[name="course_id"]');
        const titleInput = document.querySelector('input[name="title"]');
        const descriptionInput = document.querySelector('textarea[name="description"]');
        const fileInput = document.querySelector('input[name="resource_file"]');

        // Basic validation
        if (!titleInput.value || !fileInput.files.length) {
            alert('Please fill in all required fields');
            return;
        }

        // Create new resource card
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h3 class="card-title">${titleInput.value}</h3>
                    <div class="d-flex">
                        <a href="#" download class="text-primary me-2">
                            <i class="fas fa-download"></i>
                        </a>
                        <form method="POST" class="d-inline">
                            <button type="submit" name="delete_resource" class="btn btn-link text-danger p-0"
                                onclick="return confirm('Are you sure you want to delete this resource?')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <p class="card-text text-muted mb-2">${descriptionInput.value || 'No description'}</p>
                <div class="d-flex justify-content-between text-muted small">
                    <span class="badge bg-secondary">${courseSelect.options[courseSelect.selectedIndex].text.split(' - ')[0]}</span>
                    <span>${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                </div>
            </div>
        `;

        // Add to grid
        masonryGrid.insertBefore(newCard, masonryGrid.firstChild);

        // Reset form
        resourceForm.reset();
    });

    // Delete resource functionality
    masonryGrid.addEventListener('click', function(event) {
        if (event.target.closest('button[name="delete_resource"]')) {
            const card = event.target.closest('.card');
            if (card) {
                card.remove();
            }
        }
    });
});