import java.util.Scanner;
import java.util.HashMap;
import java.util.ArrayList;

public class StudentManagementSystem {
    HashMap<Integer, Student> students = new HashMap<>();
    HashMap<Integer, Course> courses = new HashMap<>();

    public static void main() {
        Scanner scanner = new Scanner(System.in);
        int choice = 0;

        // Ask the user to make a choice of what changes to make until they exit
        while (choice != 6) {
            System.out.println("""
                    What do you want to do?
                    \t1. 
                    \t2. View Students
                    \t3. Search a Student by ID
                    \t4. Update a Student's Information
                    \t5. Delete a Student
                    \t6. Exit
                    Enter a number:""");

            choice = scanner.nextInt();

            // Call the corresponding method according to the user's choice
            switch (choice) {
                case 1:
//                    addStudent();
                    break;
                case 2:
//                    viewStudents();
                    break;
                case 3:
//                    searchStudentByID();
                    break;
                case 4:
//                    updateStudent();
                    break;
                case 5:
//                    deleteStudent();
                    break;
                case 6:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }

        scanner.close();
    }
}