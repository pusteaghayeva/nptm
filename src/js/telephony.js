document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openPaymentBox");
    const dropdown = document.getElementById("paymentDropdown");
    const payCard = document.getElementById("onlinePayCard");

    if (!openBtn || !dropdown || !payCard) return;

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
        payCard.classList.toggle("active-card");
    });

    document.addEventListener("click", function (e) {
        const clickedInsideCard = payCard.contains(e.target);
        const clickedInsideDropdown = dropdown.contains(e.target);

        if (!clickedInsideCard && !clickedInsideDropdown) {
            dropdown.classList.remove("active");
            payCard.classList.remove("active-card");
        }
    });
});
