OBJECT-ORIENTED PROGRAMMING MANAGEMENT SYSTEM

This project creates a Management System that creates student and course objects
with OOP. The System stores these details that it can then use make, change, delete,
or view these objects or have them interact with each other as well, listing details
such as students enrolling/withdrawing from courses or displaying either the courses
a student is taking or the students within a course.


FILE COMPILATION AND EXECUTION

To run Main.java, you can either open a new project into IntelliJ/another IDE and copy the
files (StudentManagementSystem.java, Course.java, and Student.java) into the src folder to
run the program; or export the files into a location accessible by a terminal with JDK
configured (with no other Java files containing a main method) and run:

1. javac StudentManagementSystem.java
2. java StudentManagementSystem

Inputting these lines into the CLI or starting the project in the IDE should start up the program.


ASSUMPTIONS AND DESIGN DECISIONS

I believe the only assumption I am making in this code is that the input values the user
gives for the String values, such as the student's name, student's date of birth, and course
title, are valid strings. I am not checking the strings for any validation apart from making
sure that it is not empty, but other than that the user can put in anything. I did this
only because String can only be gotten from nextLine which reads everything and so is much
harder to validate as compared to other reads like nextInt or nextDouble.

As for design decisions, some of the main ones is things like choosing HashMap over ArrayList
since it is much faster at retrieving information and does not contain duplicates, so the user
can't put multiple of the same ID in when it is supposed to be unique.