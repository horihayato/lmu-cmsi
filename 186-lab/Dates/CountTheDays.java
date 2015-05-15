public class CountTheDays {

public static void main (String[] args) {

int mOne = Integer.parseInt(args[0]);
int dOne = Integer.parseInt(args[1]);
int yOne = Integer.parseInt(args[2]);
int mTwo = Integer.parseInt(args[3]);
int dTwo = Integer.parseInt(args[4]);
int yTwo = Integer.parseInt(args[5]);

int totalDays = 0;
boolean answer;



//checks for 30 month days
     if ((mOne == 4 || mTwo==4 || mOne == 6 || mTwo==6 || mOne == 9 || mTwo==9  || mOne == 11 || mTwo==11) 
         && (dOne <= 30 || dTwo <= 30)) {
       
          totalDays = totalDays + (365 * (yTwo - yOne)) + (30 * (mTwo - mOne)) + (dTwo - dOne);
          
     
     
//checks for feb. cases (reg month being = 28 days & checks for leap year which would be 29 days)
     } else if ((mOne == 2 || mTwo== 2) && (dOne <= 28 || dTwo <= 28)) {
     
          totalDays = totalDays + (365 * (yTwo - yOne)) + (28 * (mTwo - mOne)) + (dTwo - dOne);

     } else if ((mOne == 2 || mTwo== 2) && (dOne <= 29 || dTwo <= 29)) {
     
        if ((yOne % 100 != 0 || yTwo % 100 != 0) && (yOne % 4 == 0 || yTwo % 4 == 0)) {
             totalDays = totalDays + (365 * (yTwo - yOne)) + (29 * (mTwo - mOne)) + (dTwo - dOne);
        }
        else if ((yOne % 100 != 0 || yTwo % 100 != 0) && (yOne % 4 == 0 || yTwo % 4 == 0) 
                  && (yOne % 400 == 0 || yTwo % 400 == 0)) {
             totalDays = totalDays + (365 * (yTwo - yOne)) + (29 * (mTwo - mOne)) + (dTwo - dOne);
        }
        else {
            answer = false;
        }
     


//constrains all other dates to 1-12 month and 1-31 days
     } else if ((mOne >= 1 || mTwo >= 1) && (mOne <= 12 || mTwo <= 12) && (dOne >= 1 || dTwo >= 1) 
                && (dOne <= 31 || dOne <= 31)) {
     
          totalDays = totalDays + (365 * (yTwo - yOne)) + (31 * (mTwo - mOne)) + (dTwo - dOne);
     
     } else {
        
     answer = false ;
        
     }
     
         if (yOne > yTwo) {
         totalDays = totalDays * -1;
         }

         if (answer = false) {
         System.out.println (answer);
         } else {
         System.out.println (totalDays);
         }
  }
}
