import java.util.Collection;
import java.util.Iterator;
import java.util.ArrayList;

/*
	An MSet is an unordered collection that allows duplicates. This class should be 
	a direct, custom, array-based implementation of the Collection interface, created from
	"first prinicples," i.e., you may not use any other material (e.g., ArrayList) from the 
	Java Collections Framework.
*/

public class MSet extends Object implements Collection {

	public static void main(String[] args) {
	    add_Test(); 
        addAll_Test();
        clear_Test();
        contains_Test();
        containsAll_Test(); 
        count_Test();
        hashCode_Test();
        isEmpty_Test();
        reduce_Test();
        remove_Test();
        removeAll_Test();
        size_Test();
        toString_Test();
    }

    static void add_Test() {
    		System.out.println("\n" + "Add Test:" + "\n");
    	//each test should have try catch
    	try {
    		MSet m1 = new MSet();
    		System.out.println(m1.size() == 0);

    	}
    	catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}

    	try {
    		MSet m2 = new MSet();
    		m2.add("cat");
    		System.out.println((m2.size() == 1) && (m2.unique() == 1));
    	}
    	catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
    }


    static void addAll_Test() {
    	System.out.println("\n" + "Add All Test:" + "\n");

    	try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson" + i);  	
               }
            MSet m1 = new MSet();
            m1.addAll(a1);
            System.out.println(m1.containsAll(a1));
            //System.out.println(m0.containsAll(m1));
        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}


    }

    static void clear_Test() {
        System.out.println("\n" + "Clear Test:" + "\n");
        try {
        	ArrayList a1 = new ArrayList();
               for (int i = 0; i < 1025; i++) {
                   a1.add("jackson");  
                   a1.add("cats"); 	
               }
            MSet m1 = new MSet(a1);
            m1.add("jackson88");      /// dont add any numbers over 100 plz.
            m1.add("jackson");
            m1.add("jackson88");
            m1.add("cats");
            m1.clear();
            System.out.println(m1.isEmpty());
            m1.add("jackson88");
            m1.add(1234252);
            m1.clear();
            System.out.println(m1.isEmpty());


        } catch (Exception e) {
        	System.out.println("false " + e.getMessage());
        }
    }

    static void contains_Test() {
    	System.out.println("\n" + "Contains Test:" + "\n");

    	try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson");  	
               }
            MSet m1 = new MSet(a1);
            m1.add("jackson88");      /// dont add any numbers over 100 plz.
            m1.add("jackson");
            m1.add("jackson88");
            System.out.println(m1.contains("jackson88"));
            System.out.println(m1.contains("jackson"));         
        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
    }

    static void containsAll_Test() {
    	System.out.println("\n" + "Contains All Test:" + "\n");

    	try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson" + i);  	
               }
            MSet m1 = new MSet(a1);
            m1.add("willy");
            System.out.println(m1.containsAll(a1));
        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
    }


    static void count_Test() {
    	System.out.println("\n" + "Count Test:" + "\n");

    	try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson");  	
               }
            MSet m1 = new MSet(a1);
            System.out.println(m1.count("jackson") == 5);
            m1.add("jackson");
            System.out.println(m1.count("jackson") == 6);
            System.out.println(m1.count("willy") == 0);
            System.out.println(m1.count(109) == 0);

        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
	}

	static void hashCode_Test() {
		System.out.println("\n" + "hashCode Test:" + "\n");

		try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson");  	
               }
            MSet m1 = new MSet(a1);
            System.out.println(m1.hashCode() == m1.hashCode());


        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
	}

	static void isEmpty_Test() {
    	System.out.println("\n" + "isEmpty Test:" + "\n");

    	try {
    		MSet m0 = new MSet();
    		System.out.println(m0.isEmpty());
    		//use add and remove and retest 
        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
    }

    static void reduce_Test() {
		System.out.println("\n" + "Reduce Test:" + "\n");

		try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson"); 
                   a1.add("eyeballs"); 

               }
            MSet m1 = new MSet(a1);
            System.out.println(m1.reduce("eyeballs"));


        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
	}

	static void remove_Test() {
		System.out.println("\n" + "Remove Test:" + "\n");

		try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson"); 
                   a1.add("eyeballs"); 

               }
            MSet m1 = new MSet(a1);
            m1.add("willy");
            m1.add("cat");
            m1.add(120);
            System.out.println(m1.remove("eyeballs"));


        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
	}

	static void removeAll_Test() {
		System.out.println("\n" + "Remove All Test:" + "\n");

		try {
            ArrayList a1 = new ArrayList();
                for (int i = 0; i < 5; i++) {
                   a1.add("jackson"); 
                   a1.add("eyeballs");
                }
            	MSet m1 = new MSet(a1);
            	m1.add("willy");
            	m1.add("cat");
            	m1.add(120);
            	m1.removeAll(a1);
            	System.out.println(m1.size() == 3);
            	System.out.println(m1.toString().compareTo("<willy, 1> <cat, 1> <120, 1> ") == 0);

        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
	}

    static void toString_Test() {
    	System.out.println("\n" + "To String Test:" + "\n");

    	try {
           ArrayList a1 = new ArrayList();
           a1.add("jackson0");
           a1.add("jackson1");
           a1.add("jackson2");
           a1.add("jackson3");
           a1.add("jackson4");
           a1.add("jackson5");
    	   MSet m1 = new MSet(a1);
    	   System.out.println(m1.toString().compareTo("<jackson0, 1> <jackson1, 1> <jackson2, 1> <jackson3, 1> <jackson4, 1> <jackson5, 1> ") == 0);
    	} catch (Exception e){
    		System.out.println("false " + e.getMessage());
    	}
    }

    static void size_Test() {
    	System.out.println("\n" + "Size Test:" + "\n");

    	try {
            ArrayList a1 = new ArrayList();
               for (int i = 0; i < 5; i++) {
                   a1.add("jackson");  	
               }
            MSet m1 = new MSet(a1);
            System.out.println(m1.size() == 5);
            m1.add("willy");
            System.out.println(m1.size() == 6);
            MSet m2 = new MSet();
            System.out.println(m2.size() == 0);
        } catch (Exception e) {
    		System.out.println("false " + e.getMessage());
    	}
    }

    private final int DEFAULT_INT_SIZE = 1024;
    private Object[] uniqueObjects;
    private Integer[] count;
    private int biggestIndex = 0;
    private int hashCode;

	/** Constructs an MSet with no elements. */
	public MSet () {
		hashCode = hashCodeGenerator();
		uniqueObjects = new Object[DEFAULT_INT_SIZE];
		count = new Integer[DEFAULT_INT_SIZE];

	    //instead of increasing count from undef. - set all to 0
		for (int i = 0; i < DEFAULT_INT_SIZE; i++) {
			count[i] = 0;
		}

	}

	/** Constructs an MSet from the given collection. */
	public MSet ( Collection c ) {
		hashCode = hashCodeGenerator();
		uniqueObjects = new Object[DEFAULT_INT_SIZE];
		count = new Integer[DEFAULT_INT_SIZE];

		//instead of increasing count from undef. - set all to 0
		for (int i = 0; i < DEFAULT_INT_SIZE; i++) {
			count[i] = 0;
		}

		for (Object o : c) {
			this.add(o);
		}
	}

	/** Ensures that this collection contains the specified element. 
	    Returns true if this collection changed IN ANY WAY as a result of the call. */
	public boolean add ( Object o ) {
		    //is the object already in the MSet? If yes, bump that count
		    for (int i = 0; i < biggestIndex; i++) {
               if (o == uniqueObjects[i]) {
                   count[i]++;
                   return true;
               }
		    }
		    //if not, find out if there is room in the array, add it, bump the count
		    if (biggestIndex < uniqueObjects.length) {
		    	uniqueObjects[biggestIndex] = o;
		        count[biggestIndex]++;
		        biggestIndex++;
		        return true;
		    } else { //if not, but there's no room, have to make a NEW ARRAY of double the size of current array
                //make 2 new arrays of doubled size, 1 for uniqueObjects, 1 for count

		        Object[] tempObjects = new Object[uniqueObjects.length * 2];
		        Integer[] tempCount = new Integer[count.length * 2];	

		        //zero count resetter
				for (int i = 0; i < tempCount.length; i++) {
					tempCount[i] = 0;
				}

			    //copy uniqueObjects into array
		        for (int i = 0; i < uniqueObjects.length; i++) {
		        		tempObjects[i] = uniqueObjects[i];
		        		tempCount[i] = count[i];
		        }

		        uniqueObjects = tempObjects;
		        count = tempCount;

		        //add uniqueObject
		        uniqueObjects[biggestIndex] = o;
		        count[biggestIndex]++;
		        biggestIndex++;
		        return true;
		    }
	}

	/** Adds all of the elements in the specified collection to this collection. */
	public boolean addAll ( Collection c ) {
		for (Object o : c) {
			this.add(o);
		}
		return true;
	}

	/** Removes all of the elements from this collection. */
	public void clear () {
		for (int i = 0; i < biggestIndex; i++) {
			uniqueObjects[i] = null;
			count[i] = 0;
		}
		biggestIndex = 0;
	}

	/** Returns true if this collection contains the specified element. */
	public boolean contains ( Object o ) {
		for (int i = 0; i < biggestIndex; i++) {
			if (uniqueObjects[i] == o) {
				return true;
			}
		}
		return false;
	}


	/** Returns true if this collection contains all of the elements in the specified collection. */
	public boolean containsAll ( Collection c ) {
		for (Object o : c) {
			if (this.contains(o) == false) {
				return false;
			}
		}
		return true;
	}

    /*Returns the number of instances of an object*/
	public int count (Object o) {
		for (int i = 0; i < biggestIndex; i++) {
			if (uniqueObjects[i] == o) {
				return count[i];
			}
		}
		return 0;
	}

	/** Compares the specified object with this collection for equality. Overrides Object.equals(). */
	public boolean equals ( Object o ) {
		throw new UnsupportedOperationException();
	}

	/** Returns a hash code value for this collection. May override Object.hashCode(). */
	public int hashCode () {
		//assign it a random number between 0 to Integer.MAX_VALUE
		return this.hashCode;
	}

	private int hashCodeGenerator() {
		return (int)Math.floor(Math.random() * Integer.MAX_VALUE);
	}

	/** Returns true if this collection contains no elements. */
	public boolean isEmpty () {
		if (this.biggestIndex <= 0) {
			return true;
		}
		return false;
	}

	/** Returns an iterator over the UNIQUE elements in this collection. 
		There are no guarantees concerning the order in which the elements are returned. */
	public Iterator iterator () {
		//return new SpecialIterator(this);
		throw new UnsupportedOperationException();
	}

	/*class SpecialIterator {

	} */

    /** Decrements the number of copies of o in this MSet. Returns true iff this MSet changed
		as a result of the operation. */
	public boolean reduce ( Object o ) {
		for (int i = 0; i < biggestIndex; i++) {
			if (uniqueObjects[i] == o) {
				count[i] = count[i] - 1;
				return true;
			}
		}
		return false;
	}

	/** Removes all instances of the specified element from this collection. */
	public boolean remove ( Object o ) {
		for (int i = 0; i < biggestIndex; i++) {
			if (uniqueObjects[i] == o) {
				count[i] = 0;
				uniqueObjects[i] = null;
				shift(i);
				return true;
			}
		}
		return false;
	}

	/** Removes all of this collection's elements that are also contained in the specified collection. 
		After this call returns, this collection will contain no elements in common with the specified collection. */
	public boolean removeAll ( Collection c ) {
		int preUnique = this.unique();
			for (Object o : c) {
	 			if (c.contains(o)) {
	 				this.remove(o);
	 			}
	 		}

	 	return preUnique != this.unique();
	}

	/** Retains only the elements in this collection that are contained in the specified collection. 
		 In other words, removes from this collection all of its elements that are not contained in the 
		 specified collection. */
	public boolean retainAll ( Collection c ) {
		throw new UnsupportedOperationException();
	}

	public void shift ( int index ) {
		for (int i = index; i < biggestIndex - 1; i++) {
            uniqueObjects[i] = uniqueObjects[i+1];
            count[i] = count[i+1];
		} 
		biggestIndex -= 1;
	}
	
	/** Returns the number of elements in this collection, including duplicates.  */
	public int size () {
		int result = 0;
		for (int i = 0; i < biggestIndex; i++) {
			result = result + this.count[i];
		}
		return result;
	}

	/** Returns the number of UNIQUE elements in this collection (i.e., not including duplicates). */
	public int unique () {
		return biggestIndex;
	}

	/** Returns an array containing all of the UNIQUE elements in this collection. */
	public Object[] toArray () {
		throw new UnsupportedOperationException();
	}

	/** Throws an UnsupportedOperationException. */
	public Object[] toArray ( Object[] a  ) {
		throw new UnsupportedOperationException();
	}
	
/* The following override methods inherited from Object: */

	/** Throws an UnsupportedOperationException. Overrides Object.clone(). */
	protected Object clone() {
		throw new UnsupportedOperationException();
	}
	
	/** Throws an UnsupportedOperationException. Overrides Object.finalize(). */
	protected void finalize () {
		throw new UnsupportedOperationException();
	}
	
	/** Returns a stringy representation of this MSet. Overrides Object.toString(). */
	public String toString () {
		String result = "";
		for (int i = 0; i < biggestIndex; i++) {
		    result = result + "<" + uniqueObjects[i] + ", " + count[i] + "> ";
		}
		return result;
	}
	
}