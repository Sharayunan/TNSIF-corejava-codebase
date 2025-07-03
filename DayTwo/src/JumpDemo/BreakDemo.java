package JumpDemo;

public class BreakDemo {

    public static void main(String[] args) {

        for (int i = 1; i < 10; i++) {
            System.out.println(i);
            System.out.println("Hello friends");

            // Break statement exits the loop after first iteration
            break;
        }

        System.out.println("Loop exited due to break.");
    }
}

