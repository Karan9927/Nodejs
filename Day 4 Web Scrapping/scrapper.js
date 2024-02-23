const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const productsData = [];

const fetchAllData = async () => {
  try {
    const response = await axios.get(
      "https://www.amazon.in/s?k=phone+8gb&crid=3A4P1G967ZMPT&sprefix=phone+8gb%2Caps%2C336&ref=nb_sb_noss_1",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );

    const $ = cheerio.load(response.data);
    const productCards = $("[data-asin]");

    productCards.each((index, element) => {
      const name = $(element)
        .find("span.a-size-medium.a-color-base.a-text-normal")
        .text();
      const price = $(element).find(".a-price-whole").text();
      const rating = $(element).find(".a-icon-alt").text();
      productsData.push({ Name: name, Price: price, Rating: rating });
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(productsData);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, "output.xlsx");

    console.log("XLSX file created successfully!");
  } catch (error) {
    console.log(error);
  }
};

fetchAllData();

// const axios = require("axios");
// const cheerio = require("cheerio");
// const xlsx = require("xlsx");

// const booksData = [
//   {
//     Name: "Set Me Free",
//   },
// ];

// const fetchAllData = async () => {
//   try {
//     const response = await axios.get("https://books.toscrape.com/", {
//       headers: {
//         "Content-Type": "text/html",
//       },
//     });
//     const $ = cheerio.load(response.data);
//     const books = $(".row")
//       .find("[title]")
//       .each((index, data) => {
//         const name = $(data).text();
//         booksData.push({ Name: name });
//       });

//     const workbook = xlsx.utils.book_new();

//     const worksheet = xlsx.utils.json_to_sheet(booksData);
//     // const sheet = xlsx.utils.aoa_to_sheet(sheetData);

//     xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//     xlsx.writeFile(workbook, "output.xlsx");

//     console.log("XLSX file created successfully!");
//   } catch (error) {
//     console.log(error);
//   }
// };
// fetchAllData();
