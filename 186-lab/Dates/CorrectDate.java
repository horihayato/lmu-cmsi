public class CorrectDate {

public static void main (String[] args) {

double m = Double.parseDouble(args[0]);
double d = Double.parseDouble(args[1]);
double y = Double.parseDouble(args[2]);
boolean answer;

//checks for 30 day months
     if ((m == 4 || m == 6 || m == 9 || m == 11) && d <= 30) {
     
     answer = true ;
     
//checks for feb. cases (reg month being = 28 days & checks for leap year which would be 29 days)
     } else if (m == 2 && d <= 28) {
     
        answer = true ;

     } else if (m == 2 && d <= 29) {
     
        if (y % 100 != 0 && y % 4 == 0) {
            answer = true;
        }
        else if (y % 4 == 0 && y % 100 == 0 && y % 400 == 0) {
            answer = true;
        }
        else {
            answer = false;
        }
     
//constrains all other dates to 1-12 month and 1-31 days
     } else if ((m >= 1 && m <= 12) && (d >= 1 && d <= 31)) {
     
     answer = true ;
     
     } else {
        
     answer = false ;
        
     }

         System.out.println (answer);
  }
}



/* feb (2) 28, apr (4) 30, jun (6) 30, sep (9) 30, nov (11) 30, all else to 31

determines if day is between 1 - 31, or special end number
accounts for leap years (on a leap year feb 29th is valid)
month is between 1-12

*/
