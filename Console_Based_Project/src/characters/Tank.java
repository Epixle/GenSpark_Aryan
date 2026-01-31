package characters;

public class Tank extends Fighter{
    public Tank(String name) {
        super(name, 50, 5, 7, 5, 10);
    }

    @Override
    public String getType() {
        return "Tank";
    }
}
