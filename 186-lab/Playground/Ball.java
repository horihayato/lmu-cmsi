public class Ball {
    
    // private instance data;
    
    private double xCoord;
    private double yCoord;
    private double xMovement; //Pos # = West, Neg # = East
    private double yMovement; //Pos # = North, Neg # = South
    
    
	// public constructor:
	public Ball (String xCoord, String yCoord, String xMovement, String yMovement) {
        
        this.xCoord = Double.parseDouble(xCoord);
        this.yCoord = Double.parseDouble(yCoord);
        this.xMovement = Double.parseDouble(xMovement);
        this.yMovement = Double.parseDouble(yMovement);
	}
    
    
    
    
    public void moveBall() {
        
        this.xCoord = this.xCoord + this.xMovement;
        this.yCoord = this.yCoord + this.yMovement;
        
    }
    
    
    public String toString() {
        
        return "Ball: " + this.xCoord + "," + this.yCoord;
        
    }
    
    public String toStringVelocity() {
        
        return "Ball: " + this.xCoord + "," + this.yCoord + " has a velocity of " + xMovement +  " and " + yMovement;
        
    }
    
    public double getX() {
        
        return this.xCoord;
        
    }
    
    public double getY() {
        
        return this.yCoord;
        
    }

    
}
