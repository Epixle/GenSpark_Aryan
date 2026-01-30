import java.util.HashMap;

public class Course {
    private final int courseID;
    private String title;
    private final HashMap<Integer, Student> students;

    public Course(int courseID, String title) {
        this.courseID = courseID;
        this.title = title;
        this.students = new HashMap<>();
    }

    public int getCourseID() {
        return courseID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public HashMap<Integer, Student> getStudents() {
        return students;
    }

    public void addStudent(Student student) {
        students.put(student.getID(), student);
    }

    public void removeStudent(int ID) {
        students.remove(ID);
    }
}