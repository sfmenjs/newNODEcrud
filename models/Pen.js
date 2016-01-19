var uuid = require('uuid');

var PenModule = {
  collection: [],
  findPen: function(id, cb) {
    for(var i = 0; i < this.collection.length; i++) {
      if(this.collection[i].id === id) {
        return cb(null, this.collection[i]);
      }
    } //end of for loop over the pen collection
    cb({err: "Could not find a pen with that id."});
  },
  create: function(penObj, cb) {
    if(!penObj.img || !penObj.name || !penObj.color) {
      return cb({err: "Please include all required fields."});
    }
    var pen = new Pen(penObj.img, penObj.name, penObj.color);
    this.collection.push(pen);
    cb(null,pen);
  },
  update: function(pen, cb) {
    for(var i = 0; i < this.collection.length; i++) {
      if(this.collection[i].id === pen.id) {
        this.collection[i] = pen;
        return cb(null, pen);
      }
    } //end of for loop over the pen collection
    cb({err: "Could not find a pen with that id."});
  },
  remove: function(id, cb) {
    for(var i = 0; i < this.collection.length; i++) {
      if(this.collection[i].id === id) {
        this.collection.splice(i, 1);
        return cb(null, {message: 'success!'});
      }
    } //end for loop over collection array
    //if nothing is found in the array that matches the id
    cb({err: "Could not find a pen with that id."});
  }
};

function Pen(img, name, color) {
  this.id = uuid.v4();
  this.img = img;
  this.name = name;
  this.color = color;
}

var bic = new Pen("http://ecx.images-amazon.com/images/I/51WTUBXONvL._SL1179_.jpg", "Bic", "Blue");
var ballPoint = new Pen("http://s7d1.scene7.com/is/image/officedepot/120675_p?$OD-Dynamic$&wid=250&hei=250", "Ballpoint", "Black");
var glitter = new Pen('http://ecx.images-amazon.com/images/I/41ErUR2aeAL._SY300_.jpg', 'GLITTER!!!', 'Rainbow');
PenModule.collection.push(bic, ballPoint, glitter);

module.exports = PenModule;
