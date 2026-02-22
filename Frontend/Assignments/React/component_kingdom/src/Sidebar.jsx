import Card from "./Card";

export default function Sidebar() {
    return (
        <aside className = "sidebar">
            <h2 className = "sectionTitle">Sidebar</h2>

            <Card title = "Fun Fact" content = "Fun Fact: Bats are the only mammal that can fly!"/>
        </aside>
    );
}