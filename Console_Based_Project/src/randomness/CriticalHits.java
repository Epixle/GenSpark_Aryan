package randomness;

import characters.Fighter;

import java.util.Random;

public class CriticalHits {
    private final Random random = new Random();

    /*
        Returns if the fighter has made a critical hit according to their crit rate
        @param attacker: The fighter passed to get their crit rate
     */
    public boolean isCrit(Fighter attacker) {
        int roll = random.nextInt(100); // 0..99
        return roll < attacker.getCritChance();
    }
}