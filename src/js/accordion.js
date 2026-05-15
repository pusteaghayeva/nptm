document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item   = this.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

        if (!isOpen) item.classList.add('open');
    });
});

const tabs = document.querySelectorAll('.post-list-tab');
const tabContents = {
    city:  document.getElementById('tabCity'),
    index: document.getElementById('tabIndex'),
};

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        Object.values(tabContents).forEach(c => c.style.display = 'none');
        tabContents[tab.dataset.tab].style.display = 'block';
    });
});