import java.util.Iterator;

public class JosephusSolver {

	public static void main ( String[] args ) {

		int people = Integer.parseInt(args[0]);
		int skip = Integer.parseInt(args[1]);


		if (people <= 0 || skip < 0){
			System.out.println("\n" + "There are no people in the list or there are less than 0 skips." + "\n"); 
			throw new NumberFormatException(" ");
		}

		if (skip == 0){
			System.out.println("\n" + 1); 
			return;
		}


		int turnCounter = 0;

		CircularList cl = new CircularList();
		Iterator it = cl.iterator();


		//adder
		for (int i = 0; i < people; i++){
			cl.add();
		}

		//link reverser
		for (int i = 0; i < people; i++){
			CircularList.Node a = (CircularList.Node)it.next();
			a.reverse();

		}

		while (it.hasNext() == true){

			turnCounter++;

			if (turnCounter == 1){
				it.next();
				it.next();

				for(int i = 0; i < skip; i++){
					it.next();
				}

				it.remove();

			} else {

				for(int i = 0; i <= skip; i++){
					it.next();
				}

				it.remove();

			}
		}
		System.out.println(it.next());
	}
}