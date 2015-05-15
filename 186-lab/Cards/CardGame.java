public class CardGame {

	public static void main ( String[] args ) {
		
        /*
		Deck deck = new Deck();
        Card card1 = new Card (5, 2);
        System.out.println(deck.toString());
         
         */
		
        Deck deck = new Deck();
       
		deck.shuffle();
        
		
		if ( ! legalDeck(deck) ) { System.out.println ("After shuffling, the deck is not legal."); } 
		else { System.out.println ( deck.toString() );
        
        }
         
        
        
        
	}
	


	/** Returns true iff there is one copy of each card in the given deck. */

	public static boolean legalDeck(Deck d) {

		for ( int suit = Card.SPADES; suit <= Card.CLUBS; suit++ ) {
			for ( int rank = Card.ACE; rank <= Card.KING; rank++ ) {
				if ( ! inDeck( new Card(rank,suit), d ) ) { return false; }
			}
		}
		
		return true;
	}


	/** Returns true if the specified card is somewhere in the specified deck. */

	public static boolean inDeck ( Card c, Deck d) {

		for ( int i = 0; i < 52; i++ ) {
			if ( d.cardAt(i).getRank() == c.getRank()
			 &&  d.cardAt(i).getSuit() == c.getSuit() ) {
						return true;
			}
		}
		return false;
	}

}