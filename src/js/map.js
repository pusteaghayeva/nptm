$(function() {
    $('.blue-tooltip').click(function() {
        var id = $(this).data('id');
        if (id == 15) {
            var u = '/az/elaqe/rayon-polis-idare-ve-sobeleri/olke-uzre-polis-idare-sobe-ve-sahe-menteqeleri/baku';
            location.href = u;
        } else {
            $("#city_" + id).fadeIn();
        }
    });

    $('.map-close-icon').click(function() {
        $('.city-modal').hide();
    });
});


$(function() {
    $('.blue-tooltip').click(function() {
        $('.city-modal').hide();
        var pid = $(this).data('pid');
        var id = $(this).data('id');

        if (id == 15) {
            var u = config.lang + '/map/archive/' + id + '/';
            location.href = u;
        } else {
            $("#city_" + id).fadeIn();
        }
    });

    $('.map-close-icon').click(function() {
        $('.city-modal').hide();
    });
})

function closeCityModal() {
    let cityModal = document.querySelector('.city-modal');
    cityModal.style.display = "none"
}

function getCity() {
    let cityModal = document.querySelector('.city-modal');
    cityModal.style.display = "block"
}

function handleSidebar() {
    let sidebarList = document.getElementById('sidebar-list');
    let sidebarOpener = document.getElementById('sidebar-expand-icon');

    if(sidebarOpener.classList.contains("sidebar-expanding-open")) {
        sidebarList.style.display = "none"
        sidebarOpener.classList.remove("sidebar-expanding-open");
    } else {
        sidebarList.style.display = "block";
        sidebarOpener.classList.add('sidebar-expanding-open');
    }
}
