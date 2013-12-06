//
// Class to verify whether the player has won according to the specified rules
//
function Rules() {
  var self = this;
  var ACE_CARD = 1;                 // Ace is originally of value 1 but treated both as 1 and 14
  
  this.suits   = new Array(4);      // 4 different suits
  this.numbers = new Array(13 + 1); // A is both a high and a low card -- hence 13+1 cards
  
  // Verify if this is a winning hand
  this.getHand = function(cards) 
  {
    self.countCards(cards);
    return( self.hand() );
  }

  // count all open cards and suits --- useful to verify if we are a winner
  this.countCards = function(cards) {
    self.clear(); // Clear counts first
    for (var i in cards) { // for all the cards in the hand
      self.numbers[cards[i].number - 1] += 1; // Count the card values
      if (cards[i].number == ACE_CARD)        // ACE counts as high card also
        self.numbers[self.numbers.length - 1] += 1; // Count ACE as high card also
      self.suits[cards[i].suit] += 1; // Check and count the hands per the cards suit
    }
  }
  
  // Clear all counts before actual counting
  this.clear = function() {
    // Clear the counters containing the card values
    for (var i = 0; i < self.numbers.length; ++ i) 
      self.numbers[i] = 0;
    // Clear the counters containing the card suits
    for (var i = 0; i < self.suits.length; ++ i) 
      self.suits[i] = 0;
  }

  // This function defines the winning order from highest to lowest
  // This is the HEART of the POKER logic!
  this.hand = function() {
    if ( self.royalFlush()    ) return ROYAL_FLUSH_ID;
    if ( self.straightFlush() ) return STRAIGHT_FLUSH_ID;
    if ( self.fourOfAKind()   ) return FOUR_OF_A_KIND_ID;
    if ( self.fullHouse()     ) return FULL_HOUSE_ID;
    if ( self.flush()         ) return FLUSH_ID;
    if ( self.straight()      ) return STRAIGHT_ID;
    if ( self.threeOfAKind()  ) return THREE_OF_A_KIND_ID;
    if ( self.twoPair()       ) return TWO_PAIR_ID;
    if ( self.jacksOrBetter() ) return JACKS_OR_BETTER_ID;
    return NO_WIN_ID;
  }

  // If all cards are of same suit and 5 cards are in sequence, starting from 10
  this.royalFlush = function() {
    return( self.countSuits(5) && self.sequenceFrom(10) );
  }
  // If all cards are of same suit and 5 cards are in sequence
  this.straightFlush = function() {
    return( self.countSuits(5) && self.sequence() );
  }
  // If 4 of the cards are of the same value
  this.fourOfAKind = function() {
    return( self.countNumbers(4) );
  }
  // If 3 of the cards are of same value and the other 2 are of a different same value
  this.fullHouse = function() {
    return( self.countNumbers(3) && self.countNumbers(2) );
  }
  // If all 5 cards are of same suit
  this.flush = function() {
    return( self.countSuits(5) );
  }
  // If cards are in sequence (regardless of suit)
  this.straight = function() {
    return( self.sequence(5) );
  }
  // If 3 of the cards are of same value
  this.threeOfAKind = function() {
    return( self.countNumbers(3) );
  }
  // If there are 2 sets of cards of same value (i.e, 2 different repeating cards)
  this.twoPair = function() {
    return( self.countNumbers(2) == 2 );
  }
  // If there are a pair of cards which are of same value and their value is >= 11 (J)
  this.jacksOrBetter = function() {
    return( self.countNumbersFrom(11, 2) );
  }

  // Helper functions

  // count how many cards belong to a suit
  this.countSuits = function(group) {
    return( self.count(self.suits, 0, group) );
  }
  // count how many cards belong to a suit
  this.countNumbers = function(group) {
    return( self.countNumbersFrom(2, group) );
  }
  // count how many repeating cards are of same value, starting from a specific number
  this.countNumbersFrom = function(number, group) {
    return( self.count(self.numbers, number - 1, group) );
  }
  // count how many repeating cards are of same specified value, starting from a specified offset
  this.count = function(elements, offset, pattern) {
    var count = 0;
    for (var i = offset; i < elements.length; ++ i)
      if (elements[i] == pattern)
        ++ count;
    return(count);
  }
  // Is it a sequence starting from A or otherwise?
  this.sequence = function() {
    return( self.sequenceFrom(1) || self.sequenceFrom(2) );
  }
  // Is it a sequence starting from the specified number
  this.sequenceFrom = function(number) {
    var i = number - 1;
    // Increment till card count is nonzero
    while (i < self.numbers.length && self.numbers[i] == 0) i++;
    var start = i;
    i = start + 1;
    while (i < self.numbers.length && self.numbers[i] == 1) i++;
    var end = i - 1;
    return( (start >= number - 1) && ( (end - start + 1) == 5 ) );
  }
}
