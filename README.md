# LabelPoint
Javascript class to find the optimum placement of a label inside an irregular polygon using Poles of Inaccessibility algorithm. Handy if you're working with maps.

# How It Works
The Poles of Inaccessibility algorithm works by finding a point inside the polygon that is furthest from the perimeter.

<img src="https://raw.githubusercontent.com/GeorgeGardiner/LabelPoint/master/readme-imgs/poles-algo.png" />

# Usage
Just pass in an array of points and a desired precision (defaults to 1 - pixel perfect. Increase for speed at reduced accuracy)
```
var points = [ {x:0, y:0}, {x:5, y:0}, {x:5, y:5}, {x:0, y:5} ];
var precision = 1;
var labelPoint = LabelPoint.find(points, precision);
console.log(labelPoint.x, labelPoint.y);
```

Originally created for Ticketlights' seating map editor. Great partner for the excellent hull.js from https://github.com/AndriiHeonia/hull

<img src="https://raw.githubusercontent.com/GeorgeGardiner/LabelPoint/master/readme-imgs/in-usage.png" />

George Gardiner @ http://www.commonmode.co.uk
