//
// Board
//
function Board() {
  var self = this;
  
  this.hands   = new Array(ROYAL_FLUSH_ID,
                           STRAIGHT_FLUSH_ID,
                           FOUR_OF_A_KIND_ID,
                           FULL_HOUSE_ID,
                           FLUSH_ID,
                           STRAIGHT_ID,
                           THREE_OF_A_KIND_ID,
                           TWO_PAIR_ID,
                           JACKS_OR_BETTER_ID);

  this.maxBet  = MAXIMUM_BET_ALLOWED;
  this.bet     = 0;
  this.prevBet = 0;

  this.canBet = function(bet) {
    return( (self.bet + bet) <= self.maxBet );
  }
  this.doBet = function(bet) {
    self.prevBet = self.bet;
    self.bet += bet;
  }
  this.unBet = function(bet) {
    self.prevBet = self.bet;
    self.bet = 0;
  }

  this.getPay = function(hand) {
    return( Number( $( "#" + hand + "-" + String(self.bet) ).text() ) );
  }
  this.getHand = function(hand) {
    return( $("#" + hand).text() );
  }

  this.showCredit = function(credit) {
    $("#credit").text(String(credit));
  }
  this.showBet = function() {
    $("#bet").text(String(self.bet));
  }
  this.showMessage = function(message) {
    $("#div-message").text(message);
  }
  
  this.showCards = function(cards) {
    for (var i in cards)
      self.showCard(i, cards[i]);
  }
  this.showCard = function(position, card) {
    $( "#card" + String(position) ).attr("src",self.getCardImage(card));
  }
  this.getCardImage = function(card) {
    return( "images/" + ( card.down? "reverse": String(card.id) ) + ".png" );
  }

  this.showPay = function() {
    for (var i in self.hands) {
      self.unhilitePay(self.hands[i], self.prevBet);
      self.hilitePay(self.hands[i], self.bet);
    }
  } 
  this.unhilitePay = function(hand, bet) {
    self.setColorPay(hand, bet, "#6D929B");
  }
  this.hilitePay = function(hand, bet) {
    self.setColorPay(hand, bet, "#FFFFFF");
  }
  this.setColorPay = function(hand, bet, color) {
    if (bet)
      $( "#" + hand + "-" + String(bet) ).css('color', color);
  }

  this.hilitePrize = function(hand) {
    self.setColorPrize(hand, "#FFFFFF");
    self.setColorPay(hand, self.prevBet, "#FFFFFF");
  }
  this.unhilitePrize = function() {
    for (var i in self.hands)
      self.setColorPrize(self.hands[i], "#6D929B");
  }
  this.setColorPrize = function(hand, color) {
    $("#" + hand).css('color', color);
  }

  this.enableDeal = function(state) {
    $("#dealButton").prop('disabled', !state);
  }
  this.enableBet = function(state) {
    $("#oneButton").prop('disabled', !state);
    $("#maxButton").prop('disabled', !state);
  }
}
