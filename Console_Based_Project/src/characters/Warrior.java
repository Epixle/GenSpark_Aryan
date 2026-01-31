package characters;

public class Warrior extends Fighter {
    public Warrior(String name) {
        super(name, 35, 7, 3, 8, 15);
    }

    @Override
    public String getType() {
        return "Warrior";
    }
}
