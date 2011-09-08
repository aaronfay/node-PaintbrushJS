var Canvas = require('canvas')
  , canvas = new Canvas(1,1)
  , ctx = canvas.getContext('2d')
  , Image = Canvas.Image
  , paintbrush = require('../paintbrush')
  , img = new Image
  , fs = require('fs');

var out = fs.createWriteStream(__dirname + '/state.png')


process.on('uncaughtException', function (err) {
  console.log(new Date() + ' - Uncaught exception: ' + err);
});


img.onload = function(){

  c = canvas.getContext('2d');

  console.log('Start')
  paintbrush.process(img, 'filter-tint', canvas, c);
  //process = function(img, filterType, buffer, c)
  
  canvas.createPNGStream().on('data', function(chunk){
    out.write(chunk);
  });
  console.log('Finish')


};

img.src = __dirname + '/flower.jpg';

/*
	// you can add or remove lines here, depending on which filters you're using.
	addFilter("filter-blur", buffer, c);
	addFilter("filter-edges", buffer, c);
	addFilter("filter-emboss", buffer, c);
	addFilter("filter-greyscale", buffer, c);
	addFilter("filter-matrix", buffer, c);
	addFilter("filter-mosaic", buffer, c);
	addFilter("filter-noise", buffer, c);
	addFilter("filter-posterize", buffer, c); ** NOT WORKING
	addFilter("filter-sepia", buffer, c);
	addFilter("filter-sharpen", buffer, c);
	addFilter("filter-tint", buffer, c);

*/
