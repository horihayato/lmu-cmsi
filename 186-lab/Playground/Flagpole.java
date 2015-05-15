public class Flagpole {
        
    // private instance data;

    private double xCoord;
    private double yCoord;
    
    
	// public constructor:
	public Flagpole ( String xCoord, String yCoord) {
        
        this.xCoord = Double.parseDouble(xCoord);
        this.yCoord = Double.parseDouble(yCoord);
	}

    
    public String toString() {
        
        return "Flagpole: " + this.xCoord + "," + this.yCoord;
        
    }
    
    public double getX() {
        
        return this.xCoord;
        
    }
    
    public double getY() {
        
        return this.yCoord;
        
    }
    
    
}
