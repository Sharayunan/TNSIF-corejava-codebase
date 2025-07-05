package StaticDemo;

public class MyClass {
	private int section; // nonstatic variable or instance
	
	private static int srNo; // static class or variable
	
	//static block
	
	static
	{
	
		System.out.println("----Within Static block----");
	
		srNo=1000;
	
		// section 101;
	
	}
	
	//default constructor
	
	public MyClass() {
	
	System.out.println("---Within Default Constructor----");
	srNo++;
	section++;
	}

	@Override
	public String toString() {
		return "MyClass [section=" + section + "]";
	}
	 static void display() {
		 
		 System.out.println("Serial No:"+ srNo);

	}
	
	
	
	 }
