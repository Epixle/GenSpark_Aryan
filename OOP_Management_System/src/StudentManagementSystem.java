import java.util.Scanner;
import java.util.HashMap;

class StudentManagementSystem {
    // HashMaps that contains all students and courses
    static HashMap<Integer, Student> students;
    static HashMap<Integer, Course> courses;

    public static void main(String[] args) {
        // Initialize HashMaps
        students = new HashMap<>();
        courses = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        int choice = 0;

        // Ask the user to make a choice of what changes to make until they exit
        while (choice != 4) {
            System.out.println("""
                    What do you want to do?
                    \t1. Manage a student's information
                    \t2. Manage a course's information
                    \t3. Enrollment information
                    \t4. Exit
                    Enter a number:""");

            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            // Call the corresponding method according to the user's choice
            switch (choice) {
                case 1:
                    studentInfo(scanner);
                    break;
                case 2:
                    courseInfo(scanner);
                    break;
                case 3:
                    enrollment(scanner);
                    break;
                case 4:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }
    }

    public static void studentInfo(Scanner scanner) {
        int choice = 0;

        // Ask the user to make a choice of what changes to make until they exit
        while (choice != 6) {
            System.out.println("""
                    What do you want to do?
                    \t1. Add a student
                    \t2. Update student information
                    \t3. Delete a student
                    \t4. View student by ID
                    \t5. View all students
                    \t6. Exit
                    Enter a number:""");

            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            // Call the corresponding method according to the user's choice
            switch (choice) {
                case 1:
                    addStudent(scanner);
                    break;
                case 2:
                    updateStudent(scanner);
                    break;
                case 3:
                    deleteStudent(scanner);
                    break;
                case 4:
                    viewStudent(scanner);
                    break;
                case 5:
                    viewStudent();
                    break;
                case 6:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }
    }

    // Get information on a student and add them to the students list
    public static void addStudent(Scanner scanner) {
        System.out.println("What is the ID of the student?");

        if (!scanner.hasNextInt()) {
            System.out.println("Invalid input: could not be parsed");
            scanner.nextLine();

            return;
        }

        int ID = scanner.nextInt();
        scanner.nextLine();

        if (ID <= 0) {
            System.out.println("ID cannot be less than 0");
            return;
        }

        if (students.containsKey(ID)) {
            System.out.println("A student is using this ID, cannot use again.");
            return;
        }

        // Gets values and puts them into placeholders first to make sure every input is valid
        System.out.println("ID is available.\nWhat is the name of the student?");
        String name = scanner.nextLine();

        if (name.isEmpty()) {
            System.out.println("Must have a name\n");
            return;
        }

        System.out.println("What is the date of birth of the student?");
        String dob = scanner.nextLine();

        if (dob.isEmpty()) {
            System.out.println("Must have a date of birth\n");
            return;
        }

        students.put(ID, new Student(ID, name, dob));

        viewStudent();
    }

    // Update either the name or DOB of a student as long as new inputs are valid on a student in students
    public static void updateStudent(Scanner scanner) {
        Student student = getStudent(scanner);

        if (student == null)
            return;

        int choice = 0;

        while (choice != 3) {
            System.out.println("""
                    What would you like to update (To change course info, go to Enrollment)?
                    \t1. Name
                    \t2. Date of Birth
                    \t3. Exit
                    Enter a number:""");

            if (!scanner.hasNextInt()) {
                System.out.println("Invalid input: could not be parsed");

                // If failed on nextInt and there is a line, parse it
                if (scanner.hasNextLine())
                    scanner.nextLine();

                continue;
            }

            choice = scanner.nextInt();
            scanner.nextLine();

            // Depending on choice, get value user wants to change to, validate it, and change if valid
            switch (choice) {
                case 1:
                    System.out.println("Enter the updated name of the student");
                    student.setName(scanner.nextLine());
                    break;
                case 2:
                    System.out.println("Enter the updated date of birth of the student");
                    student.setDob(scanner.nextLine());
                    break;
                case 3:
                    break;
                default:
                    System.out.println("Input not recognized, try again");
                    continue;
            }

            viewStudent();
        }
    }

    public static void deleteStudent(Scanner scanner) {
        Student student = getStudent(scanner);

        if (student == null)
            return;

        for (Course course : student.getCourses().values())
            course.removeStudent(student.getID());

        students.remove(student.getID());

        viewStudent();
    }

    // See the information such as ID, name, DOB, and course list of a student by their ID
    public static void viewStudent(Scanner scanner) {
        Student student = getStudent(scanner);

        if (student == null)
            return;

        System.out.printf("%d %s %s\n", student.getID(), student.getName(), student.getDob());

        if (student.getCourses().isEmpty()) {
            System.out.println("Student is not enrolled in any classes yet");
        } else {
            System.out.printf("%s is taking + ", student.getName());

            for (Course course : student.getCourses().values()) {
                System.out.printf("%s, ", course.getTitle());
            }

            // Adding new line so doesn't append on course list print
            System.out.println("\n");
        }
    }

    // See the information of all students
    public static void viewStudent() {
        for (Student student : students.values()) {
            System.out.printf("%d %s %s\n", student.getID(), student.getName(), student.getDob());

            if (student.getCourses().isEmpty()) {
                System.out.println("Student is not enrolled in any classes yet");
            } else {
                System.out.printf("%s is taking + ", student.getName());

                for (Course course : student.getCourses().values()) {
                    System.out.printf("%s, ", course.getTitle());
                }

                // Adding new line so doesn't append on course list print
                System.out.println();
            }
        }
    }

    public static void courseInfo(Scanner scanner) {
        int choice = 0;

        // Ask the user to make a choice of what changes to make until they exit
        while (choice != 6) {
            System.out.println("""
                    What do you want to do?
                    \t1. Add a course
                    \t2. Update course title
                    \t3. Delete a course
                    \t4. View course by ID
                    \t5. View all courses
                    \t6. Exit
                    Enter a number:""");

            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            // Call the corresponding method according to the user's choice
            switch (choice) {
                case 1:
                    addCourse(scanner);
                    break;
                case 2:
                    updateCourse(scanner);
                    break;
                case 3:
                    deleteCourse(scanner);
                    break;
                case 4:
                    viewCourse(scanner);
                    break;
                case 5:
                    viewCourse();
                    break;
                case 6:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }
    }

    // Get information on a course and add it to the courses list
    public static void addCourse(Scanner scanner) {
        System.out.println("What is the ID of the course?");

        if (!scanner.hasNextInt()) {
            System.out.println("Invalid input: could not be parsed");
            scanner.nextLine();

            return;
        }

        int ID = scanner.nextInt();
        scanner.nextLine();

        if (ID <= 0) {
            System.out.println("ID cannot be less than 0");
            return;
        }

        if (courses.containsKey(ID)) {
            System.out.println("A course already has this ID, cannot use again.");
            return;
        }

        // Gets values and puts them into placeholders first to make sure every input is valid
        System.out.println("ID is available.\nWhat is the title of the Course?");
        String title = scanner.nextLine();

        Course c = new Course(ID, title);
        courses.put(ID, c);

        viewCourse();
    }

    // Update the title as long as new input is valid on a course in courses
    public static void updateCourse(Scanner scanner) {
        Course course = getCourse(scanner);

        if (course == null)
            return;

        System.out.println("Enter the updated title of the course");

        course.setTitle(scanner.nextLine());

        viewCourse();
    }

    public static void deleteCourse(Scanner scanner) {
        Course course = getCourse(scanner);

        if (course == null)
            return;

        for (Student student : course.getStudents().values())
            student.removeCourse(course.getCourseID());

        courses.remove(course.getCourseID());

        viewCourse();
    }

    // See the information such as course ID, title, and student list of a course by its ID
    public static void viewCourse(Scanner scanner) {
        Course course = getCourse(scanner);

        if (course == null)
            return;

        System.out.printf("%d %s\n", course.getCourseID(), course.getTitle());

        if (course.getStudents().isEmpty()) {
            System.out.println("No students enrolled in this class yet");
        } else {
            System.out.printf("Course %s roster:\n", course.getTitle());

            for (Student student : course.getStudents().values()) {
                System.out.printf("%s\n", student.getName());
            }

            // Adding new line so doesn't append on course list print
            System.out.println();
        }
    }

    // See the information of all courses
    public static void viewCourse() {
        for (Course course : courses.values()) {
            System.out.printf("%d %s\n", course.getCourseID(), course.getTitle());

            if (course.getStudents().isEmpty()) {
                System.out.println("No students enrolled in this class yet");
            } else {
                System.out.printf("Course %s roster:\n", course.getTitle());

                for (Student student : course.getStudents().values()) {
                    System.out.printf("%s\n", student.getName());
                }

                // Adding new line so doesn't append on course list print
                System.out.println();
            }
        }
    }

    public static void enrollment(Scanner scanner) {
        int choice = 0;

        // Ask the user to make a choice of what changes to make until they exit
        while (choice != 5) {
            System.out.println("""
                    What do you want to do?
                    \t1. Enroll a student in a course
                    \t2. Withdraw a student from a course
                    \t3. Display all courses a student is enrolled in
                    \t4. Display all students within a course
                    \t5. Exit
                    Enter a number:""");

            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            // Call the corresponding method according to the user's choice
            switch (choice) {
                case 1:
                    enrollStudent(scanner);
                    break;
                case 2:
                    withdrawStudent(scanner);
                    break;
                case 3:
                    displayCoursesOfStudent(scanner);
                    break;
                case 4:
                    displayStudentsInCourse(scanner);
                    break;
                case 5:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }
    }

    public static void enrollStudent(Scanner scanner) {
        Student student = getStudent(scanner);
        if (student == null) {
            System.out.println("Could not find student with this ID");
            return;
        }

        Course course = getCourse(scanner);

        if (course == null) {
            System.out.println("Could not find course with this ID");
            return;
        }

        student.addCourse(course);
        course.addStudent(student);

        System.out.printf("Enrolled %s in course %s\n", student.getName(), course.getTitle());
    }

    public static void withdrawStudent(Scanner scanner) {
        Student student = getStudent(scanner);
        Course course = getCourse(scanner);

        if (student == null || course == null) {
            System.out.println("Could not find student or course");
            return;
        }

        student.removeCourse(course.getCourseID());
        course.removeStudent(student.getID());

        System.out.printf("Withdrew %s from course %s\n", student.getName(), course.getTitle());
    }

    public static void displayCoursesOfStudent(Scanner scanner) {
        Student student = getStudent(scanner);

        if (student == null)
            return;

        if (student.getCourses().isEmpty()) {
            System.out.println("Student is not enrolled in any courses");
            return;
        } else {
            System.out.printf("Student %s is enrolled in", student.getName());
            for (Course course : student.getCourses().values()) {
                System.out.printf("\nCourse ID %d: %s", course.getCourseID(), course.getTitle());
            }
        }

        System.out.println();
    }

    public static void displayStudentsInCourse(Scanner scanner) {
        Course course = getCourse(scanner);

        if (course == null)
            return;

        if (course.getStudents().isEmpty()) {
            System.out.println("No students taking this course");
            return;
        } else {
            System.out.printf("Students taking course %d %s:", course.getCourseID(), course.getTitle());
            for (Student student : course.getStudents().values()) {
                System.out.printf("\nStudent %d: %s", student.getID(), student.getName());
            }
        }

        System.out.println();
    }

    /*
        Helper method that asks the user for the ID of a student to retrieve from the students list.
        If found, returns student object, else null.
        @param scanner: Pass scanner from class calling this method.
     */
    static public Student getStudent(Scanner scanner) {
        System.out.println("What is the ID of the student?");

        if (!scanner.hasNextInt()) {
            System.out.println("Invalid input: could not be parsed");
            scanner.nextLine();

            return null;
        }

        int ID = scanner.nextInt();
        scanner.nextLine();

        if (ID <= 0) {
            System.out.println("ID cannot be less than 0");
            return null;
        }

        Student student = students.get(ID);

        if (student == null) {
            System.out.println("No student with this ID.");
            return null;
        }

        return student;
    }

    static public Course getCourse(Scanner scanner) {
        System.out.println("What is the ID of the course?");

        if (!scanner.hasNextInt()) {
            System.out.println("Invalid input: could not be parsed");
            scanner.nextLine();

            return null;
        }

        int ID = scanner.nextInt();
        scanner.nextLine();

        if (ID <= 0) {
            System.out.println("ID cannot be less than 0");
            return null;
        }

        Course course = courses.get(ID);

        if (course == null) {
            System.out.println("No course with this ID.");
            return null;
        }

        return course;
    }
}