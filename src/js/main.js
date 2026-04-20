function initTariffCarousel($el) {
  if ($el.hasClass("owl-loaded")) return;

  $el.owlCarousel({
    autoplay: false,
    autoplayHoverPause: true,
    smartSpeed: 800,
    loop: false,
    nav: false,
    dots: false,
    autoHeight: false,
    margin: 40,
    stagePadding: 28,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 16,
        stagePadding: 0
      },
      600: {
        items: 2,
        margin: 20,
        stagePadding: 0
      },
      1200: {
        items: 3,
        margin: 40,
        stagePadding: 18
      }
    }
  });
}

$(document).ready(function () {
  $(".tab-pane.show.active .tariff-carousel").each(function () {
    initTariffCarousel($(this));
  });

  $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    const target = $($(e.target).attr("data-bs-target"));
    const $carousel = target.find(".tariff-carousel");

    $carousel.each(function () {
      initTariffCarousel($(this));
      $(this).trigger("refresh.owl.carousel");
    });
  });
});
$('.news-carousel').owlCarousel({
  loop: true,
  nav: false,
  dots: false,
  smartSpeed: 700,
  mouseDrag: true,
  touchDrag: true,
  responsive: {
    0: {
      items: 1,
      margin: 16
    },
    768: {
      items: 2,
      margin: 20
    },
    992: {
      items: 3,
      margin: 20
    },
    1200: {
      items: 4,
      margin: 20
    },
     1800: {
      items: 5,
      margin: 20
    },
     2200: {
      items: 6,
      margin: 20
    }
  }
});
// $('.news-carousel').owlCarousel({
//   loop: true,
//   nav: false,
//   dots: false,
//   smartSpeed: 700,
//   autoplay: false,
//   autoplayHoverPause: true,
//   autoHeight: false,
//   mouseDrag: true,
//   touchDrag: true,
//   pullDrag: true,
//   responsive: {
//     0: {
//       items: 1,
//       autoWidth: false,
//       margin: 16,
//       stagePadding: 0
//     },
//     768: {
//       items: 2,
//       autoWidth: false,
//       margin: 20,
//       stagePadding: 0
//     },
//         992: {
//       items: 3,
//       autoWidth: false,
//       margin: 20,
//       stagePadding: 0
//     },
//     1200: {
//       autoWidth: true,
//       margin: 18,
//       stagePadding: 0
//     }
//   }
// });

// back to top
(function ($) {
  "use strict";

  $(".switch").on("click", function () {
    if ($("body").hasClass("light")) {
      $("body").removeClass("light");
      $(".switch").removeClass("switched");
    } else {
      $("body").addClass("light");
      $(".switch").addClass("switched");
    }
  });

  $(document).ready(function () {

    var progressPath = document.querySelector(".progress-wrap path");

    if (progressPath) {
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition = "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition =
      progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      $(window).scroll(updateProgress);
    }

    var offset = 50;
    var duration = 550;

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > offset) {
        $(".progress-wrap").addClass("active-progress");
      } else {
        $(".progress-wrap").removeClass("active-progress");
      }
    });

    $(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });

  });

})(jQuery);