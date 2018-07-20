let fetch = require("node-fetch");
let _ = require('underscore');

// make this function generic and accept generator, measurement and date params
module.exports.getFromKapacitor = function(){
  return new Promise(function(resolve, reject){
    fetch('http://159.203.167.38:9092/kapacitor/v1/tasks/get-gaps/flow/gaps')
    .then((res) => res.json())
    .then(function(responseObj) {
      // let finalOutput be an array of objects which has all the gaps
      let finalOutput = []
      //series the first property of the responseObj which has 'n' json objects
      //{series : [{},{},{}]}
      _.each(responseObj.series, (series) => {

        // get each series
        // each series has name and tags attribute, the series which has gaps has name, tags, columns and values
        // check if the series object has values attribute if so there is atleast one gap then we will parse in
        if(series.values){
          // there could be one or more gaps iterate over series.values and get all gaps
          _.each(series.values, (gapData) => {
            // seriesGaps is a temp container to hold gaps which we push to finalOutput
            // gapdata is a array with 2 items [<time>, <elapsed>]
            let seriesGaps = {}
            seriesGaps['elapsed'] = gapData[1]
            seriesGaps['time'] = gapData[0]
            seriesGaps['generator'] = series.tags.generator
            seriesGaps['number'] = series.tags.number
            seriesGaps['site'] = series.tags.site
            seriesGaps['units'] = series.tags.units
            seriesGaps['location'] = series.tags.location
            finalOutput.push(seriesGaps)
          })
        }
      })
      resolve(finalOutput)
    })
  })

}