import java.util.Scanner;
//import java.util.Arrays;

public class MapColorer2 {

	public static void main ( String[] args ) {

		Scanner sc = new Scanner(System.in);

		int countries = sc.nextInt();
		int adjacencies = args.length - 1;
		boolean[][] adjTable = new boolean[countries][countries];

		//Fills in adjacencies
		while (sc.hasNextInt()) {
			int first = sc.nextInt();
			int second = sc.nextInt();

			adjTable [first][second] = true;
			adjTable [second][first] = true;
		}

		//Fills in falses
		for (int i = 0; i < countries; i++) {

			for (int x = 0; x < countries; x++) {
				boolean box = adjTable[i][x];

				if(box != true) {
					box = false;

				}
			}
		}

/*
		//PRINTS ADJ TABLE
		for (int i = 0; i < countries; i++) {
			for (int x = 0; x < countries; x++) {
				System.out.println("Space: " + i + " , " + x + " : " + adjTable[i][x] + " // Country: " + (i + 1) + " and " + (x + 1));
			}
		}

*/


		int[] countryColors = new int[countries]; //0Red, 1Green, 2Blue, 3Yellow

		//Initializes all colors to 7. The colorConflict method knows not to factor in spaces that have not been touched (The 7s)
		//Essentially, 7 is "null"
		for(int i = 0; i < countries; i++){ 
			countryColors[i] = 7;
		}



		for(int i = 0; i < countries; i++){ 
			countryColors[i] = 0;

			while (colorConflict(adjTable, countryColors)){

				if (countryColors[i] >= 3){
					int flipBack = flipBack(countryColors);
					countryColors[flipBack]++;

					//make all countries after flip back country, 7
					for(int x = flipBack + 1; x < countries; x++){ 
						//System.out.println(x);
						countryColors[x] = 7;
					}

					i = flipBack;
					break;
				}

				countryColors[i]++;
				//System.out.println("here");
				//System.out.println(i + "  " + countryColors[i]);
			}

		}

		if (countryColors[0] > 3 ) {
			throw new IllegalArgumentException("IMPOSSIBLE MAP");
		}

		System.out.println("\n" + "The most perfect color scheme for this map is: ");

		String[] colors = new String[countries];

		for (int i = 0; i < countries; i++) {
			int colorNum = countryColors[i];
			String color = "";

			switch (colorNum) {
				case 0:  color = "Red";
				break;
				case 1:  color = "Green";
				break;
				case 2:  color = "Blue";
				break;
				case 3:  color = "Yellow";
				break;
			}

			colors[i] = color;

			System.out.println("Country " + i + " is colored: " + colors[i]);

		}

	}


	public static boolean colorConflict(boolean[][] adjTable, int[] countryColors){

		int length = countryColors.length;

		for (int i = 0; i < length; i++) {
			for (int x = 0; x < length; x++) {
				if (adjTable [i][x] == true && countryColors[i] != 7 && countryColors[x] != 7 && countryColors[i] == countryColors[x]) {
					//System.out.println(Arrays.toString(countryColors));
					//System.out.println("conflict" + x + "  " + i + "\n");

					return true;

				}
			}
		}
		return false;
	}


	//finds the last non yellow country & returns country number
	public static int flipBack(int[] countryColors){

		int length = countryColors.length;
		int flipBack = 0;

		loop:
		for (int i = length - 1; i >= 0; i--) {
			//System.out.println("here  " + i);

			if (countryColors[i] < 3) {
				flipBack = i;
				break loop;

			}
		}

		//System.out.println("flipback  " + flipBack);
		return flipBack;

	}


}

