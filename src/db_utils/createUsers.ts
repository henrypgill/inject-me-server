import { DbUser } from "./DbTypes";

export function getUsers() {
    const firstNames = [
        "Emma",
        "Liam",
        "Olivia",
        "Noah",
        "Ava",
        "Isabella",
        "Sophia",
        "Mia",
        "Charlotte",
        "Amelia",
        "Harper",
        "Evelyn",
        "Abigail",
        "Emily",
        "Elizabeth",
        "Sofia",
        "Avery",
        "Ella",
        "Scarlett",
        "Grace",
        "Chloe",
        "Victoria",
        "Riley",
        "Aria",
        "Lily",
        "Hannah",
        "Layla",
        "Lila",
        "Zoe",
        "Samantha",
        "Addison",
        "Natalie",
        "Luna",
        "Brooklyn",
        "Zoey",
        "Penelope",
        "Bella",
        "Stella",
        "Nova",
        "Everly",
        "Leah",
        "Aubrey",
        "Willow",
        "Eleanor",
        "Nora",
        "Hazel",
        "Maya",
        "Ellie",
        "Paisley",
        "Hailey",
    ];

    const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Miller",
        "Davis",
        "Garcia",
        "Rodriguez",
        "Martinez",
        "Hernandez",
        "Lopez",
        "Gonzalez",
        "Wilson",
        "Anderson",
        "Thomas",
        "Taylor",
        "Moore",
        "Jackson",
        "Martin",
        "Lee",
        "Perez",
        "Thompson",
        "White",
        "Harris",
        "Sanchez",
        "Clark",
        "Ramirez",
        "Lewis",
        "Robinson",
        "Walker",
        "Young",
        "Hall",
        "Allen",
        "King",
        "Wright",
        "Scott",
        "Torres",
        "Nguyen",
        "Hill",
        "Adams",
        "Nelson",
        "Baker",
        "Hall",
        "Rivera",
        "Mitchell",
        "Carter",
        "Green",
        "Turner",
        "Phillips",
        "Campbell",
    ];

    const randomName = () => [
        randomElement(firstNames),
        randomElement(lastNames),
    ];

    function randomElement(arr: string[]): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    const passwords = [
        "Dance",
        "Sing",
        "Laugh",
        "Jump",
        "Glide",
        "Whisper",
        "Dream",
        "Explore",
        "Glisten",
        "Sparkle",
        "Delight",
        "Radiate",
        "Wander",
        "Giggle",
        "Cherish",
        "Marvel",
        "Savor",
        "Pause",
        "Breathe",
        "Leap",
        "Twinkle",
        "Roam",
        "Serenade",
        "Journey",
        "Greet",
        "Glisten",
        "Rejoice",
        "Glisten",
        "Admire",
        "Float",
        "Ponder",
        "Unwind",
        "Dazzle",
        "Pirouette",
        "Glisten",
        "Drift",
        "Dazzle",
        "Enchant",
        "Savor",
        "Climb",
        "Twirl",
        "Glisten",
        "Marvel",
        "Flourish",
        "Cascade",
        "Radiate",
        "Chuckle",
        "Blossom",
        "Glisten",
        "Play",
        "Wonder",
        "Glisten",
    ];

    const users: DbUser[] = passwords.map((usersPassword) => {
        const usersName = randomName();
        return {
            user_id: -1,
            first_name: usersName[0],
            last_name: usersName[1],
            password: usersPassword,
        };
    });

    return users;
}

export function getInsertUsersQuery() {
    const users = getUsers();
    const userValuesString = users
        .map(
            (user) =>
                `('${user.first_name}', '${user.last_name}', '${user.password}')`
        )
        .join(",\n ");
    const insertDataString = `INSERT INTO users\n   (first_name, last_name, password) VALUES ${userValuesString}\nRETURNING *;`;

    return insertDataString;
}

// console.log(getInsertUsersQuery());
