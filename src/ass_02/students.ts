export interface Student {
    id: number;
    name: string;
    roll: string;
    department: string;
    semester: number;
    cgpa: number;
    photo: string;
}

export const students: Student[] = [
    { id: 1, name: "Aarav Mehta", roll: "CSE2024-018", department: "Computer Science", semester: 4, cgpa: 9.42, photo: "https://i.pravatar.cc/96?img=12" },
    { id: 2, name: "Diya Nair", roll: "CSE2022-006", department: "Computer Science", semester: 8, cgpa: 9.67, photo: "https://i.pravatar.cc/96?img=47" },
    { id: 3, name: "Rohan Das", roll: "CE2023-033", department: "Civil Engineering", semester: 6, cgpa: 8.91, photo: "https://i.pravatar.cc/96?img=15" },
    { id: 4, name: "Ananya Iyer", roll: "ECE2023-041", department: "Electronics", semester: 6, cgpa: 9.18, photo: "https://i.pravatar.cc/96?img=45" },
    { id: 5, name: "Kabir Shah", roll: "ME2024-027", department: "Mechanical", semester: 4, cgpa: 8.76, photo: "https://i.pravatar.cc/96?img=33" },
    { id: 6, name: "Mira Kapoor", roll: "ECE2024-012", department: "Electronics", semester: 4, cgpa: 9.31, photo: "https://i.pravatar.cc/96?img=44" },
    { id: 7, name: "Arjun Sen", roll: "IT2025-009", department: "Information Tech", semester: 2, cgpa: 8.24, photo: "https://i.pravatar.cc/96?img=53" },
    { id: 8, name: "Ishita Roy", roll: "CSE2023-052", department: "Computer Science", semester: 6, cgpa: 8.58, photo: "https://i.pravatar.cc/96?img=49" },
];
