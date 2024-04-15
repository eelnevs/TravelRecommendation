async function fetchHTML(file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    return html;
  } catch (error) {
    window.alert(`Error getting page from ${file}`);
    console.error(error);
  }
}

async function loadMainContent(file) {
  document.querySelector("#main-content").innerHTML = await fetchHTML(file);
}

function searchBar(enable) {
  document.querySelector("#searchBar").style.visibility = enable;
}

document.querySelector("#homeBtn").addEventListener("click", () => {
  loadMainContent("home.html");
  searchBar("visible");
});
document.querySelector("#aboutUsBtn").addEventListener("click", () => {
  loadMainContent("about_us.html");
  searchBar("hidden");
});
document.querySelector("#contactUsBtn").addEventListener("click", () => {
  loadMainContent("contact_us.html");
  searchBar("hidden");
});

function bookButtonClick() {
  loadMainContent("contact_us.html");
  searchBar("hidden");
}

async function fetchRecommendations() {
  try {
    const response = await fetch("./data/travel_recommendation_api.json");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cannot fetch data:", error);
  }
  return undefined;
}

function setDestination(des) {
  const lastCard = document.querySelector("#recommendations").lastChild;
  lastCard.querySelector(".destination-name").textContent = des.name;
  lastCard.querySelector(".destination-time").textContent = getTime(des.timeZone);
  if (des.notFound == 1) {
    lastCard.querySelector(".destination-img").src = "";
    lastCard.querySelector(".destination-visitBtn").style.display = "none";
  } else {
    lastCard.querySelector(".destination-img").src = des.imageUrl;
    lastCard.querySelector(".destination-description").textContent =
      des.description;
    lastCard.querySelector(".destination-visitBtn").style.display = "flex";
  }
}

async function showRecommendations(destinations) {
  const recommendationsDiv = document.querySelector("#recommendations");
  const bar = document.createElement("div");
  bar.classList.add("result-bar");
  recommendationsDiv.appendChild(bar);
  if (destinations == undefined) {
    destinations = [
      {
        name: "No destination found",
        notFound: 1,
      },
    ];
  }
  destinations.forEach((des) => {
    fetchHTML("search_result.html")
      .then((html) => {
        const newCard = document.createElement("div");
        recommendationsDiv.appendChild(newCard);
        const lastCard = document.querySelector("#recommendations").lastChild;
        lastCard.outerHTML = html;
      })
      .then(() => {
        setDestination(des);
      })
      .catch((error) => console.error("fail to add destination card:", error));
  });
}

async function search() {
  clearSearch(false);
  const word = document.querySelector("#searchBar input").value.toLowerCase();
  if (word.length > 0) {
    const destinations = await fetchRecommendations();
    var find = Object.keys(destinations).find((x) =>
      x.includes(word.substr(0, word.length - 1))
    );
    if (!find) {
      find = destinations.countries.find((x) =>
        x.name.toLowerCase().includes(word.substr(0, word.length - 1))
      );
      if (find) showRecommendations(find.cities);
      else showRecommendations(undefined);
    } else {
      if (find == "countries")
        showRecommendations(
          destinations.countries.flatMap((x) => x.cities),
          true
        );
      else showRecommendations(destinations[find]);
    }
  }
}

function clearSearch(resetKeyWord = true) {
  document.querySelector("#recommendations").innerHTML = "";
  if (resetKeyWord) document.querySelector("#searchBar input").value = "";
}

function getTime(timeZone) {
  const options = {
    timeZone: timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const localeTime = new Date().toLocaleTimeString("en-US", options);
  return `Local time: ${localeTime}`;
}

document.querySelector("#search").addEventListener("click", () => search());
document.querySelector("#searchBar input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
document.querySelector("#clear").addEventListener("click", () => clearSearch());
