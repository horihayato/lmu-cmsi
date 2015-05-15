public class RiemannIntegrator {

	public static void main ( String[] args ) {

		if (args[0].compareTo("poly") != 0){
			  throw new IllegalArgumentException("Program can only take polynomials, please enter poly as first argument");
		}

		int argsLength = args.length;
		int polyLength = argsLength - 3;

		Double[] poly = new Double[polyLength]; 

		//File polynomial numbers into poly array
		int x = 1;
		for (int i = 0; i < polyLength; i++){
			poly[i] = Double.parseDouble(args[x]);
			x++;
		}

		double leftBound = Double.parseDouble(args[argsLength - 2]);
		double rightBound = Double.parseDouble(args[argsLength - 1]);
		double area = (rightBound - leftBound) * (polyCalc(poly, (midX(rightBound, leftBound))));
		double lastArea = 0;
		double slices = 2;


		while (Math.abs(lastArea - area) > .01) { 
			double sliceWidth =  Math.abs((rightBound - leftBound) / slices);
			double newLeftBound = leftBound;
		    double newRightBound = leftBound + sliceWidth;
			lastArea = area;
			area = 0;

			for(int i = (int) slices; i > 0; i-- ) {
				area = area + ((newRightBound - newLeftBound) * (polyCalc(poly, (midX(newRightBound, newLeftBound)))));

				newLeftBound = newLeftBound + sliceWidth;
				newRightBound = newRightBound + sliceWidth;

			}
			slices = Math.pow(slices, 2.0);

		}
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


	public static double midX(Double rightBound, Double leftBound) {
		return (leftBound + rightBound) / 2;

	}

}
