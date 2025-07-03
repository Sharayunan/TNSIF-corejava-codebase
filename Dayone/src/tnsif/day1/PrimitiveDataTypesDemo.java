package tnsif.day1;

public class PrimitiveDataTypesDemo {
	
public static void main(String[] args) {
		
		// byte takes 1 byte = 8 bits => Range: -128 to 127
        byte byteMax = 127;
        byte byteMin = -128;

        System.out.println("Min range of byte is: " + byteMin +
                "  Max range of byte is: " + byteMax);

        // short takes 2 bytes => Range: -32,768 to 32,767
        short shortMax = 32767;
        short shortMin = -32768;

        System.out.println("Min range of short is: " + shortMin +
                "  Max range of short is: " + shortMax);

        // int takes 4 bytes => Range: -2,147,483,648 to 2,147,483,647
        int maxInt = 2147483647;
        int minInt = -2147483648;

        System.out.println("Min range of int is: " + minInt +
                "  Max range of int is: " + maxInt);

        // long takes 8 bytes => Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
        long maxLong = 9223372036854775807L;
        long minLong = -9223372036854775808L;

        System.out.println("Min range of long is: " + minLong +
                "  Max range of long is: " + maxLong);

        // float takes 4 bytes, precision up to ~6-7 digits
        float f = 3234.141243278345f; // 'f' suffix is required
        // double takes 8 bytes, precision up to ~15-16 digits
        double d = 3456.141245123456789; // no suffix needed for double

        System.out.println("Float value is: " + f);
        System.out.println("Double value is: " + d);

        // boolean values: true or false
        boolean flag = false;
        boolean flag2 = true;

        System.out.println("Boolean flag is: " + flag);
        System.out.println("Boolean flag2 is: " + flag2);
    
	}


}
