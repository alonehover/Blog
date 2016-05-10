$(function() {
	$(".card-list").click(function() {
		var id = $(this).data("item-id");
		location.href = "/post/" + id;
		window.localStorage.setItem("name", id)
	});
});