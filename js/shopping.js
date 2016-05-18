$(document).ready(function()
{
  fetch_items();
  fill_cart();
});
function fetch_items() {
  var link='/app/fetch_items';
  $.ajax({
        url: link,
        dataType: 'json'
      })
      .done(function(data) {
      var item_sec = $('#itm_sec_div');
      //document.write(data);
      item_sec.append(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
          alert("An error has occured while making a connection to WebSite Please try reloading the page");
        });
}
function fill_cart()
{
  var link='/app/fill_cart';
  $.ajax({
        url: link,
        dataType: 'json',
        method:'post'
      })
      .done(function(data) {
      var cart_sec = $('#cart_sec_div');
      cart_sec.append(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
          alert("An error has occured while making a connection to WebSite Please try reloading the page");
        });
}
function target_form_remove()
{
  $(".item").attr('action',"/app/remove_from_cart");
}
function target_form_update()
{
  $(".item").attr('action',"/app/update_cart");
}