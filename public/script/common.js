$(function() {
    $(".card-list").click(function() {
        var id = $(this).data("item-id");
        location.href = "/post/" + id;
        window.localStorage.setItem("appUrl", "app.mytff");
    });

    window.message = function() {
        var message = $("#message")
        message.addClass("active");
        var msg = setTimeout(function() {
            message.removeClass("active");
        }, 3000)
    }
});
