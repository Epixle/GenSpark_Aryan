package characters;

public class Archer extends Fighter{
    public Archer(String name) {
        super(name, 25, 10, 2, 10, 15);
    }

    @Override
    public String getType() {
        return "Archer";
    }
}
