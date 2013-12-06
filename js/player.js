//
// Player
//
function Player(credit) {
  var self = this;
  
  this.credit = credit;
  
  this.canBet = function(bet) {
    return( self.credit >= bet );
  }
  this.doBet = function(bet) {
    self.credit -= bet;
  }
  this.pay = function(pay) {
    self.credit += pay;
  }
}
