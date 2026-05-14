const showListBtn  = document.getElementById('showList');
const drawer       = document.getElementById('postListDrawer');
const overlay      = document.getElementById('postListOverlay');
const closeBtn     = document.getElementById('postListClose');

function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

showListBtn.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
});

const tabs = document.querySelectorAll('.post-list-tab');
const tabContents = {
    city:     document.getElementById('tabCity'),
    index:    document.getElementById('tabIndex'),

};

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        Object.values(tabContents).forEach(c => c.style.display = 'none');
        tabContents[tab.dataset.tab].style.display = 'block';
    });
});

// tab index
document.querySelectorAll('.streets-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const item = this.closest('.post-index-item');
        const hidden = item.querySelectorAll('.streets-hidden');
        const isOpen = this.dataset.open === 'true';

        hidden.forEach(el => el.style.display = isOpen ? 'none' : 'block');
        this.textContent = isOpen ? 'Küçələri göstər' : 'Küçələri gizlət';
        this.dataset.open = isOpen ? 'false' : 'true';
    });
});

document.querySelectorAll('.city-streets-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const item = this.closest('.post-list-city-item');
        const streetsList = item.querySelector('.city-streets-list');
        const isOpen = this.dataset.open === 'true';

        streetsList.style.display = isOpen ? 'none' : 'block';
        this.textContent = isOpen ? 'Ünvanları göstər' : 'Ünvanları gizlət';
        this.dataset.open = isOpen ? 'false' : 'true';
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

        if (!isOpen) item.classList.add('open');
    });
});

