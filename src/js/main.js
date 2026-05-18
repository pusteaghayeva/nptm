(function () {
  var toggleBtn = document.getElementById('searchToggleBtn');
  var panel     = document.getElementById('searchPanel');
  var closeBtn  = document.getElementById('searchPanelClose');
  var input     = document.getElementById('searchInput');

  if (!toggleBtn || !panel) return;

  function openSearch() {
    panel.classList.add('open');
    document.body.classList.add('search-open');
    setTimeout(function () { if (input) input.focus(); }, 320);
  }

  function closeSearch() {
    panel.classList.remove('open');
    document.body.classList.remove('search-open');
  }

  toggleBtn.addEventListener('click', function () {
    panel.classList.contains('open') ? closeSearch() : openSearch();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
  });
})();
function setHeaderOffset() {
  var header = document.querySelector('header');
  var panel  = document.getElementById('searchPanel');
  if (header) {
    var h = header.offsetHeight;
    document.body.style.paddingTop = h + 'px';
    // if (panel) panel.style.top = h + 'px';
  }
}

setHeaderOffset();
window.addEventListener('resize', setHeaderOffset);
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
      items: 3,
      margin: 20
    },
    1440: {
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

// bg
(function(){
  var cv=document.getElementById('nptm-net');
  var ctx=cv.getContext('2d');
  var W,H,ZONE,pts=[];
  var COUNT=60,MAX_DIST=130,MOUSE_DIST=110;
  var mouse={x:-999,y:-999};

  function resize(){
    cv.width=window.innerWidth;
    cv.height=window.innerHeight;
    W=cv.width;H=cv.height;
    ZONE=W*0.15;
    init();
  }

  function init(){
    pts=[];
    for(var i=0;i<COUNT;i++){
      var side=i<COUNT/2?'L':'R';
      pts.push({
        x:side==='L'?Math.random()*ZONE:W-Math.random()*ZONE,
        y:Math.random()*H,
        vx:(Math.random()-.5)*.38,
        vy:(Math.random()-.5)*.38,
        ox:0,oy:0,
        r:Math.random()<0.18?3.2:1.6,
        side:side
      });
    }
  }

  resize();
  window.addEventListener('resize',resize);

  window.addEventListener('mousemove',function(e){
    mouse.x=e.clientX;
    mouse.y=e.clientY;
  });
  window.addEventListener('mouseleave',function(){
    mouse.x=-999;mouse.y=-999;
  });

  function inZone(x){
    return x<ZONE||x>W-ZONE;
  }

  function clamp(p){
    var lim=p.side==='L'?ZONE:W-ZONE;
    if(p.side==='L'&&p.x>lim){p.x=lim;p.vx*=-1;}
    if(p.side==='R'&&p.x<lim){p.x=lim;p.vx*=-1;}
    if(p.x<0){p.x=0;p.vx*=-1;}
    if(p.x>W){p.x=W;p.vx*=-1;}
    if(p.y<0){p.y=0;p.vy*=-1;}
    if(p.y>H){p.y=H;p.vy*=-1;}
  }

  function draw(){
    ctx.clearRect(0,0,W,H);

    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      var mdx=p.x-mouse.x,mdy=p.y-mouse.y;
      var md=Math.sqrt(mdx*mdx+mdy*mdy);
      if(md<MOUSE_DIST){
        var force=(1-md/MOUSE_DIST)*18;
        var angle=Math.atan2(mdy,mdx);
        p.ox=Math.cos(angle)*force;
        p.oy=Math.sin(angle)*force;
      } else {
        p.ox*=0.85;
        p.oy*=0.85;
      }
    }

    for(var i=0;i<pts.length;i++){
      for(var j=i+1;j<pts.length;j++){
        var ax=pts[i].x+pts[i].ox,ay=pts[i].y+pts[i].oy;
        var bx=pts[j].x+pts[j].ox,by=pts[j].y+pts[j].oy;
        var dx=ax-bx,dy=ay-by;
        var d=Math.sqrt(dx*dx+dy*dy);
        if(d<MAX_DIST){
          var a=((1-d/MAX_DIST)*0.32).toFixed(2);
          ctx.beginPath();
          ctx.strokeStyle='rgba(80,120,210,'+a+')';
          ctx.lineWidth=0.7;
          ctx.moveTo(ax,ay);
          ctx.lineTo(bx,by);
          ctx.stroke();
        }
      }
    }

    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      var px=p.x+p.ox,py=p.y+p.oy;
      var mdx=p.x-mouse.x,mdy=p.y-mouse.y;
      var md=Math.sqrt(mdx*mdx+mdy*mdy);
      ctx.beginPath();
      ctx.arc(px,py,p.r,0,Math.PI*2);
      ctx.fillStyle=md<MOUSE_DIST?'rgba(8,88,163,0.75)':(p.r>2?'rgba(80,120,210,0.6)':'rgba(80,120,210,0.38)');
      ctx.fill();
      p.x+=p.vx;p.y+=p.vy;
      clamp(p);
    }

    if(mouse.x>-900){
      for(var i=0;i<pts.length;i++){
        var p=pts[i];
        var px=p.x+p.ox,py=p.y+p.oy;
        if(!inZone(px)) continue;
        var mdx=px-mouse.x,mdy=py-mouse.y;
        var md=Math.sqrt(mdx*mdx+mdy*mdy);
        if(md<MOUSE_DIST){
          var a=((1-md/MOUSE_DIST)*0.5).toFixed(2);
          ctx.beginPath();
          ctx.strokeStyle='rgba(30,191,227,'+a+')';
          ctx.lineWidth=0.6;
          ctx.moveTo(mouse.x,mouse.y);
          ctx.lineTo(px,py);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();