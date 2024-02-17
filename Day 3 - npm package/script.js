const readline = require("readline");
const binarySearch = require("./binarySearch");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter elements of the array (separated by spaces): ", (input) => {
  const arr = input.split(" ").map(Number);
  // console.log("Array:", arr);

  rl.question("Enter the element you want to find: ", (element) => {
    const elementToFind = Number(element);
    // console.log("Searching for element:", elementToFind);
    console.log(binarySearch(arr, elementToFind));

    rl.close();
  });
});
