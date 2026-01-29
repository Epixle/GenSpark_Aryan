import java.util.HashMap;

public class Student {
    private int ID;
    private String name;
    private String dob;
    private HashMap<Integer, Course> courses;

    public Student(int ID, String name, String dob) {
        this.ID = ID;
        this.name = name;
        this.dob = dob;
        courses = new HashMap<>();
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
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
}
