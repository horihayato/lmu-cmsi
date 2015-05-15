public class Ginormint {
    
    private String s;

    public static void main ( String[] args ) {
        
        int firstArgLength = args[0].length();
        int secondArgLength = args[2].length();
        int[] firstArg = new int[firstArgLength];
        int[] secondArg = new int[secondArgLength];
        String answer = "";
        
        //VALIDITY CHECKS
        
        //CREATE ARGS
        Ginormint enteredOne = new Ginormint (args[0], firstArg, firstArgLength);
        Ginormint enteredTwo = new Ginormint (args[2], secondArg, secondArgLength);
        
        //DETERMINE CALCULATION
        if (args[1].compareTo("sum") == 0) {
            answer = sum(firstArgLength, secondArgLength, firstArg, secondArg).getString();
            System.out.println("\n" + "The sum is: " + answer + "\n");
            
        } else if (args[1].compareTo("difference") == 0) {
            answer = difference(firstArgLength, secondArgLength, firstArg, secondArg).getString();
             System.out.println("\n" + "The difference is: " + answer + "\n");
            
        } else if (args[1].compareTo("product") == 0) {
            answer = product(firstArgLength, secondArgLength, firstArg, secondArg).getString();
             System.out.println("\n" + "The product is: " + answer + "\n");
            
        }
        
    }
    
    
    
    
    
    public Ginormint (String s, int[] ginoArray, int length) {
        
        this.s = s;
        
        int lastArg = length - 1;
        
        for (int t = lastArg; t >= 0; t--) {
            String num = Character.toString(s.charAt(t));
            String sign = Character.toString(s.charAt(0));
            
            ginoArray[t] = Integer.parseInt(num);
            
            
        }

    }
    
    
    
    
    
    public String getString() {
        
        return this.s;
    }

    
    
    
    
    
    public static String ArraytoString(int[] ginoArray) {
        
        int length = ginoArray.length;
        
        String s = "";
        for (int i = 0; i < length; i++) {
            s = s + ginoArray[i];
            
        }
        return s;
    }
    
    
    
    
    
    
    
    public static Ginormint sum (int firstArrayLength, int secondArrayLength, int[] arrayOne, int[] arrayTwo) {
        
        int ginoAnswerLength = (firstArrayLength > secondArrayLength) ? firstArrayLength : secondArrayLength;
        int firstArrayLast = firstArrayLength - 1;
        int secondArrayLast = secondArrayLength - 1;
        String answer = "";
        
        // IF FIRST ARG IS LARGER
        if (ginoAnswerLength == firstArrayLength) {
            
            int[] ginoTop = new int[firstArrayLength];
            int[] ginoBottom = new int[firstArrayLength];
            int[] ginoAnswer = new int[firstArrayLength];
            int lengthDifference = firstArrayLength - secondArrayLength;
            int lowSpace = secondArrayLast;
            
            //ORDER INTO TOP AND BOTTOM ARRAYS
            for (int t = firstArrayLast; t >= 0 ; t--) {
                ginoTop[t] = arrayOne[t];
                
                //Accounts for numbers (x100) replaces them with 0's for placekeeping
                if (lowSpace < 0) {
                    ginoBottom[t] = 0;
                    
                } else {
                    ginoBottom[t] = arrayTwo[lowSpace];
                    lowSpace--;
                    
                }
            }
            
            // PERFORM CALCULATIONS
            for (int i = firstArrayLast; i >= 0; i--) {
                int spaceSum = 0;
                int finalSpaceSum = 0;
                spaceSum = ginoTop[i] + ginoBottom[i];
                
                //CARRYS
                //Don't initiate carry if the number is the last number
                if (i < lengthDifference && spaceSum >= 9) {
                    finalSpaceSum = spaceSum;
                    
                } else if (spaceSum >= 9) {
                    ginoTop[i - 1] = ginoTop[i - 1] + 1;
                    finalSpaceSum = spaceSum % 10;
                    
                } else {
                    finalSpaceSum = spaceSum;
                    
                }
                ginoAnswer[i] = finalSpaceSum;
                
            }
            answer = answer + ArraytoString(ginoAnswer);
            
            
            // IF SECOND ARG IS LARGER
        }  else if (ginoAnswerLength == secondArrayLength) {
            
            int[] ginoTop = new int[secondArrayLength];
            int[] ginoBottom = new int[secondArrayLength];
            int[] ginoAnswer = new int[secondArrayLength];
            int lengthDifference = secondArrayLength - firstArrayLength;
            int lowSpace = firstArrayLast;
            
            //ORDER INTO TOP AND BOTTOM ARRAYS
            for (int t = secondArrayLast; t >= 0 ; t--) {
                ginoTop[t] = arrayTwo[t];
                
                //Accounts for numbers (x100) replaces them with 0's for placekeeping
                if (lowSpace < 0) {
                    ginoBottom[t] = 0;
                    
                } else {
                    ginoBottom[t] = arrayOne[lowSpace];
                    lowSpace--;
                    
                }
            }
            
            // PERFORM CALCULATIONS
            for (int i = secondArrayLast; i >= 0; i--) {
                int spaceSum = 0;
                int finalSpaceSum = 0;
                spaceSum = ginoTop[i] + ginoBottom[i];
                
                //CARRYS
                //Don't initiate carry if the number is the last number
                if (i < lengthDifference && spaceSum >= 9) {
                    finalSpaceSum = spaceSum;
                    
                } else if (spaceSum >= 9) {
                    ginoTop[i - 1] = ginoTop[i - 1] + 1;
                    finalSpaceSum = spaceSum % 10;
                    
                } else {
                    finalSpaceSum = spaceSum;
                    
                }
                ginoAnswer[i] = finalSpaceSum;
                
            }
            answer = answer + ArraytoString(ginoAnswer);
            
        }
        
        int[] finalAnswerArray = new int[answer.length()];
        Ginormint finalAnswer = new Ginormint (answer, finalAnswerArray, answer.length());
        return finalAnswer;
    }
    
    
    
    
    
    
    
    
    
    
    
    public static Ginormint difference (int firstArrayLength, int secondArrayLength, int[] arrayOne, int[] arrayTwo) {
        
        int ginoAnswerLength = (firstArrayLength > secondArrayLength) ? firstArrayLength : secondArrayLength;
        int firstArrayLast = firstArrayLength - 1;
        int secondArrayLast = secondArrayLength - 1;
        String answer = "";
        
        // IF FIRST ARG IS LARGER
        if (ginoAnswerLength == firstArrayLength) {
            
            int[] ginoTop = new int[firstArrayLength];
            int[] ginoBottom = new int[firstArrayLength];
            int[] ginoAnswer = new int[firstArrayLength];
            int lengthDifference = firstArrayLength - secondArrayLength;
            int lowSpace = secondArrayLast;
            
            //ORDER INTO TOP AND BOTTOM ARRAYS
            for (int t = firstArrayLast; t >= 0 ; t--) {
                ginoTop[t] = arrayOne[t];
                
                //Accounts for numbers (x100) replaces them with 0's for placekeeping
                if (lowSpace < 0) {
                    ginoBottom[t] = 0;
                    
                } else {
                    ginoBottom[t] = arrayTwo[lowSpace];
                    lowSpace--;
                    
                }
            }
            
            // PERFORM CALCULATIONS
            for (int i = secondArrayLast; i >= 0; i--) {
                int spaceSum = 0;
                int finalSpaceSum = 0;
                int nextNonZeroPlace = 0;
                
                //BORROWS
                if (ginoTop[i] == 0 && ginoBottom[i] == 0) {
                    finalSpaceSum = 0;
                    
                } else if (ginoTop[i] == 0) {
                    for (int zeroCounter = i; ginoTop[zeroCounter] == 0; zeroCounter--) { //Find non 0 place
                        nextNonZeroPlace = zeroCounter - 1;
                        
                    }
                    
                    ginoTop[nextNonZeroPlace] = ginoTop[nextNonZeroPlace] - 1; //Took 1 from Borrowee
                    
                    for (int fromBorrower = nextNonZeroPlace + 1; fromBorrower != i; fromBorrower++){ //Move borrowed 1
                        ginoTop[fromBorrower] = ginoTop[fromBorrower] + 9;

                    }
                    
                    ginoTop[i] = ginoTop[i] + 10;
                    spaceSum = ginoTop[i] - ginoBottom[i];
                    finalSpaceSum = spaceSum;
                    
                    
                    
                } else if (ginoTop[i] < ginoBottom[i] && ginoTop[i] != 0) {
                    
                    ginoTop[i - 1] = ginoTop[i - 1] - 1;
                    ginoTop[i] = ginoTop[i] + 10;
                    spaceSum = ginoTop[i] - ginoBottom[i];
                    finalSpaceSum = spaceSum;
                    
                }  else {

                    spaceSum = ginoTop[i] - ginoBottom[i];
                    finalSpaceSum = spaceSum;
                    
                }

                ginoAnswer[i] = finalSpaceSum;
                
            }
            answer = answer + ArraytoString(ginoAnswer);
            
            
            // IF SECOND ARG IS LARGER
        }  else if (ginoAnswerLength == secondArrayLength) {
            
            int[] ginoTop = new int[secondArrayLength];
            int[] ginoBottom = new int[secondArrayLength];
            int[] ginoAnswer = new int[secondArrayLength];
            int lengthDifference = secondArrayLength - firstArrayLength;
            int lowSpace = firstArrayLast;
            
            //ORDER INTO TOP AND BOTTOM ARRAYS
            for (int t = secondArrayLast; t >= 0 ; t--) {
                ginoTop[t] = arrayTwo[t];
                
                //Accounts for numbers (x100) replaces them with 0's for placekeeping
                if (lowSpace < 0) {
                    ginoBottom[t] = 0;
                    
                } else {
                    ginoBottom[t] = arrayOne[lowSpace];
                    lowSpace--;
                    
                }
            }
            
            // PERFORM CALCULATIONS
            for (int i = secondArrayLast; i >= 0; i--) {
                int spaceSum = 0;
                int finalSpaceSum = 0;
                int nextNonZeroPlace = 0;
                
                //BORROWS
                if (ginoTop[i] == 0 && ginoBottom[i] == 0) {
                    finalSpaceSum = 0;
                    
                } else if (ginoTop[i] == 0) {
                    for (int zeroCounter = i; ginoTop[zeroCounter] == 0; zeroCounter--) { //Find non 0 place
                        nextNonZeroPlace = zeroCounter - 1;
                        
                    }
                    
                    ginoTop[nextNonZeroPlace] = ginoTop[nextNonZeroPlace] - 1; //Took 1 from Borrowee
                    
                    for (int fromBorrower = nextNonZeroPlace + 1; fromBorrower != i; fromBorrower++){ //Move borrowed 1
                        ginoTop[fromBorrower] = ginoTop[fromBorrower] + 9;
                        
                    }
                    
                    ginoTop[i] = ginoTop[i] + 10;
                    spaceSum = ginoTop[i] - ginoBottom[i];
                    finalSpaceSum = spaceSum;
                    
                    
                    
                } else if (ginoTop[i] < ginoBottom[i] && ginoTop[i] != 0) {
                    
                    ginoTop[i - 1] = ginoTop[i - 1] - 1;
                    ginoTop[i] = ginoTop[i] + 10;
                    spaceSum = ginoTop[i] - ginoBottom[i];
                    finalSpaceSum = spaceSum;
                    
                }  else {
                    spaceSum = ginoTop[i] - ginoBottom[i];
                    finalSpaceSum = spaceSum;
                    
                }
                ginoAnswer[i] = finalSpaceSum;
                
            }
            answer = answer + ArraytoString(ginoAnswer);
            
        }

        int[] finalAnswerArray = new int[answer.length()];
        Ginormint finalAnswer = new Ginormint (answer, finalAnswerArray, answer.length());
        return finalAnswer;
        
    }
    
    
    
    
    
    
    
    
    
    

    public static Ginormint product (int firstArrayLength, int secondArrayLength, int[] arrayOne, int[] arrayTwo) {
        
        //HALVING
        int halfLength = firstArrayLength;
        String[] halfArray = new String [1000];
        halfArray [0] = halves(firstArrayLength, arrayOne);
        int halvedCounter = 1;
        
        for(int i = 1; i < 1000 ; i++ ) {
          
            int[] newHalf = new int [halfLength + halvedCounter];
            Ginormint half = new Ginormint (halfArray[halvedCounter - 1], newHalf, (halfLength));
            halfArray[i] = halves((halfLength + halvedCounter), newHalf);
            halvedCounter++;
            
            
            String numberFinder = "0";
            int spaceIsNum = 0;
            for (int x = 0; numberFinder.compareTo("0") == 0; x++ ){
                numberFinder = Character.toString((halfArray[i]).charAt(x));
                spaceIsNum = x;
                
            }

            if (numberFinder.compareTo("1") == 0 && spaceIsNum == (halfLength - 1)){
                break;
            }
            
        }
        
        System.out.println ("THE NUMBER HAS BEEN HALVED " + halvedCounter + " TIMES TO REACH 1");
        
        //DOUBLING
        int doubleLength = halvedCounter;
        String[] doubleArray = new String [doubleLength];
        doubleArray[0] = doubles(secondArrayLength, arrayTwo);
        
        for(int i = 1; i <= halvedCounter ; i++ ) {
            
            int[] newDouble = new int [doubleLength];
            Ginormint doubled = new Ginormint (doubleArray[i - 1], newDouble, i);
            
            try{
            doubleArray[i] = doubles(doubleLength, newDouble);
            } catch (ArrayIndexOutOfBoundsException e) {
                break;
            }            
        }
        
        //Finding even halves and making corresponding doubles = 0
         for(int i = 0; i <= halvedCounter ; i++ ) {
            int length = firstArrayLength;
             
             for(int x = 0; x < length ; x++ ) {
                String checkChar = Character.toString((halfArray[i]).charAt(length - 1));
                 
                 if (checkChar.compareTo("0") == 0 || checkChar.compareTo("2") == 0 || checkChar.compareTo("4") == 0 || checkChar.compareTo("6") == 0 ||checkChar.compareTo("8") == 0) {
                     
                     doubleArray[i] = "0";
                     
                 }
             }
         }
        
        //Add first two doubles
        int[] firstDouble = new int [doubleArray[0].length()];
        int[] secondDouble = new int [doubleArray[1].length()];
        String initialSum = "";
        
        initialSum = sum(doubleArray[0].length(), doubleArray[1].length(), firstDouble, secondDouble).getString();
        
        String sum = initialSum;
        //Initial sum into array
        int[] previousSumDouble = new int [sum.length()];
        int[] ithDouble;
        
        Ginormint summed = new Ginormint (sum, previousSumDouble, sum.length());

        for(int i = 2; i < halvedCounter ; i++ ) {
           //Summing
            previousSumDouble = new int [sum.length()];
            ithDouble = new int [doubleArray[i].length()];
            
            sum = sum(sum.length(), doubleArray[i].length(), previousSumDouble, ithDouble).getString();
            
            Ginormint newSum = new Ginormint (sum, previousSumDouble, sum.length());

        }
        
        int[] finalAnswerArray = new int[sum.length()];
        Ginormint finalAnswer = new Ginormint (sum, finalAnswerArray, sum.length());
        return finalAnswer;
        
    }

    

    
    
    
    /**
     Returns the quotient of this Ginormint and (i.e., divided by) the argument.
     */
    public Ginormint quotient ( Ginormint n ) {
        throw new UnsupportedOperationException();
    }
    
    
    
    
    
    
    /**
     Returns the remainder of this Ginormint if divided by the argument. It is
     similar to Java's infix modulo operator (%).
     */
    public Ginormint remainder ( Ginormint n ) {
        throw new UnsupportedOperationException();
    }
    
    
    
    
    
    
    
    public static String doubles (int firstArrayLength, int[] arrayOne) {
        
        int firstArrayLast = firstArrayLength - 1;
        int ginoAnswerLength = firstArrayLength * 2;
        String answer = "";
        
        int[] ginoTop = new int[firstArrayLength];
        int[] ginoAnswer = new int[ginoAnswerLength];
        
        //ORDER INTO TOP ARRAY
        for (int t = firstArrayLast; t >= 0 ; t--) {
            ginoTop[t] = arrayOne[t];
            
        }
        // PERFORM CALCULATIONS
        int spaceSum = 0;
        int finalSpaceSum = 0;
        
        for (int i = firstArrayLast; i >= 0; i--) {//Multiplys across top
            spaceSum = ginoTop[i] * 2;
            
            //CARRYS
            if(spaceSum >= 9 && i == 0){
                finalSpaceSum = spaceSum;
                
            } else if (spaceSum >= 9) {
                String s = String.valueOf(spaceSum);
                int firstDigit = Integer.parseInt(Character.toString(s.charAt(0)));
                
                ginoAnswer[i - 1] = ginoAnswer[i - 1] + firstDigit;
                finalSpaceSum = spaceSum % (firstDigit * 10);
                
            } else {
                finalSpaceSum = spaceSum;
                
            }
            ginoAnswer[i] = ginoAnswer[i] + finalSpaceSum;
            
        }
        answer = answer + ArraytoString(ginoAnswer);
        return answer;

        }
    
    
    
    
    
    
    
    

    public static String halves (int firstArrayLength, int[] arrayOne) {
        
        int ginoAnswerLength = firstArrayLength * 2;
        int firstArrayLast = firstArrayLength - 1;
        String answer = "";
        
        int[] ginoTop = new int[firstArrayLength];
        int[] ginoAnswer = new int[ginoAnswerLength];
        
        //ORDER INTO TOP ARRAY
        for (int t = firstArrayLast; t >= 0 ; t--) {
            ginoTop[t] = arrayOne[t];
            
        }
        // PERFORM CALCULATIONS
        int topNum = 0;
        int carryDown = 0;
        int carryDownDifference = 0;
        
        for (int i = 0; i <= firstArrayLast; i++) {
            if(i == 0){
                
                int dividendDigit = ginoTop[i];
                int dividendDigitNext = ginoTop[i + 1];
                topNum = dividendDigit / 2;
                carryDown = 2 * topNum;
                carryDownDifference = Integer.parseInt( (Integer.toString(dividendDigit - carryDown)) + (Integer.toString(ginoTop[i+1])) );
                
                ginoAnswer[i] = ginoAnswer[i] + topNum;

                
            } else if (i == firstArrayLast){

                topNum = carryDownDifference / 2;
                
                ginoAnswer[i] = ginoAnswer[i] + topNum;
                
            } else {
                int dividendDigit = ginoTop[i];
                int dividendDigitNext = ginoTop[i + 1];
                topNum = carryDownDifference / 2;
                carryDown = 2 * topNum;
                carryDownDifference = Integer.parseInt( (Integer.toString(carryDownDifference - carryDown)) + (Integer.toString(ginoTop[i+1])) );
                
                ginoAnswer[i] = ginoAnswer[i] + topNum;

            }
        }
        answer = answer + ArraytoString(ginoAnswer);
        return answer;
        
    }
    
    
    
    
    /**
     OPTIONAL: This static method returns a Ginormint from a given bit string. The argument is presumed to represent an unsigned integer.
     */
    public static Ginormint fromBitString ( String s ) {
        throw new UnsupportedOperationException();
    }
    
    /**
     OPTIONAL: Returns a copy of this Ginormint.
     */
    public Ginormint copy () {
        throw new UnsupportedOperationException();
    }

    
    /**
     OPTIONAL: This method returns the binary representation this Ginormint as a string of zeros and ones.
     This Ginormint is presumed to be non-negative.
     */
    public String toBitString () {
        throw new UnsupportedOperationException();
    }
    
    
    /**
     OPTIONAL: Returns true iff this Ginormint is equivalent to the argument.
     */
    public boolean isEqualTo ( Ginormint n ) {
        throw new UnsupportedOperationException();
    }
    
    
    /**
     OPTIONAL: Returns true if and only if this Ginormint is greater than the argument.
     */
    public boolean isGreaterThan ( Ginormint n ) {
        throw new UnsupportedOperationException();
    }
    
    /**
     OPTIONAL: Returns true iff this Ginormint is less than the argument.
     */
    
    public boolean isLessThan ( Ginormint n ) {
        throw new UnsupportedOperationException();
    }
    
    
    /** OPTIONAL: Returns the absolute value of this Ginormint. */
    public Ginormint absoluteValue () {
        throw new UnsupportedOperationException();
    }
    
    
    
    
}