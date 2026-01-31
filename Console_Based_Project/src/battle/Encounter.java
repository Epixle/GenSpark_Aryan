package battle;

import characters.Archer;
import characters.Fighter;
import characters.Goblin;
import characters.Tank;
import characters.Warrior;

import randomness.CriticalHits;
import randomness.GoblinTarget;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class Encounter {
    // Create each side of fighters and goblins
    private final Team fighters = new Team();
    private final Team goblins = new Team();

    private final CriticalHits criticalHits = new CriticalHits();
    private final GoblinTarget goblinTarget = new GoblinTarget();
    private final Scanner scanner = new Scanner(System.in);

    public void run() {
        int choice = 0;
        
        while (choice != 3) {
            System.out.println("""
                What would you like to do?
                \t1. Build Teams
                \t2. Fight
                \t3. Exit
                Enter a number:""");

            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            switch (choice) {
                case 1:
                    buildTeams();
                    break;
                case 2:
                    startFight();
                    break;
                case 3:
                    break;
                default:
                    System.out.println("Unknown input, try again");
            }
        }
    }

    private void buildTeams() {
        fighters.getMembers().clear();
        goblins.getMembers().clear();

        System.out.println("Build Fighters Team");
        addHeroes();

        System.out.println("Build Goblins Team");
        addGoblins();

        System.out.println("Teams created.");
        printTeams();
    }

    private void addHeroes() {
        int choice = 0;

        while (true) {
            System.out.println("""
                Do you want to add another fighter?
                \t1. Warrior
                \t2. Archer
                \t3. Tank
                \t4. Done
                Enter a number:""");

            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            if (choice == 4) {
                if (fighters.getMembers().isEmpty()) {
                    System.out.println("You must add at least 1 hero.");
                    choice = 0; // keep loop going

                    continue;
                }
                
                break;
            }

            System.out.println("What is the name of this fighter?");
            String name = scanner.nextLine();

            if(name.isEmpty()) {
                System.out.println("Cannot have an empty name");
                continue;
            }

            switch (choice) {
                case 1:
                    fighters.add(new Warrior(name));
                    break;
                case 2:
                    fighters.add(new Archer(name));
                    break;
                case 3:
                    fighters.add(new Tank(name));
                    break;
                default:
                    break;
            }
        }
    }

    private void addGoblins() {
        int goblinCount = 0;

        while (goblinCount < 1 || 10 < goblinCount) {
            System.out.println("How many goblins is your team fighting (1-10)?");

            if (scanner.hasNextInt()) {
                goblinCount = scanner.nextInt();
                scanner.nextLine();
            } else {
                scanner.nextLine(); // discard invalid input
                System.out.println("Invalid input, please try again");
                continue;
            }

            if (goblinCount < 1)
                System.out.println("Need at least one goblin to fight");

            if (goblinCount > 10)
                System.out.println("Too many goblins! Try between 1 and 10 goblins");
        }
        
        for (int i = 1; i <= goblinCount; i++) {
            Fighter g = new Goblin("" + i);
            
            goblins.add(g);
        }
    }

    private void printTeams() {
        System.out.println("\nFighters:");
        for (Fighter fighter : fighters.getMembers())
            System.out.printf("%s %s\n", fighter.getType(), fighter.getName());

        System.out.println("\nGoblins:");
        for (Fighter goblin : goblins.getMembers())
            System.out.println("Goblin " + goblin.getName());

        System.out.println();
    }

    private void startFight() {
        // If a team is empty before the fight, prompt user to build teams first
        if (fighters.getMembers().isEmpty() || goblins.getMembers().isEmpty()) {
            System.out.println("Build both teams first in the main menu.");
            return;
        }

        System.out.println("Start fight");
        
        while (fighters.hasLiving() && goblins.hasLiving()) {
            // Creates a turn order based on the speed of the fighters
            List<Fighter> turnOrder = buildTurnOrder(fighters.living(), goblins.living());

            
            for (Fighter attacker : turnOrder) {
                // If the fighter is dead, skip them
                if (!attacker.isAlive())
                    continue;
                
                // If a team has no more fighters left, end fight
                if (!fighters.hasLiving() || !goblins.hasLiving())
                    break;

                // Run different scripts depending on if next attacker is a human or goblin
                if (fighters.getMembers().contains(attacker))
                    humanTurn(attacker);
                else
                    goblinTurn(attacker);
            }

            // Print out remaining fighters and their status
            System.out.println("\nStatus:");
            printLivingStatus();
        }

        // Determine winner based on last team standing
        if (fighters.hasLiving()) {
            System.out.println("Fighters win!");
        } else {
            System.out.println("Goblins win!");
        }
    }

    private List<Fighter> buildTurnOrder(List<Fighter> livingHeroes, List<Fighter> livingGoblins) {
        ArrayList<Fighter> all = new ArrayList<>();
        all.addAll(livingHeroes);
        all.addAll(livingGoblins);

        Random random = new Random();
        all.sort(Comparator
                .comparingInt(Fighter::getSpeed).reversed()
                .thenComparingInt(x -> random.nextInt(1_000_000))
        );

        return all;
    }

    private void humanTurn(Fighter fighter) {
        List<Fighter> targets = goblins.living();

        // If no goblins left, return
        if (targets.isEmpty())
            return;

        Fighter target = null;

        // If there is only one opponent left, auto attack them
        if (targets.size() == 1) {
            target = targets.getFirst();
        } else {
            int i = 1;
            for (Fighter goblin : targets) {
                System.out.printf("%d - Goblin %s - HP: %d\n", i, goblin.getName(), goblin.getHp());
                i++;
            }

            System.out.println("""
                Which goblin would you like to attack?
                Please choose from the index of the goblin, not name
                Enter index of goblin:""");

            int choice = 0;

            // Choose a goblin between
            while (choice < 1 || targets.size() < choice) {
                if (scanner.hasNextInt()) {
                    choice = scanner.nextInt();
                    scanner.nextLine();
                    target = targets.get(choice - 1);
                } else {
                    scanner.nextLine(); // discard invalid input
                    System.out.println("Please choose one of the remaining goblins");
                }
            }
        }

        boolean crit = criticalHits.isCrit(fighter);
        int damage = fighter.attack(target, crit);

        printAttack(fighter, target, damage, crit);
    }

    private void goblinTurn(Fighter goblin) {
        List<Fighter> targets = fighters.living();

        // If there are no humans, return
        if (targets.isEmpty())
            return;

        // Goblins choose a target at random
        Fighter target = goblinTarget.pickRandomTarget(targets);

        boolean crit = criticalHits.isCrit(goblin);
        int damage = goblin.attack(target, crit);

        printAttack(goblin, target, damage, crit);
    }

    private void printAttack(Fighter attacker, Fighter target, int damage, boolean crit) {
        String critText = crit ? " CRIT!" : "";

        System.out.printf("\n%s %s hit %s %s for %d damage%s.\n%s HP: %d\n",
                attacker.getType(), attacker.getName(), target.getType(), target.getName(),
                damage, critText, target.getName(), target.getHp()
        );
    }

    private void printLivingStatus() {
        System.out.println("\nFighters alive:");

        for (Fighter f : fighters.living())
            System.out.printf("%s %s HP:%d\n", f.getType(), f.getName(), f.getHp());

        System.out.println("\nGoblins alive:");

        for (Fighter f : goblins.living()) {
            System.out.printf("Goblin %s HP:%d\n", f.getName(), f.getHp());
        }
    }
}
