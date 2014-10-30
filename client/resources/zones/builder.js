/* global require, __dirname */
var fs = require('fs');
var xml2js = require('xml2js');
var ejs = require('ejs');

module.exports = function(destinationFile, callback) {

  var parser = new xml2js.Parser();
  
  parser.addListener('end', function(result) {
    var zones = [];
  
    var paths = result.svg.g[1].path;
    paths.forEach(function (path) {
      var id = path.$.id;
      var coordString = path.$.d;
      var coords = coordString.split(' ');
  
      var newCoord = [];
      var prevPoint = [0, 0];
      var mode;
      coords.forEach(function (coord) {
        var xy = coord.split(',');
        if ( xy.length !== 2 ) {
          mode = coord;
//          console.log(mode);
          return;
        }
        xy[0] = parseFloat(xy[0]);
        xy[1] = parseFloat(xy[1]);
  
        if ( mode === 'M' ) {
          prevPoint = xy;
          return;
        }
  
        var newPoint;
        if ( mode === 'L' ) {
          newPoint = [xy[0], xy[1]];
        } else {
          newPoint = [prevPoint[0] + xy[0], prevPoint[1] + xy[1]];
        }
        newCoord.push(newPoint);
        prevPoint = newPoint;
//        console.log(newPoint, xy);
      });
  
      zones.push({
        id: id,
        coords: newCoord
      });
    });
  
    var template = fs.readFileSync(__dirname + '/template.ejs', 'utf-8');
    var compiled = ejs.render(template, {
      zones: zones
    });
    //console.log('write to', destinationFile);  
    fs.writeFileSync(destinationFile, compiled);
    
    return callback();
  });
  
  //console.log('start parse', __dirname + '/map.svg');
  
  fs.readFile(__dirname + '/map.svg', { encoding: 'utf-8' }, function(err, data) {
  //console.log(data, err);
    parser.parseString(data);
  });

};  
