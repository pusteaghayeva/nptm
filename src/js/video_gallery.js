document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".video-tab");
  const items = document.querySelectorAll(".video-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const category = this.dataset.category;

      tabs.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      items.forEach(item => {
        const itemCategory = item.dataset.category;

        if (category === "butun" || itemCategory === category) {
          item.classList.remove("d-none");
        } else {
          item.classList.add("d-none");
        }
      });
    });
  });
});