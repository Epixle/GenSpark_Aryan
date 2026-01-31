package characters;

import randomness.CriticalHits;

public abstract class Fighter {
    private final String name;
    private int hp;
    private final int maxHp;
    private final int damage;
    private final int defense;
    private final int speed;
    private final int critChance;

    protected Fighter(String name, int maxHp, int damage, int defense, int speed, int critChance) {
        this.name = name.trim();
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;
        this.critChance = critChance;
    }

    public String getName() {
        return name;
    }

    public int getHp() {
        return hp;
    }

    public int getMaxHp() {
        return maxHp;
    }

    public int getDamage() {
        return damage;
    }

    public int getDefense() {
        return defense;
    }

    public int getSpeed() {
        return speed;
    }

    public int getCritChance() {
        return critChance;
    }

    public boolean isAlive() {
        return hp > 0;
    }

    public void takeDamage(int amount) {
        hp = Math.max(0, hp - Math.max(0, amount));
    }

    public int attack(Fighter target, boolean isCrit) {
        int damage = isCrit? getDamage() * 2 : getDamage();

        damage = Math.max(0, damage - target.getDefense());
        target.takeDamage(damage);

        return damage;
    }

    public abstract String getType();

    @Override
    public String toString() {
        return String.format("%s (%s) HP:%d/%d DMG:%d DEF:%d SPD:%d CRIT:%d%%",
                name, getType(), hp, maxHp, damage, defense, speed, critChance);
    }
}