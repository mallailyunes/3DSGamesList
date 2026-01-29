console.log("js console");

let data;
let grid = document.querySelector(".grid-container");

var xhttp = new XMLHttpRequest();

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

form.addEventListener("submit",function(e){
    e.preventDefault();
    let title = titleInput.value;
    let developer = developerInput.value;
    let publisher = devInput.value;
    let releaseDate = releaseDateInput.value;
    let imgSrc = imgInput.value;
    let newObj = {
        "id":getNextId(),
        "title": title,
        "developer":developer,
        "publisher": publisher,
        "releaseDate":releaseDate,
        "imgSrc":imgSrc };
    submitData(newObj);
    form.reset();
});

xhttp.open("GET", "3DSGames.json", true);
xhttp.send();