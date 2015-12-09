document.addEventListener('DOMContentLoaded', init);

function init() {
  var button = document.getElementById('shop');
  button.addEventListener('click', openShop);

  function openShop(event) {
    console.log("Shop clicked!");
    //document.getElementById('container-shop').style.visibility = "visible";
    document.getElementById('container-shop').style.display = "block";

    document.getElementById('exit').addEventListener('click', function() {
      console.log("Exit clicked!");
      //document.getElementById('container-shop').style.visibility = "hidden";
      document.getElementById('container-shop').style.display = "none";
    });
  }
}

function buyItem(item) {
  console.log(item_id.id);
  var req = new XMLHttpRequest();
  req.open('POST', '/buy', false);
  req.send(item.id);
}