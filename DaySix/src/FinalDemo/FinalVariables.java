package FinalDemo;

public class FinalVariables {
	
//	final int a;  // final instance varible muts be initialized
	
	final int x=100;
	
	
	//declare a static blank final varible
	final static int y;
	
	final static int z=10;
	
	// instance method
	void change()
	{
		//x=30;
		//z=50;
	}

	@Override
	public String toString() {
		return "FinalVariables [x=" + x + ", y=" + y + "]";
	}
	
	
	//declare a static block 
     static
     {
    	 y=20;
    	// z=80; once initialized cannot reassigned
    	 System.out.println("value of Y : "+ y);
     }
	
	

}
