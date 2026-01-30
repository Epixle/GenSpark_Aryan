import java.util.HashMap;

public class Student {
    private final int ID;
    private String name;
    private String dob;
    private final HashMap<Integer, Course> courses;

    public Student(int ID, String name, String dob) {
        this.ID = ID;
        this.name = name;
        this.dob = dob;
        courses = new HashMap<>();
    }

    public int getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public HashMap<Integer, Course> getCourses() {
        return courses;
    }

    public void addCourse(Course course) {
        courses.put(course.getCourseID(), course);
    }

    public void removeCourse(int ID) {
        courses.remove(ID);
    }
}
