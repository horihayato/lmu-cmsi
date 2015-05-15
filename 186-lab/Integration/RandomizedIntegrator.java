public class RandomizedIntegrator {

	public static void main ( String[] args ) {

		if (args[0].compareTo("poly") != 0){
			 throw new IllegalArgumentException("Program can only take polynomials, please enter poly as first argument");
		}

		int argsLength = args.length;
		int polyLength = argsLength - 3;
		double startY = Double.parseDouble(args[argsLength - 3]);
		double leftBound = Double.parseDouble(args[argsLength - 2]);
		double rightBound = Double.parseDouble(args[argsLength - 1]);
		double boxWidth = rightBound - leftBound;

		Double[] poly = new Double[polyLength]; 

		//File polynomial numbers into poly array
		int b = 1;
		for (int i = 0; i < polyLength; i++){
			poly[i] = Double.parseDouble(args[b]);
			b++;
		}

		//Top Line Finder
		//takes 100 random f(x)s files them into an array, then selects the largest
		Double[] possibleTops = new Double[100];

		for (int i = 0; i <= 99; i++){
			double x = leftBound + (Math.random() * ((rightBound - leftBound) + 1));
			possibleTops[i] = polyCalc(poly , x);			

		} 

		java.util.Arrays.sort(possibleTops);
		double yTop = possibleTops[99];

		//Dart Scaler
		double darts = 0;
		if (boxWidth > (yTop / 50)){
			darts = 70.0 * yTop;

		} else {
			darts = 3000.0 * boxWidth;

		}

		double dartX;
		double dartY;
		double insideCounter = 0.0;

		for(int i = 0; i < darts; i++){
			dartX = leftBound + (int)(Math.random() * ((rightBound - leftBound) + 1));
			dartY = startY + (int)(Math.random() * ((yTop - startY) + 1));

			if (isIn(dartX, dartY, poly) == true){
				insideCounter++;

			}
		}

		double dartsInFraction = insideCounter / darts;
		double area = dartsInFraction * (boxWidth * yTop);
		System.out.println("The integral is: " + area);

	}


	public static double polyCalc(Double[] f, Double x) {
		int length = f.length;
		int lastArg = length - 1;
		int spaceCount = 0;
		double answer = 0;

		for (int i = lastArg; i >= 0; i--){
			double stage = f[spaceCount] * (Math.pow(x, i));
			answer = answer + stage;
			spaceCount++;

		}
		return answer;
	}



	public static Boolean isIn(double xOne, double yOne, Double[] f) {
		double compareY = polyCalc(f, xOne);
		return Math.abs(compareY) > Math.abs(yOne);

	}

}

