const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");

const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");

const output = document.getElementById("output");

// BUTTON A: Find Largest
buttonA.onclick = function () {
  const value1 = Number(input1.value);
  const value2 = Number(input2.value);
  const value3 = Number(input3.value);

  if (input1.value === "" || input2.value === "" || input3.value === "") {
    output.innerText = "All fields must be filled.";
    output.className = "outputBox error";
  } else {

    if (value1 >= value2) {
      if (value1 >= value3) {
        output.innerText = "Input 1 is the largest.";
      } else {
        output.innerText = "Input 3 is the largest.";
      }
    } else {
      if (value2 >= value3) {
        output.innerText = "Input 2 is the largest.";
      } else {
        output.innerText = "Input 3 is the largest.";
      }
    }

    output.className = "outputBox success";
  }
};


// BUTTON B: Check Equality
buttonB.onclick = function () {
  const value1 = input1.value;
  const value2 = input2.value;
  const value3 = input3.value;

  if (value1 === "" || value2 === "" || value3 === "") {
    output.innerText = "Please enter all three numbers.";
    output.className = "outputBox error";
  } else {
    if (value1 === value2 && value2 === value3) {
      output.innerText = "All three values are equal.";
    } else {
      output.innerText = "Values are not all equal.";
    }
    output.className = "outputBox success";
  }
};
