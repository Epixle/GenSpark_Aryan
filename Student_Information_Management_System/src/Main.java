import java.util.InputMismatchException;
import java.util.Scanner;
import java.io.File;
import java.io.FileWriter;
import java.io.FileNotFoundException;
import java.io.IOException;

class Main {
    static int[] ids = new int[100];
    static String[] names = new String[100];
    static int[] ages = new int[100];
    static double[] grades = new double[100];

    // Keeps track of the current number of students
    static int studentCount = 0;

    static String fileName = null;
    static boolean updateFileAfterRead = false;

    public static void main(String[] args) {
        // This part is just so I can do javac Main.java and java Main when I am in the terminal in the src folder
        File terminalFileName = new File("students.txt");
        File intelliJFileName = new File("src/students.txt");
        if (terminalFileName.exists()) {
            fileName = "students.txt";
        } else if (intelliJFileName.exists()) {
            fileName = "src/students.txt";
        }

        // Read and process students.txt
        readFile();

        Scanner scanner = new Scanner(System.in);
        int choice = 0;

        // Ask the user to make a choice of what changes to make until they exit
        while (choice != 6) {
            System.out.println("""
                    What do you want to do?
                    \t1. Add a Student
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
                    addStudent();
                    break;
                case 2:
                    viewStudents();
                    break;
                case 3:
                    searchStudentByID();
                    break;
                case 4:
                    updateStudent();
                    break;
                case 5:
                    deleteStudent();
                    break;
                case 6:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }
    }

    /*
        Add a student to the array. Ask the user about the information, then put it at the first open spot
        of each array. If there are no open spots left or if the ID is non-unique, fails to add the new student.
     */
    public static void addStudent() {
        // Check if at capacity
        if (studentCount == 100) {
            System.out.println("Too many students, can't add more!");
            return;
        }

        Scanner scanner = new Scanner(System.in);

        try {
            System.out.println("What is the ID of the student?");
            int ID = scanner.nextInt();
            scanner.nextLine();     // Makes sure empty space from nextInt isn't put into student name

            System.out.print("Checking if ID is in use... ");
            if (getStudent(ID, false) >= 0) {
                System.out.println("A student is using this ID, cannot use again.");
                return;
            }

            // Gets values and puts them into placeholders first to make sure every input is valid
            System.out.println("ID is available.\n\nWhat is the name of the student?");
            String name = scanner.nextLine();

            System.out.println("What is the age of the student?");
            int age = scanner.nextInt();
            if (age < 0)
                throw new InputMismatchException();

            System.out.println("What is the grade of the student?");
            double grade = scanner.nextDouble();
            if (grade < 0 || 100 < grade)
                throw new InputMismatchException();

            // If inputs are valid, put into array
            ids[studentCount] = ID;
            names[studentCount] = name;
            ages[studentCount] = age;
            grades[studentCount] = grade;

            studentCount++;

            viewStudents();
            updateFile();
        } catch (NumberFormatException | InputMismatchException e) {
            // String numbers parsing error handling
            System.out.println("Invalid input: could not be parsed");
        } catch (Exception e) {
            System.out.printf("Unknown input exception: %s\n\n", e);
        }
    }

    // Prints out the information of every student.
    public static void viewStudents() {
        Scanner scanner = new Scanner(System.in);

        for(int i = 0; i < studentCount; i++) {
            System.out.printf("%d %s %d %.1f\n", ids[i], names[i], ages[i], grades[i]);
        }
    }

    // Prints out the information of a student based on their corresponding ID. ID obtained through user input.
    public static void searchStudentByID() {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.println("What is the ID of the student?");
            int ID = scanner.nextInt();
            int student = getStudent(ID, true);

            if (student < 0)
                return;

            System.out.printf("%d %s %d %.1f\n", ids[student], names[student], ages[student], grades[student]);
        } catch (NumberFormatException | InputMismatchException e) {
            // String numbers parsing error handling
            System.out.println("Invalid input: could not be parsed");
        } catch (Exception e) {
            System.out.printf("Unknown input exception: %s\n\n", e);
        }

    }

    /*
        Updates a student's information from one of the arrays. Gets user ID input to determine which student.
        Asks user which of the 3 information (name, age, or grade) to change and the value to change it with.
        Cannot change which this program considers to be the focal point of a student's information.
     */
    public static void updateStudent() {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.println("What is the ID of the student?");
            int ID = scanner.nextInt();
            int student = getStudent(ID, true);

            if (student < 0)
                return;

            int choice = 0;

            // Ask user values to change until they exit
            while (choice != 4) {
                System.out.println("""
                    What would you like to update?
                    \t1. Name
                    \t2. Age
                    \t3. Grade
                    \t4. Exit
                    Enter a number:""");

                choice = scanner.nextInt();
                scanner.nextLine();

                // Depending on choice, get value user wants to change to, validate it, and change if valid
                switch (choice) {
                    case 1:
                        System.out.println("Enter the updated name of the student");
                        names[student] = scanner.nextLine();
                        break;
                    case 2:
                        System.out.println("Enter the updated age of the student");
                        int age = scanner.nextInt();
                        if (age < 0)
                            throw new InputMismatchException();

                        ages[student] = age;
                        break;
                    case 3:
                        System.out.println("Enter the updated grade of the student");
                        double grade = scanner.nextDouble();
                        if (grade < 0 || 100 < grade)
                            throw new InputMismatchException();

                        grades[student] = grade;
                        break;
                    default:
                        System.out.println("Input not recognized, try again");
                        break;
                }
            }

            viewStudents();
            updateFile();
        } catch (NumberFormatException | InputMismatchException e) {
            // String numbers parsing error handling
            System.out.println("Invalid input: could not be parsed");
        } catch (Exception e) {
            System.out.printf("Unknown input exception: %s\n\n", e);
        }
    }

    /*
        Delete a student from the arrays. Get user input of ID of student user wants to delete.
        Gets position of student in parallel arrays through ID and removes from all.
        Shifts array to adjust to empty space.
     */
    public static void deleteStudent() {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.println("What is the ID of the student?");
            int ID = scanner.nextInt();
            int student = getStudent(ID, true);

            if (student < 0)
                return;

            // Can get rid of target, so replace it with the last student.
            ids[student] = ids[studentCount - 1];
            names[student] = names[studentCount - 1];
            ages[student] = ages[studentCount - 1];
            grades[student] = grades[studentCount - 1];

            // Last student can be set to null
            ids[studentCount - 1] = 0;
            names[studentCount - 1] = null;
            ages[studentCount - 1] = 0;
            grades[studentCount - 1] = 0.0;

            studentCount--;

            viewStudents();
            updateFile();
        } catch (NumberFormatException | InputMismatchException e) {
            // String numbers parsing error handling
            System.out.println("Invalid input: could not be parsed");
        } catch (Exception e) {
            System.out.printf("Unknown input exception: %s\n\n", e);
        }
    }

    /*
        This is a helper function that simply gets the position of the student's information within the parallel arrays
        @param ID: The ID of the student you are trying to search for
        @param statement: A simple boolean so console doesn't need to see unnecessary comment when adding students
        @return An int value of the position of the student with the corresponding ID (-1 if student is not found)
     */
    public static int getStudent(int ID, boolean statement) {
        // Iterate through every ID in the array until a match is found
        for (int i = 0; i < studentCount; i++)
            if (ids[i] == ID)
                return i;

        if (statement)
            System.out.println("No student with this ID.");

        return -1;
    }

    // This function reads students.txt and processes each line to add the students to the array
    public static void readFile() {
        File file = new File(fileName);

        try (Scanner fileScanner = new Scanner(file)) {
            int row = 0;    // Keep track of the rows just to see where error lines are

            while (fileScanner.hasNextLine() && studentCount < 100) {
                String line = fileScanner.nextLine().trim();
                row++;

                // Skip empty lines
                if (line.isEmpty())
                    continue;

                // If line does not have 4 values after splitting on comma, entry is incomplete; line is skipped
                String[] parts = line.split(",", 4);
                if (parts.length != 4) {
                    System.out.println("Invalid entry on line " + row + ": Values mismatch");
                    continue;
                }

                try {
                    // Get respective values while converting type if needed; if code cannot parse, line is skipped
                    int id = Integer.parseInt(parts[0].trim());
                    String name = parts[1].trim();
                    int age = Integer.parseInt(parts[2].trim());
                    double grade = Double.parseDouble(parts[3].trim());

                    // If ID is a repeat, cannot add student; line is skipped
                    if (getStudent(id, false) >= 0) {
                        System.out.println("Invalid entry on line " + row + ": ID repeat");
                        continue;
                    }

                    // Add values to the arrays
                    ids[studentCount] = id;
                    names[studentCount] = name;
                    ages[studentCount] = age;
                    grades[studentCount] = grade;

                    studentCount++;
                } catch (NumberFormatException | InputMismatchException e) {
                    // String numbers parsing error handling
                    System.out.println("Invalid entry on line " + row + ": Numbers could not be parsed");
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("Could not find students.txt file");
        }

        viewStudents();

        // Updates the file according to the instance variable
        if (updateFileAfterRead)
            updateFile();
    }

    public static void updateFile() {
        try (FileWriter writer = new FileWriter(fileName)) {
            for (int i = 0; i < studentCount; i++)
                writer.write(ids[i] + "," + names[i] + "," + ages[i] + "," + grades[i] + "\n");
        } catch (IOException e) {
            System.out.println("An error occurred while writing to students.txt");
        }
    }
}