console.log("js console");

let data;
let grid = document.querySelector(".grid-container");
let form = document.querySelector(".form");

var newObj = {
    title: titleInput.value,
    publisher: pubInput.value,
    releaseDate: dateInput.value
  };

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(xhttp.responseText);
        console.log(data);
            localStorage.setItem("dataList",JSON.stringify(data));

        data.forEach(function(game) {
           let card = document.createElement("div");
           card.classList.add("card");
           let textData =
           "<div class='game-title'>" + game.Game + "</div>" + 
           "<span>" + 
           "Release year:  " + game.Year + "<br>" + 
           "Developer: " + game.Dev + "<br>" + 
           "Publisher: " + game.Publisher;

           card.innerHTML = textData;

           if (game.imgSrc) {
            card.style.backgroundImage = "url('" + game.imgSrc + "')";
           }

           grid.appendChild(card);
        });
    }
};

// LOAD DATA (localStorage first, otherwise XHR)
if (localStorage.getItem("datalist")) {
    data = JSON.parse(localStorage.getItem("datalist"));
    console.log("Loaded from localStorage");
    if (grid) {
      makeCards();
    }
  } else {
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        console.log("Loaded from gameData.json");
  
        localStorage.setItem("datalist", JSON.stringify(data));
        console.log("Saved starter data to localStorage");
  
        if (grid) {
          makeCards();
        }
      }
    };

    xhttp.open("GET", "gameData.json", true);
    xhttp.send();
}

// RENDER CARDS
function makeCards() {
    grid.innerHTML = "";
  
    data.forEach(function (game) {
      let card = document.createElement("div");
      card.classList.add("card");
  
      let textData =
        "<div class='game-title'>" + game.title + "</div>" +
        "<div>Publisher: " + game.publisher + "</div>" +
        "<div>Release Date: " + game.releaseDate + "</div>";

        card.innerHTML = textData;
        grid.appendChild(card);
      });
    
      console.log("cards refreshed");
    }    
  

form.addEventListener("submit",function(e){
    e.preventDefault();
    let title = titleInput.value;
    let releaseDate = releaseDateInput.value;
    let developer = developerInput.value;
    let publisher = devInput.value;
    let imgSrc = imgInput.value;
    let newObj = {
        "id":getNextId(),
        "title": title,
        "releaseDate":releaseDate,
        "developer":developer,
        "publisher": publisher,
        "imgSrc":imgSrc };
    submitData(newObj);
    form.reset();
});

xhttp.open("GET", "3DSGames.json", true);
xhttp.send();