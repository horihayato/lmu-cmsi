public class LeapYear {

public static void main (String[] args) {

long year = Long.parseLong(args[0]);
boolean answer;

 if (year % 100 != 0 && year % 4 == 0) {
            answer = true;
        }
        else if (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) {
            answer = true;
        }
        else {
            answer = false;
        }
         System.out.println (answer);
  }
}