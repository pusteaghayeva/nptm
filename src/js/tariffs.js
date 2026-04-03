document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".tariffs-scroll");
    const scrollArea = document.getElementById("tariffsScrollArea");
    const thumb = document.getElementById("tariffsThumb");
    const upBtn = document.querySelector(".scroll-up");
    const downBtn = document.querySelector(".scroll-down");
    const track = document.querySelector(".scroll-track");

    if (!wrapper || !scrollArea || !thumb || !upBtn || !downBtn || !track) return;

    function hasVerticalScroll() {
        return scrollArea.scrollHeight > scrollArea.clientHeight + 1;
    }

    function updateScrollbarVisibility() {
        const show = hasVerticalScroll();
        wrapper.classList.toggle("has-scroll", show);

        if (!show) {
            thumb.style.height = "0px";
            thumb.style.top = "0px";
            scrollArea.scrollTop = 0;
            return false;
        }

        return true;
    }

    function updateThumb() {
        const visible = updateScrollbarVisibility();
        if (!visible) return;

        const scrollHeight = scrollArea.scrollHeight;
        const clientHeight = scrollArea.clientHeight;
        const scrollTop = scrollArea.scrollTop;
        const trackHeight = track.clientHeight;

        const ratio = clientHeight / scrollHeight;
        const thumbHeight = Math.max(trackHeight * ratio, 44);
        const maxThumbTop = trackHeight - thumbHeight;
        const maxScrollTop = scrollHeight - clientHeight;
        const thumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

        thumb.style.height = thumbHeight + "px";
        thumb.style.top = thumbTop + "px";
    }

    scrollArea.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    upBtn.addEventListener("click", function () {
        if (!hasVerticalScroll()) return;
        scrollArea.scrollBy({ top: -120, behavior: "smooth" });
    });

    downBtn.addEventListener("click", function () {
        if (!hasVerticalScroll()) return;
        scrollArea.scrollBy({ top: 120, behavior: "smooth" });
    });

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    thumb.addEventListener("mousedown", function (e) {
        if (!hasVerticalScroll()) return;
        isDragging = true;
        startY = e.clientY;
        startTop = parseFloat(window.getComputedStyle(thumb).top) || 0;
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        const trackHeight = track.clientHeight;
        const thumbHeight = thumb.offsetHeight;
        const maxThumbTop = trackHeight - thumbHeight;

        let newTop = startTop + (e.clientY - startY);
        newTop = Math.max(0, Math.min(newTop, maxThumbTop));

        const maxScrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;
        const newScrollTop = maxThumbTop > 0 ? (newTop / maxThumbTop) * maxScrollTop : 0;

        scrollArea.scrollTop = newScrollTop;
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        document.body.style.userSelect = "";
    });

    track.addEventListener("click", function (e) {
        if (!hasVerticalScroll()) return;
        if (e.target === thumb) return;

        const rect = track.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const thumbHeight = thumb.offsetHeight;
        const targetTop = clickY - thumbHeight / 2;
        const maxThumbTop = track.clientHeight - thumbHeight;
        const clampedTop = Math.max(0, Math.min(targetTop, maxThumbTop));
        const maxScrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;

        scrollArea.scrollTo({
            top: maxThumbTop > 0 ? (clampedTop / maxThumbTop) * maxScrollTop : 0,
            behavior: "smooth"
        });
    });

    updateThumb();
});