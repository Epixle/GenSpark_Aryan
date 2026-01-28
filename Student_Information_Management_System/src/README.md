STUDENT INFORMATION AND MANAGEMENT SYSTEM PROJECT

This project intends to create a student management system which utilizes parallel arrays to contain
information about students such as their ID, name, age, and grade. This information is stored in the
students.txt file which is loaded into the program and can be manipulated by the user by adding a
student, viewing the information of all students, searching for a specific student by their ID, 
updating a student's information, and deleting a student's information, where the resulting information
can be stored back into the students.txt file.


FILE COMPILATION AND EXECUTION

To run Main.java, you can either open a new project into IntelliJ/another IDE, copy both Main.java and
students.txt into the src folder, and run the program; or export the files into a location accessible by
a terminal with JDK configured (with no other Java files named Main) and run:

1. javac Main.java
2. java Main

Inputting these lines into the CLI or starting the project in the IDE should start up the program.


TEXT FILE STARTING VALUES

students.txt starts with a few lines of students and their values to show how readFile processes the file.
The first three rows include students with valid information and enter into the arrays. Lines 4-6 contain
errors to test the code on its validation process.

* Line 4: Letter instead of an ID - Code successfully rejects and errors out invalid value.
* Line 5: Blank line to see if it gets processed - Code successfully ignores line.
* Line 6: Less than 4 values - Code successfully rejects and errors out value mismatch.

These lines/errors do not get removed in the txt file even though the arrays contain only the valid lines
for testing purposes and so the user can see where the errors are incorrect and what to adjust to run again.
The values correct once updateFile is run from the addStudent, deleteStudent, and updateStudent methods.
If programmer wants to update after reading the file, can change *updateFileAfterRead* bool to true.