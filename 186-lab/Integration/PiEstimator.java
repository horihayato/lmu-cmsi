public class PiEstimator {

	public static void main ( String[] args ) {

		double darts = Double.parseDouble(args[0]);

		double xAxis = 2.0;
		double yAxis = 2.0;

		double centerX = xAxis / 2.0;
		double centerY = yAxis / 2.0;
		double radius = xAxis / 2.0;

		double dartX;
		double dartY;
		double insideCounter = 0;

		for(int i = 0; i < darts; i++){
			dartX = Math.random() * xAxis;
			dartY = Math.random() * yAxis;

			if (isIn(dartX, dartY, centerX, centerY, radius) == true){
				insideCounter++;

			}

		}

		double estimation = (insideCounter / darts) * 4.0;
		System.out.println("Estimation: " + estimation);

	}

	public static double distance(double xOne, double yOne, double xTwo, double yTwo) {
		double distance;

		double initial = (Math.pow((xTwo - xOne), 2.0)) + (Math.pow((yTwo - yOne) , 2.0));
		distance = Math.sqrt(initial);

		return distance;

	}

	public static Boolean isIn(double xOne, double yOne, double xCenter, double yCenter, double radius) {

		double distance = distance(xOne, yOne, xCenter, yCenter);

		return distance < radius;

	}

}