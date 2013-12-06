//
// Deck
//
function Deck() {
  var self = this;

  this.deck = new Array(52);
  this.top  = 0;

  for (var i = 0; i < self.deck.length; ++ i)
    self.deck[i] = i;

  this.shuffle = function() {
    for (var i in self.deck)
      self.swapCard(i, Math.floor(Math.random() * self.deck.length));
    self.top = 0;
  }
  this.swapCard = function(i, j) {
    var tmp = self.deck[i];
    self.deck[i] = self.deck[j];
    self.deck[j] = tmp;
  }

  this.popCards = function(requested) {
    var cards = new Array();
    for (var i = 0; i < requested; ++ i)
      cards[i] = self.popCard();
    return(cards);
  }
  this.popCard = function() {
    return( new Card( self.deck[self.top ++] ) );
  }
  
}
