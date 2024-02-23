const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const jobs = [];

const fetchAllData = async () => {
  try {
    const response = await axios.get(
      "https://realpython.github.io/fake-jobs/",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );

    const $ = cheerio.load(response.data);

    const productCards = $(".card-content").each((index, data) => {
      const container = $(data);
      const jobTitle = container.find(".title.is-5").text();

      const companyName = container.find(".subtitle.is-6.company").text();
      const location = container.find(".content .location").text();
      const postedDate = container.find("[datetime]").text();

      jobs.push({
        "Job Title": jobTitle,
        "Company Name": companyName,
        Location: location,
        "Posted Date": postedDate,
      });
    });

    const workbook = xlsx.utils.book_new();

    const workSheet = xlsx.utils.json_to_sheet(jobs);
    xlsx.utils.book_append_sheet(workbook, workSheet, "Sheet1");
    xlsx.writeFile(workbook, "jobData.xlsx");

    console.log("XLSX file created successfully!");
  } catch (error) {
    console.log(error);
  }
};

fetchAllData();
