public class Deck {

	// private instance data;
	private Card[] cards;

	// public constructor:
	public Deck() {
		this.cards = new Card[52];
		int i = 0;
		for ( int suit = Card.SPADES; suit <= Card.CLUBS; suit++ ) {
			for ( int rank = Card.ACE; rank <= Card.KING; rank++ ) {
				this.cards[i] = new Card(rank,suit);
				i++;
			}
		}
	}
	
	/** Returns a copy of the card at the specified index in this deck. */
	public Card cardAt(int index) {
		if ( index < 0 | index > 51 ) {
			throw new IllegalArgumentException();
		} else {
			return new Card( this.cards[index].getRank(),this.cards[index].getSuit() ); 
		}
	}
	
	/** Shuffles this deck. */
	public void shuffle() {
        
        for(int i= 51; i > 0; i--){
            
            int k = (int) Math.floor(Math.random()* (i + 1)); // reminder: add 1
            
            // System.out.println (k);
            
            Card x = this.cards[i];
            this.cards[i] = this.cards[k];
            this.cards[k] = x;
            
        }
        
	}
	
	/** Returns a stringy version of this deck. */
	public String toString() {
        
                String s = "";
        for (int i =0; i< 52; i++) {
            
            s = s + cards[i].toString() + "\n";
            
            
        }
        
		        return s;
	}
  
    
    
}