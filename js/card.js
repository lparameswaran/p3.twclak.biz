//
// Card
//
function Card(id) {
  var self = this;
  
  this.id     = id;
  this.suit   = Math.floor(self.id / 13);
  this.number = Math.floor(self.id % 13) + 1;
  this.down   = false;
  
  this.flip = function() {
    self.down = !self.down;
  }
}
