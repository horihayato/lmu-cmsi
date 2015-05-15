import java.util.Collection;
import java.util.Iterator;
import java.util.Stack;

/*
   TO DO & TEST:
   finish equals
   contains all
   finish post order
   clean up to String

*/



/*
   An object of this class represents a binary tree. 
   Nodes may be decorated (labeled) with arbitrary (strings) objects (the default is null).
*/

   public class BinaryTree implements Collection {

   	public static void main (String[] args) {
   		//methodTests();
   		// preorderTests();
   		// inorderTests();
   		// postorderTests();
   		//complexStaticFactoryTests1();
   		//complexStaticFactoryTests2();

   	}

   	static void methodTests() {
   		System.out.println ("\n \n \n Begin Method Tests:");
   		try {
   			BinaryTree t1 = new BinaryTree();
   			BinaryTree t2 = new BinaryTree();

   			t1.add("A");
   			t1.add("B");
   			t1.add("C");
   			t1.alternateAdd("D");
   			t1.add("E");
   			t1.add("F");
   			t1.alternateAdd("G");
   			t1.add("H");
   			t1.alternateAdd("I");

   			t2.add("J");
   			t2.add("K");
   			t2.add("L");
   			t2.alternateAdd("M");
   			t2.add("N");
   			t2.add("O");
   			t2.alternateAdd("P");
   			t2.add("Q");
   			t2.alternateAdd("R");

   			BinaryTree togetherTree = newFromRootAndTwoTrees("SUPER ROOT", t1, t2);
   			Iterator it = togetherTree.iterator();
   			int i = 0;

			System.out.println("\n \n \nTO STRING TEST \n");
   			System.out.println(togetherTree.toString());

   			System.out.println("\n \n \nHASH CODE TEST \n");
   			System.out.println(togetherTree.hashCode);

   			System.out.println("\n \n \nCONTAINS TEST \n");
   			System.out.println(togetherTree.contains("A"));

   			System.out.println("\n \n \nSIZE TEST \n");
   			System.out.println(togetherTree.size());

   			System.out.println("\n \n \n REMOVE TEST \n");
   			System.out.println(togetherTree.remove("A"));
   			System.out.println(togetherTree.toString());

   			// System.out.println("\n \n \nEQUALS TEST \n");
   			// System.out.println(togetherTree.equals());

   			// System.out.println("\n \n \nCLEAR TEST \n");
   			// System.out.println(togetherTree.clear());

   			System.out.println("\n \n \nIS EMPTY TEST \n");
   			System.out.println(togetherTree.isEmpty());




   			// //Turn by Turn toString of TOGETHER TREE in Preorder
   			// while (it.hasNext() == true){
   			// 	i++;
   			// 	System.out.println("_____________________________________________________");
   			// 	BinaryTree.Node n = (BinaryTree.Node)it.next();
   			// 	System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			// }
   		}
   		catch ( Exception e ) {
   			System.out.println ("Abnormal termination from staticFactoryTests() caused by:");
   			System.out.println (e);
   		}

   	}

   	static void preorderTests() {
   		System.out.println ("\n \n \n Begin Pre Order Iterator Test:");
   		try {
   			BinaryTree t1 = new BinaryTree();
   			BinaryTree t2 = new BinaryTree();

   			t1.add("A");
   			t1.add("B");
   			t1.add("C");
   			t1.alternateAdd("D");
   			t1.add("E");
   			t1.add("F");
   			t1.alternateAdd("G");
   			t1.add("H");
   			t1.alternateAdd("I");

   			t2.add("J");
   			t2.add("K");
   			t2.add("L");
   			t2.alternateAdd("M");
   			t2.add("N");
   			t2.add("O");
   			t2.alternateAdd("P");
   			t2.add("Q");
   			t2.alternateAdd("R");

   			BinaryTree togetherTree = newFromRootAndTwoTrees("SUPER ROOT", t1, t2);
   			Iterator it = togetherTree.iterator();
   			int i = 0;

   			//Turn by Turn toString of TOGETHER TREE in Preorder
   			while (it.hasNext() == true){
   				i++;
   				System.out.println("_____________________________________________________");
   				BinaryTree.Node n = (BinaryTree.Node)it.next();
   				System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			}
   		}
   		catch ( Exception e ) {
   			System.out.println ("Abnormal termination from staticFactoryTests() caused by:");
   			System.out.println (e);
   		}

   	}


   	static void inorderTests() {
   		System.out.println ("\n \n \n Begin In Order Iterator Test:");
   		try {
   			BinaryTree t1 = new BinaryTree();
   			BinaryTree t2 = new BinaryTree();

   			t1.add("A");
   			t1.add("B");
   			t1.add("C");
   			t1.alternateAdd("D");
   			t1.add("E");
   			t1.add("F");
   			t1.alternateAdd("G");
   			t1.add("H");
   			t1.alternateAdd("I");

   			t2.add("J");
   			t2.add("K");
   			t2.add("L");
   			t2.alternateAdd("M");
   			t2.add("N");
   			t2.add("O");
   			t2.alternateAdd("P");
   			t2.add("Q");
   			t2.alternateAdd("R");

   			BinaryTree togetherTree = newFromRootAndTwoTrees("SUPER ROOT", t1, t2);
   			Iterator it = togetherTree.inorderIterator();
   			int i = 0;

   			//Turn by Turn toString of TOGETHER TREE in Inorder
   			while (it.hasNext() == true){
   				i++;
   				System.out.println("_____________________________________________________");
   				BinaryTree.Node n = (BinaryTree.Node)it.next();
   				System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			}
   		}
   		catch ( Exception e ) {
   			System.out.println ("Abnormal termination from inorderTests() caused by:");
   			System.out.println (e);
   		}

   	}

   	static void postorderTests() {
   		System.out.println ("\n \n \n Begin Post Order Iterator Test:");
   		try {
   			BinaryTree t1 = new BinaryTree();
   			BinaryTree t2 = new BinaryTree();

   			t1.add("A");
   			t1.add("B");
   			t1.add("C");
   			t1.alternateAdd("D");
   			t1.add("E");
   			t1.add("F");
   			t1.alternateAdd("G");
   			t1.add("H");
   			t1.alternateAdd("I");

   			t2.add("J");
   			t2.add("K");
   			t2.add("L");
   			t2.alternateAdd("M");
   			t2.add("N");
   			t2.add("O");
   			t2.alternateAdd("P");
   			t2.add("Q");
   			t2.alternateAdd("R");

   			BinaryTree togetherTree = newFromRootAndTwoTrees("SUPER ROOT", t1, t2);
   			Iterator it = togetherTree.postorderIterator();
   			int i = 0;

   			//Turn by Turn toString of TOGETHER TREE in PostOrder
   			while (it.hasNext() == true){
   				i++;
   				System.out.println("_____________________________________________________");
   				BinaryTree.Node n = (BinaryTree.Node)it.next();
   				System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			}
   		}
   		catch ( Exception e ) {
   			System.out.println ("Abnormal termination from inorderTests() caused by:");
   			System.out.println (e);
   		}

   	}


   	static void complexStaticFactoryTests1() {
   		System.out.println ("\n \n \n Begin Complex Static Factory / Pre Order Iterator Test:");
   		try {
   			BinaryTree t1 = new BinaryTree();
   			BinaryTree t2 = new BinaryTree();

   			t1.add("A");
   			t1.add("B");
   			t1.alternateAdd("C");
   			t1.alternateAdd("D");

   			t2.add("E");
   			t2.add("F");
   			t2.alternateAdd("G");
   			t2.add("H");
   			t2.alternateAdd("I");

   			BinaryTree t3 = newFromRootAndTwoTrees("ROOT 3", t1, t2);

   			t3.add("J");
   			t3.add("K");
   			t3.alternateAdd("L");
   			t3.alternateAdd("M");

   			BinaryTree t4 = newFromRootAndTwoTrees("ROOT 4", t3, t2);

   			t4.add("N");
   			t4.add("O");
   			t4.alternateAdd("P");
   			t4.add("Q");
   			t4.alternateAdd("R");

   			BinaryTree t5 = newFromRootAndTwoTrees("ROOT 5", t4, t3);
   			BinaryTree t6 = newFromRootAndTwoTrees("ROOT 6", t5, t4);
   			BinaryTree t7 = newFromRootAndTwoTrees("ROOT 7", t6, t5);

   			Iterator it = t7.iterator();
   			System.out.println(t7.toString());
   			int i = 0;

			//Turn by Turn toString of TOGETHER TREE in Preorder
   			while (it.hasNext() == true){
   				i++;
   				System.out.println("_____________________________________________________");
   				BinaryTree.Node n = (BinaryTree.Node)it.next();
   				System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			}

   			//Turn by Turn toString of TOGETHER TREE in Inorder
   			while (it.hasNext() == true){
   				i++;
   				System.out.println("_____________________________________________________");
   				BinaryTree.Node n = (BinaryTree.Node)it.next();
   				System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			}
   		}
   		catch ( Exception e ) {
   			System.out.println ("Abnormal termination from complexStaticFactoryTests() caused by:");
   			System.out.println (e);
   		}

   	}

   	static void complexStaticFactoryTests2() {
   		System.out.println ("\n \n \n Begin Complex Static Factory / In Order Iterator Test:");
   		try {
   			BinaryTree t1 = new BinaryTree();
   			BinaryTree t2 = new BinaryTree();

   			t1.add("A");
   			t1.add("B");
   			t1.alternateAdd("C");
   			t1.alternateAdd("D");

   			t2.add("E");
   			t2.add("F");
   			t2.alternateAdd("G");
   			t2.add("H");
   			t2.alternateAdd("I");

   			BinaryTree t3 = newFromRootAndTwoTrees("ROOT 3", t1, t2);

   			t3.add("J");
   			t3.add("K");
   			t3.alternateAdd("L");
   			t3.alternateAdd("M");

   			BinaryTree t4 = newFromRootAndTwoTrees("ROOT 4", t3, t2);

   			t4.add("N");
   			t4.add("O");
   			t4.alternateAdd("P");
   			t4.add("Q");
   			t4.alternateAdd("R");

   			BinaryTree t5 = newFromRootAndTwoTrees("ROOT 5", t4, t3);
   			BinaryTree t6 = newFromRootAndTwoTrees("ROOT 6", t5, t4);
   			BinaryTree t7 = newFromRootAndTwoTrees("ROOT 7", t6, t5);

   			Iterator it = t7.inorderIterator();
   			int i = 0;

   			//Turn by Turn toString of TOGETHER TREE in Inorder
   			while (it.hasNext() == true){
   				i++;
   				System.out.println("_____________________________________________________");
   				BinaryTree.Node n = (BinaryTree.Node)it.next();
   				System.out.println("Cycle: " + i + " | Returned Node: " + n);
   			}
   		}
   		catch ( Exception e ) {
   			System.out.println ("Abnormal termination from complexStaticFactoryTests() caused by:");
   			System.out.println (e);
   		}

   	}


























   	private static class Node {
   		private Node father;
   		private Node rightSon;
   		private Node leftSon;
   		private Object obj;

   		private Node () {
   			this.father = father;
   			this.rightSon = rightSon;
   			this.leftSon = leftSon;
   			this.obj = obj;
   		}


   		public Node getRightSon () {
   			return this.rightSon;
   		}

   		public void setRightSon (Node newLink) {
   			this.rightSon = newLink;
   		}

   		public Node getLeftSon () {
   			return this.leftSon;
   		}

   		public void setLeftSon (Node newLink) {
   			this.leftSon = newLink;
   		}

   		public Node getFather () {
   			return this.father;
   		}

   		public void setFather (Node newLink) {
   			this.father = newLink;
   		}

   		public Object getObj () {
   			return this.obj;
   		}

   		public void setObj (Object newObj) {
   			this.obj = newObj;
   		}

   		public String toString () {

   			return " " + this.obj;
   		}

   	}



   	private class inorderIterator implements Iterator {
   		Stack<Node> st = new Stack<Node>();
   		public Node n1 = new Node();

   		inorderIterator() {
   			n1 = root;

   			while (n1 != null) { //Iterate down to farthest left node
   				st.push(n1);
   				n1 = n1.getLeftSon();
   			} 
   		}

   		public Node next() {
   			Node answer = new Node ();
   			n1 = st.pop();
   			answer = n1;

   			if(n1.getRightSon() != null) {
   				n1 = n1.getRightSon();

	   			while (n1 != null) { //Iterate down to farthest left node
	   				st.push(n1);
	   				n1 = n1.getLeftSon();
	   			} 

			} 
			return answer;
		}

   		public void remove(){
   			throw new UnsupportedOperationException();
   		}

   		public boolean hasNext(){
   			return !st.isEmpty();
   		}
   	}





   	private class postorderIterator implements Iterator {
   		Stack<Node> st = new Stack<Node>();
   		public Node n1 = new Node();
   		public boolean loopOn = true;

   		postorderIterator() {
   			n1 = root;

   			while (n1 != null) { //Iterate down to farthest left node
   				st.push(n1);
   				n1 = n1.getLeftSon();
   			} 
   		}

   		public Node next() {
   			Node answer = new Node ();
   			answer = n1;

   			while (n1 != null && loopOn) { //Iterate down to farthest left node
   				st.push(n1);
   				n1 = n1.getLeftSon();
	   		} 

   			while (n1 == st.peek().getRightSon()) {
   				n1 = st.pop();
   				loopOn = false;
   				answer = n1;
			}

			loopOn = true;

			n1 = st.peek().getRightSon();
			return answer;
		}

   	public void remove(){
   		throw new UnsupportedOperationException();
   	}

   	public boolean hasNext(){
   		return !st.isEmpty();
   	}
   }



   	private class iterator implements Iterator {

   		private Node itRoot;
   		Stack<Node> st = new Stack<Node>();

   		iterator() {
   			itRoot = root;
   			st.push(itRoot);
   		}

   		public Node next() {
   			Node answer = new Node ();
   			Node n1 = st.pop();

   			if (n1.getRightSon() != null) {
   				st.push(n1.getRightSon());

   			} 

   			if (n1.getLeftSon() != null) {
   				st.push(n1.getLeftSon());

   			}

   			return n1;
   		}

   		public void remove(){
   			throw new UnsupportedOperationException();
   		}

   		public boolean hasNext(){
   			return !st.isEmpty();
   		}
   	}































   	public Node root;
   	public int size;
   	public int hashCode;


   	/** Constructs an empty binary tree. */

   	public BinaryTree() {
   		this.root = null;
   		this.size = 0;
   		hashCode = hashCodeGenerator();
   	}

	/*
	Returns a string that represents this binary tree. 
	(Some possible formats will be discussed in class.)
	*/

	public String toString() {
		return toStringLine(root);
	}

	private String toStringLine(Node node) {
		if (node == null || node.getLeftSon() == null && node.getRightSon() == null) {
			return "<" + node + ">";

		} else {
			String answer = "";
			answer = answer + "(";
			answer = answer + toStringLine(node.getLeftSon());
			answer = answer + node ;
			answer = answer + toStringLine(node.getRightSon());
			answer = answer + ")";
			return answer;
		}

	}


	/*
	Adds a node, decorated with obj, to this binary tree.
	The new node becomes the root of the entire tree; 
	the former node becomes the left subtree;
	the right subtree of this will be empty.
	*/

	public boolean add ( Object obj ) {

		Node n1 = new Node ();
		n1.setObj(obj);

		//Sets Tree on Top
		n1.setFather(null);
		n1.setLeftSon(this.root);
		n1.setRightSon(null);
		this.root = n1;
		this.size++;

		//Rewire (Now) Son
		Node below = this.root.getLeftSon();

		if (below != null){
			below.setFather(this.root);
		}
		return true;
	}


	/*
	Adds a node, decorated with obj, to this binary tree.
	The new node becomes the root of the tree; the left subtree of the root will be empty; 
	the former tree becomes the right subtree of the root.
	*/

	public boolean alternateAdd ( Object obj ) {
		Node n1 = new Node ();
		n1.setObj(obj);

	  	//Sets Tree on Top
		n1.setFather(null);
		n1.setLeftSon(null);
		n1.setRightSon(this.root);
		this.root = n1;
		this.size++;

		//Rewire (Now) Son
		Node below = this.root.getRightSon();

		if (below != null){
			below.setFather(this.root);
		}
		return true;
	}

	/*
	Static factory for constructing new binary trees.
	The root of the new tree will be decorated with obj; leftSubtree and rightSubtree, respectively, 
	will become the left and right subtrees of the root.
	*/

	public static BinaryTree newFromRootAndTwoTrees ( Object obj, BinaryTree leftSubtree, BinaryTree rightSubtree ) {
		BinaryTree tree = new BinaryTree();

		Node chiefRoot = new Node ();
		Node leftRoot = leftSubtree.root;
		Node rightRoot = rightSubtree.root;

		chiefRoot.setObj(obj);

		//Sets Chief Node on Top
		chiefRoot.setFather(null); 
		chiefRoot.setLeftSon(leftRoot); 
		chiefRoot.setRightSon(rightRoot);
		tree.root = chiefRoot;

		tree.setSize(leftSubtree.size() + rightSubtree.size() + 1);

		System.out.println("\n END TREE COMBINING: with Root: " + chiefRoot +" // Left: "+ leftRoot +", Right: "+ rightRoot + " // Size is: " + tree.size());

		return tree;

	}


	/** Returns a hashcode for this binary tree. */

	public int hashCode () {
		return this.hashCode;
	}

	private int hashCodeGenerator() {
		return (int)Math.floor(Math.random() * Integer.MAX_VALUE);
	}


	/* Re-initializes this to an empty binary tree. */	
	public void clear () {
		this.root = null;
		this.size = 0;
		hashCode = hashCodeGenerator();
	}

	/*
	Returns true iff this binary tree contains (at least) one example
	of obj.
	*/

	public boolean contains ( Object obj ) {
		Iterator it = this.iterator();

		while (it.hasNext() == true){
			BinaryTree.Node n = (BinaryTree.Node)it.next();

			if(n.getObj() == obj ){
				return true;
			}
		}
		return false;
	}

	/*
	Returns true iff this binary tree contains at least one example of each DIFFERENT
	object in Collection c. Note that c may contain several examples of some 
	(same) object, but this binary tree is only required to contain one such example.
	*/

	public boolean containsAll ( Collection c ) {
		throw new UnsupportedOperationException();
	}

   /*
      Returns true iff this binary tree is equivalent, with respect to both structure and content, 
	  as Object obj.
   */

   public boolean equals ( Object obj ) { // overrides Collection
   	//compare each preorder next return, if one differs return false
   		Iterator it = this.iterator();

   		int i = 0;
		while (it.hasNext() == true){
			BinaryTree.Node n = (BinaryTree.Node)it.next();

			if(n.getObj() != obj ){
				i++;
			}
		}
		return i == 0;
   }
   

   /** Returns true iff this binary tree is empty. */
   public boolean isEmpty () {
   		return root == null;
   }


   /** Returns a preorder iterator for this binary tree. All bets are off if the tree changes during the traversal. */
   public Iterator iterator () {
   	return new iterator();
   }



   /** Returns an inorder iterator for this binary tree. All bets are off if the tree changes during the traversal. */
   public Iterator inorderIterator () {
   	return new inorderIterator();
   }


   /** Returns a postorder iterator for this binary tree. All bets are off if the tree changes during the traversal. */
   public Iterator postorderIterator () {
   	return new postorderIterator();
   }	


   /*
      Removes a matching object from this binary tree, and returns true,  
      provided that the matching object is at a leaf; if there is no matching leaf,
	  then the method returns false.
   */

	public boolean remove ( Object obj ) {
		Iterator it = this.iterator();

		while (it.hasNext() == true){
			BinaryTree.Node n = (BinaryTree.Node)it.next();

			if(n.getObj() == obj && n.getRightSon() == null && n.getLeftSon() == null ){
				Node fa = n.getFather();

				n.setRightSon(null);
   				n.setLeftSon(null);
   				n.setObj(null);

				if (fa.getRightSon() != null) {
					fa.setRightSon(null);

				}

				if (fa.getLeftSon() != null) {
					fa.setLeftSon(null);
					
				}
				n.setFather(null);
				return true;

			} else if (n.getObj() == obj) {
				throw new UnsupportedOperationException("You cannot remove a non terminal node!");

			}
		}
		return false;
	}


	/** Returns the number of nodes in this binary tree. */
	public int size () {
		return this.size;
	}

	public int setSize (int i) {
		return this.size = i;
	}
























	/** Throws an UnsupportedOperationException(). */
	public boolean addAll ( Collection c ) {
		throw new UnsupportedOperationException();
	}


	/** Throws an UnsupportedOperationException. */
	public boolean removeAll (  java.util.Collection c ) {
		throw new UnsupportedOperationException ();
	}


	/** Throws an UnsupportedOperationException(). */
   	public boolean retainAll (  java.util.Collection c ) { // overrides Collection
   		throw new UnsupportedOperationException ();
   	}


   	/** Throws an UnsupportedOperationException(). */
   	public Object[] toArray () {
   		throw new UnsupportedOperationException ();
   	}


   	/** Throws an UnsupportedOperationException(). */
   	public Object[] toArray ( Object[] a ) {
   		throw new UnsupportedOperationException ();
   	}

   }