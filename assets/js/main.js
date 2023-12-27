const calCalc = () => {
  const form = document.getElementById("calc-form");
  const result = document.querySelector(".result");
  const error = document.querySelector(".error");

  // Anzeigen einer Fehlermeldung bei falscher Eingabe in der Form
  let errorMessage = (msg) => {
    error.innerHTML = msg;
    error.style.display = "";
    return false;
  };

  // Anzeigen der Ergebnisse
  let showResult = (finalCalories) => {
    result.innerHTML = `Your optimal metabolic rate is: <span>${finalCalories.toFixed(
      2
    )}</span>calories a day.<br><a href="#" id="rs">Change Input</a>`;
    result.style.display = "";
    form.style.display = "none";
    error.style.display = "none";
  };

  // Resultat ausblenden und Form resetten
  let resetForm = (e) => {
    if (e.target.id === "rs") {
      e.preventDefault();
      result.style.display = "none";
      form.style.display = "";
      form.reset();
    }
  };

  // Funktion die Daten nach dem Submit ausliest
  let submitForm = (e) => {
    e.preventDefault();

    // Alter
    let age = Number(form.ageInput.value);
    if (isNaN(age) || age <= 0) {
      return errorMessage("You need to enter a valid age.");
    }

    // Größe
    let height = Number(form.heightInput.value);
    if (isNaN(height) || height <= 0) {
      return errorMessage("You need to enter a valid height.");
    }

    // Weight
    let weight = Number(form.weightInput.value);
    if (isNaN(weight) || weight <= 0) {
      return errorMessage("Please enter a valid weight.");
    }

    // Calories
    let calories = 0;
    if (form.genderInput.value == "female") {
      calories = 655.1 + 9.6 * weight + 1.8 * height - 4.7 * age;
    } else if (form.genderInput.value == "male") {
      calories = 66.47 + 13.7 * weight + 5 * height - 6.8 * age;
    } else {
      calories = 66.47 + 11 * weight + 2.5 * height - 5 * age;
    }

    // PAL Activity Faktor Formel

    let pal = 0;
    if (form.palInput.value == "little") {
      pal = 1.2;
    } else if (form.palInput.value == "light") {
      pal = 1.375;
    } else if (form.palInput.value == "moderate") {
      pal = 1.55;
    } else if (form.palInput.value == "hard") {
      pal = 1.725;
    } else {
      pal = 1.9;
    }

    // Finaler Kalorienverbraucht
    let finalCalories = calories * pal;

    // Ergebnis Anzeigen
    showResult(finalCalories);
  };

  // Beobachten der Interaktionen mit den Buttons
  form.addEventListener("submit", submitForm);
  result.addEventListener("click", resetForm, true);
};

calCalc();

// Remove Spline Logo

window.onload = function () {
  var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
  shadowRoot.querySelector("#logo").remove();
};
