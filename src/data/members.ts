export interface Member {
    id: string;
    name: string;
    role: string;
    bio: string;
    persona: string;
    image: string;
}

export const members: Member[] = [
    { id: "sashank", name: "J. Sashank", role: "Team Lead & Architect", bio: "Orchestrating the chaos into code.", persona: "The Strategist", image: "/images/group-1.jpg" },
    { id: "savirthru", name: "D Savirthru", role: "Frontend Specialist", bio: "Crafting pixels with precision.", persona: "The Artist", image: "/images/group-2.jpg" },
    { id: "karthik", name: "Raskas S Karthik", role: "Backend Engineer", bio: "Building the backbone of our reality.", persona: "The Architect", image: "/images/group-3.jpg" },
    { id: "sai", name: "S Sai Vodapally", role: "Creative Director", bio: "Visionary behind the visuals.", persona: "The Visionary", image: "/images/group-1.jpg" },
    { id: "sameer", name: "Sameer", role: "Full Stack Dev", bio: "Connecting dots across the stack.", persona: "The Builder", image: "/images/group-2.jpg" },
    { id: "shriyan", name: "Shriyan Bohra", role: "UI/UX Designer", bio: "Designing experiences that matter.", persona: "The Designer", image: "/images/group-3.jpg" },
    { id: "sathya", name: "Sathya Krishna", role: "Content Strategist", bio: "Telling stories that stick.", persona: "The Storyteller", image: "/images/group-1.jpg" },
    { id: "monuika", name: "Monuika Dola", role: "Developer", bio: "Turning coffee into code.", persona: "The Coder", image: "/images/group-2.jpg" },
    { id: "anvith", name: "Anvith", role: "Systems Engineer", bio: "Optimizing the machine.", persona: "The Engineer", image: "/images/group-3.jpg" },
    { id: "snighda", name: "Snighda (Reddy)", role: "Developer", bio: "Solving problems one bug at a time.", persona: "The Fixer", image: "/images/group-1.jpg" },
    { id: "srija", name: "Srija", role: "Designer", bio: "Adding color to the world.", persona: "The Creative", image: "/images/group-2.jpg" },
];
