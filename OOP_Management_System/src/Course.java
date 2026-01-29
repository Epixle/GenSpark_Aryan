import java.util.HashMap;

public class Course {
    private int courseID;
    private String title;
    private HashMap<Integer, Student> students;

    public Course(int courseID, String title) {
        this.courseID = courseID;
        this.title = title;
        this.students = new HashMap<>();
    }

    public int void addStudent(Student student) {
        students.add(student);
    }

    public int getCourseID() {
        return courseID;
    }

    public void setCourseID(int courseID) {
        this.courseID = courseID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
