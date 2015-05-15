public class PlaygroundSim {
    
	public static void main ( String[] args ) {
        
        //TESTING VALIDITY
        for (int i = 0; i < args.length; i++) {
            if (args[i].compareTo("F") != 0 && args[i].compareTo("B") != 0) {
                try {
                    Double.parseDouble(args[i]);
                } catch (NumberFormatException ex) {
                    throw new IllegalArgumentException("Make sure that the args are points on a coordinate plane preceded by F or B. The last argument should indicate a slice of time in seconds");
                }
            } else {
            }
        }
        
        
        int lastArg = args.length - 1;
        double timeslice = 0;
        double totalSeconds = 0.0;
        int totalFlags = 0;
        int flagPlace = 0;
        int totalBalls = 0;
        int ballPlace = 0;
        
        String initialReport = "";
        String bySliceReport = "";
        String finalReport = "";
        
        for (int i = 0; i < lastArg; i++) {
            if (args[i].compareTo("F") == 0) {
                totalFlags = totalFlags + 1;
            } else if (args[i].compareTo("B") == 0) {
                totalBalls = totalBalls + 1;
            }
        }
        
        System.out.println ("\n" + totalBalls + " balls created" + " and " + totalFlags + " flags created" + "\n");
        
        
        
        Ball[] ballArray = new Ball[totalBalls];
        Flagpole[] flagArray = new Flagpole[totalFlags];
        
        
        //CREATING BALLS & FLAGS
        for (int i = 0; i < lastArg; i++) {
            if (args[i].compareTo("F") == 0) {
                int firstArg = i + 1;
                int secondArg = i + 2;
                
                Flagpole flagpole = new Flagpole (args[firstArg], args[secondArg]);
                flagArray[flagPlace] = flagpole;
                flagPlace = flagPlace + 1;
                
            } else if (args[i].compareTo("B") == 0) {
                int firstArg = i + 1;
                int secondArg = i + 2;
                int thirdArg = i + 3;
                int fourthArg = i + 4;
                
                Ball ball = new Ball (args[firstArg], args[secondArg], args[thirdArg], args[fourthArg]);
                ballArray[ballPlace] = ball;
                ballPlace = ballPlace + 1;
                
            }
        }
        
        
        //INITIALIZING VALUES
        
        //if the last argument belongs* to a ball or flag then timeslice = 60
        //*is within 4 args behind a B and 2 args behind a F (DID NOT DO)
        
        timeslice =  Double.parseDouble(args[lastArg]);
        
        Clock c = new Clock (0 ,0 ,0.0 ,timeslice, totalSeconds);
        
        totalSeconds = c.getSeconds();
        
        
        //Initial Report
        for (int i = 0; i < totalBalls; i++) {
            initialReport = initialReport +   ballArray[i].toStringVelocity() + "\n";
            
        }
        
        for (int i = 0; i < totalFlags; i++) {
            initialReport = initialReport +  flagArray[i].toString() + "\n";
            
        }
        
        System.out.println ("INITIAL REPORT:" + "\n" + initialReport);
        
        
        //RUNNING
        
        do {
            
            ballCollision(totalSeconds ,totalBalls, finalReport, ballArray);
            ballToFlagCollision(totalSeconds ,totalBalls, totalFlags, finalReport, ballArray, flagArray);
            noCollision(totalSeconds);
            
            //Kick Balls!
            if (ballCollision(totalSeconds ,totalBalls, finalReport, ballArray) == false && ballToFlagCollision(totalSeconds ,totalBalls, totalFlags, finalReport, ballArray, flagArray) == false && noCollision(totalSeconds) == false) {
                
                c.tick();
                totalSeconds = c.getSeconds();
                
                //Advance the balls
                for (int i = 0; i < totalBalls; i++) {
                    ballArray[i].moveBall();
                }
                
                //By Slice Report
                bySliceReport = bySliceReport + "SLICE REPORT: " + "\n";
                bySliceReport = bySliceReport + "At " + c.toString() + " all balls are: " + "\n";
                for (int i = 0; i < totalBalls; i++) {
                    bySliceReport = bySliceReport + ballArray[i].toString()+ "\n";
                }
                
                System.out.println ( "\n" + bySliceReport);
                bySliceReport = "";
                
            } else if (ballCollision(totalSeconds ,totalBalls, finalReport, ballArray) == true) {
                
                finalReport = finalReport + "FINAL REPORT: " + "\n";
                finalReport = finalReport + "A ball and another ball collided";
                finalReport = finalReport + " at " + c.toString()  + "\n" ;
                System.out.println (finalReport);
                
            } else if (ballToFlagCollision(totalSeconds ,totalBalls, totalFlags, finalReport, ballArray, flagArray) == true) {
                
                finalReport = finalReport + "FINAL REPORT: " + "\n";
                finalReport = finalReport + "A flag and a ball collided";
                finalReport = finalReport + " at " + c.toString()  + "\n" ;
                System.out.println (finalReport);
                
            }
            
        } while (ballCollision(totalSeconds ,totalBalls, finalReport, ballArray) == false && ballToFlagCollision(totalSeconds ,totalBalls, totalFlags, finalReport, ballArray, flagArray) == false && noCollision(totalSeconds) == false );
        
        
        noCollision(totalSeconds);
        
        if (noCollision(totalSeconds) == true) {
            totalSeconds = c.getSeconds();
            
            finalReport = finalReport + "FINAL REPORT: " + "\n";
            finalReport = finalReport + "At " + c.toString() + " NO COLLISION IS POSSIBLE. " + "\n";
            System.out.println (finalReport);
            
        }
        
    }
    
    
    
    
    
    public static Boolean ballCollision(double totalSeconds , double totalBalls, String finalReport, Ball[] ballArray ) {
        
        
        for (int i = 0; i < totalBalls; i++) {
            
            double compareToBallX = 0;
            double compareToBallY = 0;
            double checkerBallX = 0;
            double checkerBallY = 0;
            double distance = 0;
            
            compareToBallX = ballArray[i].getX();
            compareToBallY = ballArray[i].getY();
            
            for (int x = 0; x < totalBalls; x++) {
                
                checkerBallX = ballArray[x].getX();
                checkerBallY = ballArray[x].getY();
                double xDistance = checkerBallX - compareToBallX;
                double yDistance = checkerBallY - compareToBallY;
                
                distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
                
                if (i != x && x != i) {
                    
                    if (distance >= 0 && distance <= 1){
                        
                        return true;
                        
                    }
                    
                }
                
            }
            
        }
        
        return false;
        
    }
    
    
    
    
    
    
    
    
    
    public static Boolean ballToFlagCollision(double totalSeconds , double totalBalls, double totalFlags, String finalReport, Ball[] ballArray, Flagpole[] flagArray ) {
        
        
        for (int i = 0; i < totalFlags; i++) {
            
            double compareToFlagX = 0;
            double compareToFlagY = 0;
            double checkerBallX = 0;
            double checkerBallY = 0;
            double distance = 0;
            
            compareToFlagX = flagArray[i].getX();
            compareToFlagY = flagArray[i].getY();
            
            for (int x = 0; x < totalBalls; x++) {
                
                checkerBallX = ballArray[x].getX();
                checkerBallY = ballArray[x].getY();
                double xDistance = checkerBallX - compareToFlagX;
                double yDistance = checkerBallY - compareToFlagY;
                
                distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
                
                if (i != x && x != i) {
                    
                    if (distance >= 0 && distance <= 1){
                        
                        return true;
                        
                    }
                    
                }
                
            }
            
        }
        
        return false;
        
    }
    
    
    
    
    
    
    
    public static Boolean noCollision(double totalSeconds) {
        
        if (totalSeconds > 43200) {
            
            return true;
            
        } else {
            
            return false;
            
        }
 
    }
    
}