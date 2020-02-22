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

  animePoster(divElement, element, listElement);

  var divText = document.createElement("DIV"); //create <div class="description"> in card
  divText.setAttribute("class", "description");
  divElement.appendChild(divText);

  var headerText = document.createElement("DIV"); //<div class="headerText"> in description
  divText.appendChild(headerText);
  headerText.setAttribute("class", "header");
  var divUpText = document.createElement("DIV");
  headerText.appendChild(divUpText);
  divUpText.setAttribute("class", "headerText");

  element.status.forEach(function(oneStatus, index) {
    var pStatus = document.createElement("P");
    divUpText.appendChild(pStatus);
    pStatus.appendChild(document.createTextNode(oneStatus));
    var nr = index + 1;
    pStatus.setAttribute("class", "status" + nr);
  });

  var pDetails = document.createElement("P");
  divUpText.appendChild(pDetails);
  pDetails.appendChild(document.createTextNode(element.details));
  pDetails.setAttribute("class", "details");

  createStatsContent(headerText, element);

  var pMainText = document.createElement("P"); //create <p>
  divText.appendChild(pMainText);
  pMainText.setAttribute("class", "mainText");
  pMainText.appendChild(document.createTextNode(element.description));

  createFooterContent(divText, element);
}

function animePoster(divElement, element, listElement) {
  var divBackground = document.createElement("DIV");
  divBackground.setAttribute("class", "background");
  divElement.appendChild(divBackground);

  var imageElement = document.createElement("IMG"); //create <img>
  imageElement.setAttribute("src", element.image);
  imageElement.setAttribute("class", "animeImage");
  divBackground.appendChild(imageElement);
  document.querySelector(".animeList").appendChild(listElement);

  var overlay = document.createElement("DIV");
  overlay.setAttribute("class", "overlay");
  divBackground.appendChild(overlay);

  var pTitle = document.createElement("P");
  overlay.appendChild(pTitle);
  pTitle.appendChild(document.createTextNode(element.title));
  pTitle.setAttribute("class", "title");

  var studio = document.createElement("P");
  studio.appendChild(document.createTextNode(element.studio));
  studio.setAttribute("class", "studio");
  overlay.appendChild(studio);
}

function createStatsContent(headerText, element) {
  var divStats = document.createElement("DIV"); //<div class="stats">
  headerText.appendChild(divStats);
  divStats.setAttribute("class", "stats");

  var row1 = document.createElement("DIV");
  divStats.appendChild(row1);
  row1.setAttribute("class", "row1");

  var mood = document.createElement("IMG");
  mood.setAttribute("class", "mood");

  row1.appendChild(mood);

  var procent = document.createElement("P");
  row1.appendChild(procent);
  procent.appendChild(document.createTextNode(element.rating + "%"));
  procent.setAttribute("class", "likes");

  if (element.rating >= 75) {
    mood.setAttribute("src", "smile.png");
  } else if (element.rating < 75 && element.rating >= 61) {
    mood.setAttribute("src", "neutral.png");
  } else mood.setAttribute("src", "sad.png");

  var row2 = document.createElement("DIV");
  divStats.appendChild(row2);
  row2.setAttribute("class", "row2");

  var loveIcon = document.createElement("IMG");
  row2.appendChild(loveIcon);
  loveIcon.setAttribute("src", "heart.png");

  var loved = document.createElement("P");
  loved.appendChild(document.createTextNode("#" + element.rank));
  loved.setAttribute("class", "loved");
  row2.appendChild(loved);
}

function createFooterContent(divText, element) {
  var divFooter = document.createElement("DIV"); //<div class="footer">
  divFooter.setAttribute("class", "footer");
  divText.appendChild(divFooter);

  element.genres.forEach(function(genre) {
    //iterate to add one genre at once
    var pFooter = document.createElement("P"); //<div class="footer"><p>
    divFooter.appendChild(pFooter);
    pFooter.appendChild(document.createTextNode(genre));
  });

  var addIcon = document.createElement("IMG");
  divFooter.appendChild(addIcon);
  addIcon.setAttribute("src", "add.png");
}
