// Create Dino Constructor

function dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

function humanObj(humanName, humanFeet, humanInches, humanWeight, humanDiet) {
  this.humanName = humanName;
  this.humanFeet = humanFeet;
  this.humanInches = humanInches;
  this.humanWeight = humanWeight;
  this.humanDiet = humanDiet;
}

// Use IIFE to get human data from form

const button = document.getElementById("btn");

button.addEventListener("click", function () {
  (function getInputData() {
    const nameOfHuman = document.getElementById("name").value;
    const feetOfHuman = document.getElementById("feet").value;
    const inchesOfHuman = document.getElementById("inches").value;
    const weightOfHuman = document.getElementById("weight").value;
    const dietSelected = document.getElementById("diet").value;

    // Create Human Object

    const humanObj1 = new humanObj(
      nameOfHuman,
      feetOfHuman,
      inchesOfHuman,
      weightOfHuman,
      dietSelected
    );

    if (
      nameOfHuman !== "" &&
      feetOfHuman !== "" &&
      inchesOfHuman !== "" &&
      weightOfHuman !== "" &&
      dietSelected !== ""
    ) {
      document.getElementById("dino-compare").style.display = "none";

      // Create Dino Compare Method 1
      // NOTE: Weight in JSON file is in lbs, height in inches.

      fetch("dino.json")
        .then((response) => response.json())
        .then((data) => {
          const DinoObj = "";
          let allTogether = document.createDocumentFragment();

          // Get a random number and add that in the switch case created.
          function getRandomNumber(n) {
            return 1 + Math.floor(Math.random() * Math.floor(n));
          }

          const randomNumber = getRandomNumber(8);

          for (allData in data.Dinos) {
            // Create Dino Objects

            const DinoObj = new dino(
              data.Dinos[allData].species,
              data.Dinos[allData].weight,
              data.Dinos[allData].height,
              data.Dinos[allData].diet,
              data.Dinos[allData].where,
              data.Dinos[allData].when,
              data.Dinos[allData].fact
            );

            if (DinoObj.species === "Pigeon") {
              const containerHumanDiv = document.createElement("div");
              containerHumanDiv.className = "grid-item";

              const humanImg = document.createElement("img");

              const humanTitleName = document.createElement("h3");
              const humanFact = document.createElement("p");
              humanTitleName.innerHTML = DinoObj.species;
              humanImg.src = `images/pigeon.png`;
              humanFact.innerHTML = DinoObj.fact;
              containerHumanDiv.appendChild(humanTitleName);
              containerHumanDiv.appendChild(humanImg);
              containerHumanDiv.appendChild(humanFact);
              allTogether.appendChild(containerHumanDiv);

              continue;
            }

            const weightCom = {
              weightCompare(speciesName) {
                if (speciesName === DinoObj.species) {
                  if (DinoObj.weight > humanObj1.humanWeight) {
                    DinoObj.fact = `${DinoObj.species} is ${
                      DinoObj.weight - humanObj1.humanWeight
                    } lbs heavier than ${humanObj1.humanName}`;

                    return DinoObj.fact;
                  } else {
                    DinoObj.fact = `${DinoObj.species} is ${
                      humanObj1.humanWeight - DinoObj.weight
                    } lbs lighter than ${humanObj1.humanName}`;

                    return DinoObj.fact;
                  }
                }
              },
            };

            // Create Dino Compare Method 2
            // NOTE: Weight in JSON file is in lbs, height in inches.

            const heightCom = {
              heightCompare(speciesName) {
                const addFeetInches =
                  parseInt(humanObj1.humanFeet) * 12 +
                  parseInt(humanObj1.humanInches);

                if (speciesName === DinoObj.species) {
                  const newDinoHeight = parseInt(DinoObj.height);
                  if (newDinoHeight > addFeetInches) {
                    DinoObj.fact = `${DinoObj.species} is ${
                      newDinoHeight - addFeetInches
                    } inches taller than ${humanObj1.humanName}`;
                    return DinoObj.fact;
                  } else {
                    DinoObj.fact = `${DinoObj.species} is ${
                      addFeetInches - newDinoHeight
                    } inches smaller than ${humanObj1.humanName}`;
                    return DinoObj.fact;
                  }
                }
              },
            };

            // Create Dino Compare Method 3
            // NOTE: Weight in JSON file is in lbs, height in inches.

            const dietCom = {
              dietCompare(speciesName) {
                const newHumanDiet = humanObj1.humanDiet.toLowerCase();
                if (speciesName === DinoObj.species) {
                  if (newHumanDiet === DinoObj.diet) {
                    DinoObj.fact = `Both ${DinoObj.species} and ${humanObj1.humanName} are ${DinoObj.diet}`;
                    return DinoObj.fact;
                  } else {
                    DinoObj.fact = `${DinoObj.species} is ${DinoObj.diet} but ${humanObj1.humanName} is ${newHumanDiet}`;

                    return DinoObj.fact;
                  }
                }
              },
            };

            const dinosLived = {
              dinosLivedWhere(speciesName) {
                if (speciesName === DinoObj.species) {
                  const lived = `${DinoObj.species} lived in ${DinoObj.where}`;

                  return lived;
                }
              },
            };

            const dinosFound = {
              dinosWasFound(speciesName) {
                if (speciesName === DinoObj.species) {
                  const lived = `${DinoObj.species} was found in ${DinoObj.when}`;

                  return lived;
                }
              },
            };

            const dinosFact = {
              dinosFacts(speciesName) {
                if (speciesName === DinoObj.species) {
                  const lived = `${DinoObj.fact}`;

                  return lived;
                }
              },
            };

            let result = "";

            // Generate Tiles for each Dino in Array
            const containerDiv = document.createElement("div");
            containerDiv.className = "grid-item";
            const img = document.createElement("img");
            const fact = document.createElement("p");
            const titleName = document.createElement("h3");
            titleName.innerHTML = DinoObj.species;
            img.src = `images/${DinoObj.species.toLowerCase()}.png`;

            switch (randomNumber) {
              case 1:
                result = weightCom.weightCompare(DinoObj.species);
                break;
              case 2:
                result = heightCom.heightCompare(DinoObj.species);
                break;
              case 3:
                result = dietCom.dietCompare(DinoObj.species);
                break;
              case 4:
                result = dinosLived.dinosLivedWhere(DinoObj.species);
                break;
              case 5:
                result = dinosFound.dinosWasFound(DinoObj.species);
                break;
              default:
                result = dinosFact.dinosFacts(DinoObj.species);
                break;
            }
            fact.innerHTML = result;

            containerDiv.appendChild(titleName);
            containerDiv.appendChild(img);
            containerDiv.appendChild(fact);
            allTogether.appendChild(containerDiv);

            if (allData == 3) {
              const containerHumanDiv = document.createElement("div");
              containerHumanDiv.className = "grid-item";

              const humanImg = document.createElement("img");

              const humanTitleName = document.createElement("h3");
              const humanFact = document.createElement("p");
              humanTitleName.innerHTML = humanObj1.humanName;
              humanImg.src = `images/human.png`;

              containerHumanDiv.appendChild(humanTitleName);
              containerHumanDiv.appendChild(humanImg);
              containerHumanDiv.appendChild(humanFact);
              allTogether.appendChild(containerHumanDiv);
            }
          }
          const grid = document.getElementById("grid");
          grid.appendChild(allTogether);
        });
    }
  })();
});
