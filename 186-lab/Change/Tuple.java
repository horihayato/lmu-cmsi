public class Tuple {


    // private instance data;
    private int[] tuple;
    private int length;
    private int lastSpace;



    //ZEROED
    public Tuple (int n) {
         this.length = n;
         this.tuple = new int[this.length];

         for (int i = 0; i <= this.lastSpace; i++) {
            this.tuple[i] = 0;

         }

         lastSpace = length - 1;

    }
    


    public Tuple (int[] data) {
         this.length = data.length;
         this.tuple = new int[this.length];

         for (int i = 0; i <= this.lastSpace; i++) {
            this.tuple[i] = data [i];

         }

         lastSpace = length - 1;

    }





    public void setElement(int i, int j) {
        this.tuple[i] = j;

    }




    public int getElement(int i) {
        return this.tuple[i];

    }




    public int length() {
        return this.length;

    }




    public int total() {
        int sum = 0;

        for (int i = 0; i <= this.lastSpace; i++) {
            sum = sum + this.tuple[i];

         }

        return sum;

    }





    public void add(Tuple t) {

        for (int i = 0; i <= this.lastSpace; i++) {
            int sum = 0;
            this.tuple[i] = this.tuple[i] + t.getElement(i);

        }

    }


    public void clone(Tuple t) {

        for (int i = 0; i <= this.lastSpace; i++) {
            this.tuple[i] = t.getElement(i);

        }

    }




    public boolean isEqualTo(Tuple t){
        int[] checker = new int [this.length];
        int sum = 0;

        for (int i = 0; i <= this.lastSpace; i++) {
            if (this.tuple[i] == t.getElement(i)) {
                checker[i] = 1;

            } else {
                checker[i] = 0;

            }
        }

        for (int i = 0; i <= this.lastSpace; i++) {
            sum = sum + checker[i];

         }

         return sum == length;

    }





    public String toString() {
        String print = "";

        for (int i = 0; i <= this.lastSpace; i++) {
            print = print + this.tuple[i] + "  ";

         }

         return print;

    }



}
