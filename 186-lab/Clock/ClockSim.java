public class ClockSim {
    
	public static void main ( String[] args ) {
        
        
        //TESTING VALIDITY
        
        if (args[1].contains("-") || args[0].contains("-")) {
                 throw new IllegalArgumentException("Make sure that the args are non-negative");
        } else {
               try {
                    Double.parseDouble(args[0]);
                    Double.parseDouble(args[1]);
                } catch (NumberFormatException ex) {
                    throw new IllegalArgumentException("Make sure that the args are numerical");
                }
        }
        
        
        while (args[1] == "") { //no timeslice = 1
               args[1] = "1";
            }
        
        
            double timeslice =  Double.parseDouble(args[1]);
            double enteredAngle =  Double.parseDouble(args[0]);
            double angle = 0.0;
            double backAngle = 360.0;
            double totalSeconds = 0.0;
            String reported = "";
     
            Clock c = new Clock (0 ,0 ,0.0 ,timeslice, totalSeconds);
        
        
        //INITIALIZING VALUES
            totalSeconds = c.getSeconds();
            toAngle(totalSeconds);
        
        
        
        
        
        //INITIALIZING ACCURACY
            double accuracy = (toAngle(timeslice) / 2);

        
        
        //RUNNING
            while (totalSeconds < 43200) {
                
                c.tick();
                totalSeconds = c.getSeconds();
                
                angle = toAngle(totalSeconds);
                
                backAngle = (360 - angle);
                
                
                if(angle == enteredAngle || backAngle == enteredAngle || closeCheck(angle, accuracy, enteredAngle) == true || closeCheck(backAngle, accuracy, enteredAngle) == true) {
                    
                    reported = reported + ( c.toString() ) + "\n";
                    
                } else {

             }
            }
        
        System.out.println(reported);
        
    }
    

    
    
    
    
    public static double toAngle(double totalSeconds) {
        
        int hours = (int) totalSeconds / 3600;
        double leftover = totalSeconds % 3600;
        double minutes = leftover / 60;
        double seconds = leftover % 60;
        
        double hAngle = 0.5 * ( (double) hours * 60 + minutes);
        double mAngle = 6 * minutes;
        
        return Math.abs(hAngle - mAngle);
    }
    
    
    
    
    
    
    public static Boolean closeCheck(double angleToCheck, double accuracy, double enteredAngle) {
        
        if (angleToCheck < enteredAngle && enteredAngle < angleToCheck + accuracy) {
            
            return true;
            
        } else if (angleToCheck > enteredAngle && enteredAngle > angleToCheck - accuracy) {
            
            return true;
            
        } else {
            
            return false;
            
        }
    }
}