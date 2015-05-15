//import java.util.Arrays;
import java.util.Scanner;

public class NewMapColorer {

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


		int[] countryColors = new int[countries]; //0Red, 1Green, 2Blue, 3Yellow

		//Initializes all colors to 7. The colorConflict method knows not to factor in spaces that have not been touched (The 7s)
		//Essentially, 7 is "null"
		for(int i = 0; i < countries; i++){ 
			countryColors[i] = 7;
			//System.out.println(Arrays.toString(countryColors));

		}


		color(0, countryColors, adjTable);

		//System.out.println(Arrays.toString(countryColors));


		throw new IllegalArgumentException("IMPOSSIBLE MAP");

	}



	public static boolean colorConflict(boolean[][] adjTable, int[] countryColors){


		//printTable(adjTable);
		//System.out.println(Arrays.toString(countryColors));


		int length = countryColors.length;

		for (int i = 0; i < length; i++) {
			for (int x = 0; x < length; x++) {
				if (adjTable [i][x] == true && countryColors[i] != 7 && countryColors[x] != 7 && countryColors[i] == countryColors[x]) {
					//System.out.println("conflict found");

					return true;

				}
			}
		}
		return false;
	}


	public static void printTable(boolean [][] table) {

		for (int i = 0; i < table.length; i++) {

			for (int j = 0; j < table[i].length; j++) {
				System.out.print(table[i][j] ? '1' : '0');
			}
			System.out.println();
		}
	}



	public static void color(int n, int[] countryColors, boolean[][] adjTable){

		//System.out.println("n: " + n);

		//Looping through colors, not countries
		for(int i = 0; i <= 3; i++){ 
			countryColors[n] = i;

			//System.out.println(n + "  " + i);

			if (!colorConflict(adjTable, countryColors)) {
				if (n == countryColors.length - 1){
					print(countryColors);
					System.exit(0);

				} else {
					color(n + 1, countryColors, adjTable);

				}	
			} 
		}

		countryColors[n] = 7;
		//System.out.println("END n: " + n);

	}



	public static void print(int[] countryColors){

		System.out.println("\n" + "The most perfect color scheme for this map is: ");

		String[] colors = new String[countryColors.length];

		for (int i = 0; i < countryColors.length; i++) {
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

}

