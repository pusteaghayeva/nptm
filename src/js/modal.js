const showListBtn = document.getElementById('showList');
const drawer      = document.getElementById('postListDrawer');
const overlay     = document.getElementById('postListOverlay');
const closeBtn    = document.getElementById('postListClose');

function initStreetToggles() {
    const tabIndex = document.getElementById('tabIndex');
    if (!tabIndex) return;
    const wasHidden = tabIndex.style.display === 'none';
    if (wasHidden) {
        tabIndex.style.visibility = 'hidden';
        tabIndex.style.position = 'absolute';
        tabIndex.style.display = 'block';
    }

    document.querySelectorAll('.post-index-item').forEach(item => {
        const streets = item.querySelector('.post-index-streets');
        const toggle  = item.querySelector('.streets-toggle');

        if (!streets || !toggle) return;
        if (toggle.dataset.initialized) return;

        streets.style.maxHeight = 'none';
        const fullHeight = streets.scrollHeight;
        streets.style.maxHeight = '72px';

        if (fullHeight <= 72) {
            toggle.style.display = 'none';
        } else {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isOpen = streets.classList.contains('expanded');

                if (isOpen) {
                    streets.style.maxHeight = streets.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            streets.style.maxHeight = '72px';
                        });
                    });
                    streets.classList.remove('expanded');
                } else {
                    streets.style.maxHeight = 'none';
                    const h = streets.scrollHeight;
                    streets.style.maxHeight = '72px';
                    requestAnimationFrame(() => {
                        streets.style.maxHeight = h + 'px';
                        streets.classList.add('expanded');
                    });
                }

                this.textContent = isOpen ? 'Küçələri göstər' : 'Küçələri gizlət';
            });
        }

        toggle.dataset.initialized = 'true';
    });

    if (wasHidden) {
        tabIndex.style.display = 'none';
        tabIndex.style.visibility = '';
        tabIndex.style.position = '';
    }
}

function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    initStreetToggles();
}

function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (showListBtn) showListBtn.addEventListener('click', openDrawer);
if (closeBtn)    closeBtn.addEventListener('click', closeDrawer);
if (overlay)     overlay.addEventListener('click', closeDrawer);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
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
        if (tabContents[tab.dataset.tab]) {
            tabContents[tab.dataset.tab].style.display = 'block';
        }
        if (tab.dataset.tab === 'index') {
            initStreetToggles();
        }
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item   = this.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

        if (!isOpen) item.classList.add('open');
    });
});

// İç səhifələrdə avtomatik işə sal
initStreetToggles();