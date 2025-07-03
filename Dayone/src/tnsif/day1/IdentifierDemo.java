package tnsif.day1;

public class IdentifierDemo {
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		

		// Variable declarations - invalid identifier examples:

        // int for = 13;   // ❌ Error: 'for' is a keyword and cannot be used as a variable name
        // int num 1 = 13; // ❌ Error: Spaces are not allowed in identifiers
        // int @num = 13;  // ❌ Error: Special characters are not allowed except '$' and '_'

        // Valid identifier examples:
        int $num1 = 20;
        String studentName = "Heti"; // Recommended camelCase for variable naming
        int FOR = 12; // Valid, but not recommended to use all caps unless it's a constant

        // Output
        System.out.println("Value of the number variable is: " + $num1);
        System.out.println("Student Name is: " + studentName);
        System.out.println("Value of FOR is: " + FOR);
    }


}
