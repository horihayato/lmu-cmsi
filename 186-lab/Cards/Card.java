public class Card {

	// public constants:
	
	public static final int ACE		= 1;
	public static final int DEUCE	= 2;
	public static final int TWO		= 2;
	public static final int THREE	= 3;
	public static final int FOUR	= 4;
	public static final int FIVE	= 5;
	public static final int SIX		= 6;
	public static final int SEVEN	= 7;
	public static final int EIGHT	= 8;
	public static final int NINE	= 9;
	public static final int TEN		= 10;
	public static final int JACK	= 11;
	public static final int KNAVE	= 11;
	public static final int QUEEN	= 12;
	public static final int KING	= 13;
	
	public static final int SPADES	= 1;
	public static final int HEARTS	= 2;
	public static final int DIAMONDS = 3;
	public static final int CLUBS	= 4;

	// private instance data;

	private int rank;
	private int suit;

	// public constructor:
	public Card ( int rank, int suit ) {
		if ( rank < Card.ACE | rank > Card.KING | suit < Card.SPADES | suit > Card.CLUBS ) {
			throw new IllegalArgumentException();
		} else {
			this.rank = rank;
			this.suit = suit;
		}
	}
	
	/** Returns this card's suit. */
	public int getSuit() {
		return this.suit;
	}

	/** Returns this card's rank. */
	public int getRank() {
		return this.rank;
	}	
	
	/** Returns a stringy version of this card. */
	public String toString() {
		      
        String s = "";
        
        switch (this.rank) {
        
            case ACE : s = "Ace"; break; // 12 cases
            case DEUCE: 
                 TWO: s = "Two"; break;
            case THREE : s = "Three"; break;
            case FOUR : s = "Four"; break;
            case FIVE : s = "Five"; break;
            case SIX : s = "Six"; break;
            case SEVEN : s = "Seven"; break;
            case EIGHT : s = "Eight"; break;
            case NINE : s = "Nine"; break;
            case TEN : s = "Ten"; break;
            case JACK :
                 KNAVE: s = "Jack"; break;
            case QUEEN : s = "Queen"; break;
            case KING : s = "King"; break;
        
        }
        
        switch (this.suit) {
                 
            case SPADES : s = s + " of Spades"; break; // 4 cases
            case HEARTS : s = s + " of Hearts"; break;
            case DIAMONDS : s = s + " of Diamonds"; break;
            case CLUBS : s = s + " of Clubs"; break;

                
        }
        
        return s;
        
	}


}