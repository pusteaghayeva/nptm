$(document).ready(function () {
    $('.js-select2').each(function () {
        $(this).select2({
            width: '100%',
            placeholder: $(this).data('placeholder'),
        });
    });
});