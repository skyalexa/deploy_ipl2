function fetchAndVisualizeData() {
  const season = document.getElementById("seasons1").value;
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

function showData() {
  const season = document.getElementById("seasons1").value;
    fetch("/e?season="+season)
      .then(r => r.json())
      .then(response=> {visualizeExtraRunsConcededByEachTeam(response, season)});
} 

function visualizeExtraRunsConcededByEachTeam(extraRunsConcededByEachTeam, season){
  const seriesData = [];
  for (let year in extraRunsConcededByEachTeam) {
    seriesData.push([year, extraRunsConcededByEachTeam[year]]);
  }

  Highcharts.chart("container_userInput", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra Runs Conceded By Each Team in "+season
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData
      }
    ]
  });
}


function showData1() {
  const year = document.getElementById("seasons2").value;
    fetch("/e?year="+year)
      .then(r => r.json())
      .then(response=> {visualizeTopTenEconomicalBowlersPerYear(response, year)});
}

function visualizeTopTenEconomicalBowlersPerYear(topTenEconomicalBowlersPerYear, season){
  let seriesData = [];
  for (let year in topTenEconomicalBowlersPerYear) {
    seriesData.push([year, topTenEconomicalBowlersPerYear[year].economuRate]);
  }
  seriesData = seriesData.sort((a, b) => a[1] - b[1]).slice(0, 11);

  Highcharts.chart("container_userInput1", {
    chart: {
      type: "column"
    },
    title: {
      text: "Top Ten Economical Bowlers of "+season
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData
      }
    ]
  });
}
fetchAndVisualizeData();

function visualizeData(data) {
  
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam, data.mostWins);
  visualizeExtraRunsConcededByEachTeamIn2016(data.extraRunsConcededByEachTeamIn2016);
  visualizeTenEconomicalBowlersOf2015(data.tenEconomicalBowlersOf2015);
  visualizeTossWinningTeamPerYear(data.tossWinningTeamPerYear, data.mostWins);
  return;
}



function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("container1", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function visualizeMatchesWonByEachTeam(matchesWonByEachTeam, mostWins) {
  const teams = Object.keys(mostWins);
  const seasons=Object.keys(matchesWonByEachTeam);
  let seriesData=[];
  seriesData = teams.map(team => ({
    name: team,
    data: seasons.map(season => matchesWonByEachTeam[season][team] || 0)
  }));

Highcharts.chart("container2", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches won by each team over all the years of IPL"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Teams"
      },
        categories: seasons,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Wins'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData
  });
}


function visualizeExtraRunsConcededByEachTeamIn2016(extraRunsConcededByEachTeamIn2016) {
  const seriesData = [];
  for (let year in extraRunsConcededByEachTeamIn2016) {
    seriesData.push([year, extraRunsConcededByEachTeamIn2016[year]]);
  }



  Highcharts.chart("container3", {
    chart: {
      type: "column"
    },
    title: {
      text: "For the year 2016, extra runs conceded by each team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData
      }
    ]
  });
}



function visualizeTenEconomicalBowlersOf2015(tenEconomicalBowlersOf2015) {
  let seriesData = [];
  for (let year in tenEconomicalBowlersOf2015) {
    seriesData.push([year, tenEconomicalBowlersOf2015[year].economuRate]);
  }
  seriesData = seriesData.sort((a, b) => a[1] - b[1]).slice(0, 11);
  Highcharts.chart("container4", {
    chart: {
      type: "column"
    },
    title: {
      text: "For the year 2015, top 10 economical bowlers along with their economy rates"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData
      }
    ]
  });
}

function visualizeTossWinningTeamPerYear(tossWinningTeamPerYear, mostWins){
      const teams = Object.keys(mostWins);
  const seasons=Object.keys(tossWinningTeamPerYear);
  let seriesData=[];
  seriesData = teams.map(team => ({
    name: team,
    data: seasons.map(season => tossWinningTeamPerYear[season][team] || 0)
  }));

Highcharts.chart("container5", {
    chart: {
      type: "column"
    },
    title: {
      text: "Toss Winning team over all the years of IPL"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Years"
      },
        categories: seasons,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Toss Wins'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData
  });
}