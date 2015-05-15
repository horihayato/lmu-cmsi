public class Clock {

 	public static final int MIDNIGHT  = 0;
	public static final int NOON  = 12;
    
    
    // private instance data;
    
	private int hours;
	private int minutes;
    private double seconds;
    private double timeslice;
    private double totalSeconds;

    
    
	// public constructor:
	public Clock ( int hours, int minutes, double seconds, double timeslice, double totalSeconds) {
        
		if ( hours < 0 | hours > 12 | minutes < 0 | minutes > 59 | seconds < 0 | seconds > 59.9 | timeslice < 0 | timeslice > 1800.0) {
			throw new IllegalArgumentException();
            
		} else {
            
			this.hours = hours;
			this.minutes = minutes;
            this.seconds = seconds;
            this.timeslice = timeslice;
            this.totalSeconds = totalSeconds;

		}
	}
    
    
    
    public void tick() {
    
        this.totalSeconds = this.totalSeconds + this.timeslice;

    }
    
    
    
    
    public double getSeconds() {

       return this.totalSeconds;
    }

    
    

    public String toString() {
  
        double hours = this.totalSeconds / 3600;
        double leftover = this.totalSeconds % 3600;
        double minutes = leftover / 60;
        double seconds = leftover % 60;
        
        return (int) hours + ":" + (int) minutes + ":"  + (int) seconds;
        
    }

    
}
