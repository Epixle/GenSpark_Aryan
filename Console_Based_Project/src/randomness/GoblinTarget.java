package randomness;

import characters.Fighter;

import java.util.List;
import java.util.Random;

public class GoblinTarget {
    private final Random rng = new Random();

    // Goblins pick a random fighter on the user's side
    public Fighter pickRandomTarget(List<Fighter> fighters) throws IndexOutOfBoundsException {
        // If no fighters, return null (shouldn't come here, but just in case)
        if (fighters == null || fighters.isEmpty())
            throw new IndexOutOfBoundsException();

        // If there is only one fighter, just choose them
        if (fighters.size() == 1)
            return fighters.getFirst();

        // Randomly choose one of the remaining fighters to attack
        return fighters.get(rng.nextInt(fighters.size()));
    }
}