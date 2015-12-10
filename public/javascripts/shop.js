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
  var req = new XMLHttpRequest();
  req.open('POST', '/buy', true);
  req.send(item.id);
  console.log("Sent request for ", item.id);
  req.addEventListener("load",function() {
    console.log(req.responseText);
    var parsed = JSON.parse(req.responseText);
    if (parsed.message) {
      var h4err = document.getElementById('errors');
      console.log(h4err.childNodes);
      if (h4err.childNodes.length >= 1) {
        var child = h4err.childNodes[0];
        h4err.replaceChild(document.createTextNode(parsed.message),child);
      } else {
        h4err.appendChild(document.createTextNode(parsed.message));
      }
      h4err.style.visibility = "visible";
      setTimeout(function() { h4err.style.visibility = "hidden"; },1000);
    } else {
      console.log(parsed);

      var new_gold = document.createTextNode(parsed.gold);
      var gold = document.getElementById('gold-text');
      gold.parentNode.replaceChild(new_gold, gold);
      //var image = document.createElement('img');
      //image.src = parsed.src;
      //image.className = "cat";
      document.getElementById('acc').src = parsed.src;
      document.getElementById('acc').style.visibility = "visible";
    }
  });
}