//
// Main container class for all other classes
//
function Poker() {
  var self = this;

  this.player   = new Player(STARTING_CREDIT);
  this.deck     = new Deck();
  this.board    = new Board();
  this.rules    = new Rules();
  
  this.round = 1;
  this.cards = self.deck.popCards(5);

  this.run = function() {
    self.start();
  }
  this.start = function() {
    self.discardAll();
    self.board.showCredit(self.player.credit);
    self.board.showBet();
    self.board.showCards(self.cards);
    self.board.enableBet(true);
  }

  this.bet = function(bet) {
    if (0 == self.board.bet)
      self.discardAll();
    if ( self.player.canBet(bet) )
      if ( self.board.canBet(bet) )
        self.doBet(bet);
  }
  this.doBet = function(bet) {
    self.player.doBet(bet);
    self.board.showCredit(self.player.credit);
    self.board.doBet(bet);
    self.board.showBet();
    self.board.showPay();
    self.board.enableDeal(true);
  }  

  this.deal = function() {
    if (1 == self.round)
      self.firstRound()
    else
      self.secondRound();
  }
    
  this.firstRound = function() {
    self.board.enableBet(false);
    self.deck.shuffle();
    self.popFirstHand();
    self.round = 2;
    self.board.showMessage("Flip cards for replacing");
  }

  this.secondRound = function() {
    self.board.showMessage("");
    self.popSecondHand();
    var hand = self.rules.getHand(self.cards);
    self.pay(hand);
    self.board.unBet();
    self.board.showBet();
    self.board.showPay();
    self.prize(hand);
    self.round = 1;
    self.board.enableDeal(false);
    self.board.enableBet(true);
    self.checkCredit();
  }

  this.popFirstHand = function() {
    self.cards = self.deck.popCards(5);
    self.board.showCards(self.cards);
  }
  this.popSecondHand = function() {
    for (var i in self.cards)
      if (self.cards[i].down)
        self.cards[i] = self.deck.popCard();
    self.board.showCards(self.cards);
  }

  this.discard = function(position) {
    if (2 == self.round) {
      self.cards[position].flip();
      self.board.showCard(position, self.cards[position]);
    }
  }

  this.pay = function(hand) {
    if (hand){
      self.player.pay( self.board.getPay(hand) );
      self.board.showCredit(self.player.credit);
    }
  }
  this.prize = function(hand) {
    if (hand){
      self.board.hilitePrize(hand);
      self.board.showMessage( self.board.getHand(hand) + "!");
    }
  }
  this.checkCredit = function() {
    if (0 == self.player.credit){
      alert("Your credit has been restored");
      self.player.pay(STARTING_CREDIT);
      self.board.showCredit(self.player.credit);
    }
  }

  this.discardAll = function() {
    self.board.unhilitePrize();
    self.board.showPay();
    self.discardCards();
    self.board.showMessage("");
  }
  this.discardCards = function() {
    for (var i in self.cards)
      self.cards[i].down = true;
    self.board.showCards(self.cards);
  }

  this.onBetOne = function() {
    self.bet(1);
  }
  this.onBetMax = function() {
    self.bet(self.board.maxBet - self.board.bet);
  }
  this.onDeal = function() {
    self.deal();
  }
  this.onDiscard = function(card) {
    self.discard(card);
  }
}
