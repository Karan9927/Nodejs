const binarySearch = (arr, elementToFind) => {
  arr = arr.sort();
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === elementToFind) {
      return mid;
    } else if (arr[mid] < elementToFind) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

module.exports = binarySearch;
