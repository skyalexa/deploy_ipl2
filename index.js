const fs = require("fs");
const csv = require("csvtojson");
const express = require("express");
const path = require('path');

const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const mostWins = require("./ipl/mostWins");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunsConcededByEachTeamIn2016 = require("./ipl/extraRunsConcededByEachTeamIn2016");
const extraRunsConcededByEachTeam = require("./ipl/extraRunsConcededByEachTeam");
const tenEconomicalBowlersOf2015 = require("./ipl/tenEconomicalBowlersOf2015");
const topTenEconomicalBowlersPerYear = require("./ipl/topTenEconomicalBowlersPerYear");
const tossWinningTeamPerYear = require("./ipl/tossWinningTeamPerYear");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

const app = express();
const PORT = process.env.PORT || 2000

let extraRuns={}, topEconomicalBowlers={};

function main() {
    csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {   
      
        let result={};  
        
      result.matchesPlayedPerYear = matchesPlayedPerYear(matches);
      result.mostWins = mostWins(matches);
      result.matchesWonByEachTeam = matchesWonByEachTeam(matches);
      result.tossWinningTeamPerYear = tossWinningTeamPerYear(matches);
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          result.extraRunsConcededByEachTeamIn2016 = extraRunsConcededByEachTeamIn2016(deliveries, matches);
          result.extraRunsConcededByEachTeam = extraRunsConcededByEachTeam(deliveries, matches, result.matchesPlayedPerYear);
          result.topTenEconomicalBowlersPerYear = topTenEconomicalBowlersPerYear(deliveries, matches, result.matchesPlayedPerYear);
          result.tenEconomicalBowlersOf2015 = tenEconomicalBowlersOf2015(deliveries, matches);
          extraRuns=result.extraRunsConcededByEachTeam;
          topEconomicalBowlers=result.topTenEconomicalBowlersPerYear;
          saveMatchesPlayedPerYear(result);
          
          
        });
        
        
    });
}

function saveMatchesPlayedPerYear(result) {
  const jsonData = {
    matches:result.matches,
    deliveries:result.deliveries,
    matchesPlayedPerYear: result.matchesPlayedPerYear,
    mostWins: result.mostWins,
    matchesWonByEachTeam: result.matchesWonByEachTeam,
    extraRunsConcededByEachTeamIn2016: result.extraRunsConcededByEachTeamIn2016,
    tenEconomicalBowlersOf2015: result.tenEconomicalBowlersOf2015,
    tossWinningTeamPerYear: result.tossWinningTeamPerYear
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();

app.get('/e', function(req, res){
  if(req.query.season){
  const season=req.query.season;
  //var tryFetch = {[season]: extraRuns[season]};
  res.json(extraRuns[season])
  }else{
  const year=req.query.year;
  res.json(topEconomicalBowlers[year])
  }
})

app.get('/f', function(req, res){
  console.log(req.query.season);
  
})
app.use(express.static(path.join(__dirname,'./public')))

app.listen(PORT,()=>console.log(`listning at ${PORT}`))