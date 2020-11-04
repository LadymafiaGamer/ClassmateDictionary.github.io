function wordSearch() {
  document.getElementById("searchResult").style.visibility = "visible";

  //Global Variables
  var word = document.getElementById("word");
  var verb = document.getElementById("verb");
  var definition = document.getElementById("definition");
  var example = document.getElementById("example");
  var spell = document.getElementById("spell");

  var wordToSearch = document.getElementById("searchBox").value;

  //Defination Output Start
  var request1 = new XMLHttpRequest();
  request1.open(
    "GET",
    "https://api.wordnik.com/v4/word.json/" +
      wordToSearch +
      "/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=e0d094e089e87c411680f08f6ab0e7be39143f84626e8c9e4",
    true
  );
  request1.onload = function () {
    var data = JSON.parse(this.response);
    if (wordToSearch == "") {
      alert("Enter a Word");
    } else if (request1.status >= 200 && request1.status < 400) {
      var i = Math.ceil(Math.random() * 10);
      word.innerHTML = data[1].word;
      verb.innerHTML = data[1].partOfSpeech;
      definition.innerHTML = data[1].text;
    } else {
      word.innerHTML = "Not Found";
      location.reload();
      definition.innerHTML = "Not Found";
      location.reload();
    }
  };
  request1.send();
  //Defination Output End

  //Example Output Start
  var request2 = new XMLHttpRequest();
  request2.open(
    "GET",
    "https://api.wordnik.com/v4/word.json/" +
      wordToSearch +
      "/topExample?useCanonical=false&api_key=e0d094e089e87c411680f08f6ab0e7be39143f84626e8c9e4",
    true
  );
  request2.onload = function () {
    var data2 = JSON.parse(this.response);
    if (wordToSearch == "") {
      alert("Enter a Word");
    } else if (request2.status >= 200 && request2.status < 400) {
      example.innerHTML = data2.text;
    } else {
      example.innerHTML = "Not Found";
      location.reload();
    }
  };
  request2.send();
  //Example Output End

  //Audio Output Start
  var request3 = new XMLHttpRequest();
  request3.open(
    "GET",
    "https://api.wordnik.com/v4/word.json/" +
      wordToSearch +
      "/audio?useCanonical=false&limit=50&api_key=e0d094e089e87c411680f08f6ab0e7be39143f84626e8c9e4",
    true
  );
  request3.onload = function () {
    var data3 = JSON.parse(this.response);
    if (wordToSearch == "") {
      alert("Enter a Word");
    } else if (request3.status >= 200 && request3.status < 400) {
      var audio = document.createElement("AUDIO");
      audio.setAttribute("src", data3[0].fileUrl);
      audio.setAttribute("controls", "controls");
      audio.setAttribute("autoplay", "autoplay");
      spell.appendChild(audio);
    } else {
      spell.innerHTML = "Not Found";
      location.reload();
    }
  };
  request3.send();
  //Audio Output End
}
