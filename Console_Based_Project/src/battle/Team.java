package battle;

import characters.Fighter;

import java.util.ArrayList;
import java.util.List;

public class Team {
    private final ArrayList<Fighter> members = new ArrayList<>();

    public void add(Fighter f) {
        members.add(f);
    }

    public List<Fighter> getMembers() {
        return members;
    }

    public List<Fighter> living() {
        ArrayList<Fighter> alive = new ArrayList<>();

        for (Fighter f : members)
            if (f.isAlive())
                alive.add(f);

        return alive;
    }

    public boolean hasLiving() {
        for (Fighter f : members)
            if (f.isAlive())
                return true;

        return false;
    }
}
