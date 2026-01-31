package characters;

public class Goblin extends Fighter{
    public Goblin(String name) {
        super(name, 12, 6, 2, 12, 20);
    }

    @Override
    public String getType() {
        return "Goblin";
    }
}
