public class Changemaker {

	public static void main ( String[] args ) {
		int cents = Integer.parseInt(args[0]);
		int coins = args.length - 1;

		//VALIDITY CHECKS
		if (cents < 0){
			System.out.println("\n" + "IMPROPER AMOUNT" + "\n"); 
			throw new NumberFormatException(" ");

		} else {

			for (int i = 1; i <= coins; i++) {
				int coin = Integer.parseInt(args[i]);

				if (coin <= 0){
					System.out.println("\n" + "IMPROPER DENOMINATION" + "\n"); 
					throw new NumberFormatException(" ");

				} else {

					for (int x = 1; x <= coins; x++) {
						int checkedCoin = Integer.parseInt(args[x]);

						if (checkedCoin == coin && x != i ) {
							System.out.println("\n" + "DUPLICATED DENOMINATION" + "\n"); 
							throw new NumberFormatException(" ");

						}
					}
				}

				try { 
					String firstCoin = args[1];

				} catch (ArrayIndexOutOfBoundsException e) { 
					System.out.println("\n" + "INSUFFICIENT DATA" + "\n"); 
					throw new ArrayIndexOutOfBoundsException(" ");

				} 
			}
		}



		//Table = [Row] [Column]
		Tuple [][] table = new Tuple [coins][cents + 1];

        //FILLING IN TABLE WITH ZEROED TUPLES
		for(int x = 0; x < coins; x++) {
			for (int i = 0; i <= cents; i++) {
				Tuple tuple = new Tuple (coins);
				table[x][i] = tuple;

			}
		}


		//EVALUATE FIRST ROW
		for (int i = 1; i <= cents; i++) {
			Tuple tuple = table[0][i];
			int coin = Integer.parseInt(args[1]);
			int amount = i;
			int remainder = amount % coin;
			int coinAmt= (int)Math.floor(amount / coin);

			if (remainder == 0) {
				tuple.setElement(0, coinAmt);
			}

		}


		//EVALUATE ALL OTHER ROWS
		for(int x = 1; x < coins; x++) {
			int coin = Integer.parseInt(args[x + 1]);

			for (int i = 1; i <= cents; i++) {
				Tuple tuple = table[x][i];
				int amount = i;
				int remainder = amount % coin;
				int coinAmt= (int)Math.floor(amount / coin);

				if (remainder == 0) { 
				//If the coin fits perfectly

					tuple.setElement(x, coinAmt);
					int optimalRow = optimalCheck(table, tuple, x, i);

					Tuple optimalTuple = table[optimalRow][i];


					tuple.clone(optimalTuple);

				} else if (remainder != 0 && amount < coin) { 
				//If the coin leaves a remainder but the value is less than the cents

					tuple.clone(table[x - 1][i]);

				} else if (remainder != 0 && amount > coin) { 
				//If the coin leaves a remainder but the value is greater than the cents

					tuple.setElement(x, coinAmt);
					Tuple remainderTuple = table[x][remainder];
					tuple.add(remainderTuple);

					int optimalRow = optimalCheck(table, tuple, x, i);
					Tuple optimalTuple = table[optimalRow][i];
					tuple.clone(optimalTuple);

				}
			}
		}

		Tuple finalAnswer = table[coins - 1][cents];

		String answer = "";
		answer = answer + finalAnswer.total() + " COINS: ";

		for (int i = 0; i < coins; i++) {
			answer = answer + finalAnswer.getElement(i) + " x " + args[i + 1] + " cent , ";

		}


		if (finalAnswer.total() == 0) {
			System.out.println("\n" + "IMPOSSIBLE" + "\n");

		} else {
			System.out.println("\n" + answer + "\n");

		}

	}


    //Checks every space above passed tuple in its column to see if there is a more optimal soln
    //Returns the row of the most optimal soln
	public static int optimalCheck(Tuple[][] table, Tuple tuple, int row, int column) {
		int total = tuple.total();
		int optimalRow = 0;

		for (int i = 0; i <= row; i++ ){
			int checkedTotal = table[i][column].total();

			//System.out.println("Tuple: " + table[i][column] + "has a Checked total: " + checkedTotal);	

			if (checkedTotal < total && checkedTotal > 0) {
				//System.out.println("here");
				optimalRow = optimalRow + i;
				break;
			} else if (checkedTotal == total && i == row) {
				optimalRow = optimalRow + row;
				break;
			}
		}

		return optimalRow;
	}


}