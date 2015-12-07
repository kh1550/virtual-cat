document.addEventListener('DOMContentLoaded', init);

function init() {
  var button = document.getElementById('Go');
  button.addEventListener('click', handleClick);

  function handleClick(event) {
    console.log("Go clicked!");
    var req = new XMLHttpRequest();
    req.open('POST', '/', false);
    req.send(document.getElementById('username').value);
    window.location.replace('/play');
  }
}