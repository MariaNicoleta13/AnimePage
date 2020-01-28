function reqListener() {
  var stringDate = this.responseText;
  var objData = JSON.parse(stringDate);
  // console.log(objData.length);
  iterate(objData);
}
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api/animes");
oReq.send();
function iterate(x) {
  x.forEach(function(element, index) {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    // 1 - 4 - 7 ##### x % 3 = 1
    if (index % 3 == 1) {
      list(element, "middle");
    } else if (index % 3 == 0) list(element, "first");
    else if (index % 3 == 2) list(element, "third");
  });
}
function list(element, clas) {
  var listElement = document.createElement("LI"); //create <li>
  listElement.setAttribute("class", clas);

  listElement.classList.add("animeItem");
  var divElement = document.createElement("DIV"); //create <div class="card">
  divElement.setAttribute("class", "card");

  listElement.appendChild(divElement);


  var imageElement = document.createElement("IMG"); //create <img>
  imageElement.setAttribute("src", element.image);
  imageElement.setAttribute("class", "animeImage");
  divElement.appendChild(imageElement);
  document.querySelector(".animeList").appendChild(listElement);

  var divText = document.createElement("DIV"); //create <div class="description"> in card
  divText.setAttribute("class", "description");
  divElement.appendChild(divText);

  var headerText=document.createElement("DIV");//<div class="headerText"> in description
  divText.appendChild(headerText);
  headerText.setAttribute("class","headerText");
  headerText.appendChild(document.createTextNode(element.status));
  headerText.appendChild(document.createTextNode(" "));
  headerText.appendChild(document.createTextNode(element.details));



  var pMainText = document.createElement("P"); //create <p>
  divText.appendChild(pMainText);
  pMainText.appendChild(document.createTextNode(element.description));
  
}
