import java.util.Iterator;

public class CircularList implements Iterable {

	public static void main (String[] args) {

		//testsOne();

	}


	static void testsOne() {
		System.out.println ("\nBegin Add / To String / Constructor Visual: \n");
		try {
			CircularList c = new CircularList();

			Node a = c.add();
			Node b = c.add();
			Node f = c.add();
			Node d = c.add();

			System.out.println(a.toString() + "  " + b.toString() + "  " + f.toString() + "  " + d.toString() + "  " );


			System.out.println(c.size() == 4);
			assert c.size() == 4;
		}
		catch ( AssertionError e ) {
			System.out.println ("Assertion error from (null) constructorTests()");
		}
		catch ( Exception e ) {
			System.out.println ("Abnormal termination from (null) constructorTests()");
		}

	}


	private class clIterator implements Iterator {

		private Node next;
		private Node last;

		private int i = 0;

		/**
		* Puts next node into focus.
	 	*/

		public Node next(){

			next = first; 
			last = next.getNextLink();

			i++;
			first = last;

			return last;
		}

		/**
		* Removes last node returned from the next() method.
	 	*/

		public void remove(){
			Node previousTo = next;
			Node skippedTo = last.getNextLink();

			previousTo.setNextLink(skippedTo);
			skippedTo.setPreLink(previousTo);

			last = null;
			size--;

		}

		public boolean hasNext(){
			return size != 0;
		}
	}



	public class Node {

		private Node nextLink;
		private Node preLink;
		private int place;
		private boolean mark;

		private Node (int place, boolean mark) {

			this.place = place;
			this.mark = mark;
		}

		public Node getNextLink () {
			return this.nextLink;
		}

		public void setNextLink (Node newLink) {
			this.nextLink = newLink;
		}

		public Node getPreLink () {
			return this.preLink;
		}

		public void setPreLink (Node newLink) {
			this.preLink = newLink;
		}

		public int getPlace () {
			return this.place;
		}

		public void setPlace (int newPlace) {
			this.place = newPlace;
		}

		public boolean hasMark () {
			return this.mark;
		}

		public void switchMark () {
			this.mark = !this.mark;
		}

		public String toString () {
			return "\n" + this.place;
		}

		/**
		* Reverses the node's links, as per the Josephus instructions.
		* Because the list is designed in clockwise order from 1 to n, this method switches links.
		* Perminently orders the list from n to 1, counter - clockwise.
		*/

		public void reverse () {
			Node temp = this.preLink;
			this.preLink = this.nextLink ;
			this.nextLink = temp;
		}

	}





	public Iterator iterator() { 
		return new clIterator();

	}



	private int size;
	private Node first;

	/**
	 * Creates a new, blank circular list, proceeds in clockwise order from 1 to n. 
	 */

	public CircularList() { 
		this.first = null;
		this.size = 0;   

	}


	/**
	 * Adds a new node after the last node in the circular list.
	 */

	public Node add(){

		this.size++;
		Node n1 = new Node (size, true);
		n1.setPlace(size);

		if (this.first == null){ //if this is the first node
			n1.setNextLink(n1);
			n1.setPreLink(n1);
			this.first = n1;

			return n1;

		} else {
			Node pre = this.first.getPreLink();

			n1.switchMark();
			n1.setNextLink(this.first);

			pre.setNextLink(n1);
			this.first.setPreLink(n1);
			n1.setPreLink(pre);

			return n1;
		}
	}


	/**
	 * Returns the size of the circular list.
	 */

	public int size(){
		return this.size;

	}
}

