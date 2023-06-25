import fs from 'fs'
import path from 'path'
import csv from 'csv-parser';

const getGenderData = async (req, res) => {
    try {
        const results = [];
        
        const __dirname = path.resolve()
        const filePath = path.join(__dirname, 'students_adaptability_level_online_education.csv');
        console.log(filePath)
        fs.createReadStream(filePath)  // Replace 'data.csv' with your CSV file's name and path
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
            // console.log("results type is ",typeof(results))
            // console.log("results is ",results)
            const age_groups = ["21-25", "16-20", "11-15", "6-10", "26-30", "1-5"];

            const groupedData = {};

            age_groups.forEach(group => {
              console.log("group type is ",typeof(group))
              groupedData[group] = results.filter(obj => obj.Age === group);
            });

            console.log(groupedData);

            // console.log("male are ",males)
            res.json(groupedData);
          });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const getGenderDistribution = async (req, res) => {
    try {
      const results = [];
        
      const __dirname = path.resolve()
      const filePath = path.join(__dirname, 'students_adaptability_level_online_education.csv');
      console.log(filePath)
      fs.createReadStream(filePath)  // Replace 'data.csv' with your CSV file's name and path
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
    
          const men = results.filter((person,i)=>person.Gender == "Boy")
          const women = results.filter((person,i)=>person.Gender == "Girl")

          res.json({men,women});
        });

    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  export { getGenderData, getGenderDistribution };
