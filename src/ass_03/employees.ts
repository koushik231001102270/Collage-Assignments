export type Gender = "Male" | "Female" | "Other";

export interface Employee {
    id: number;
    name: string;
    employeeId: string;
    department: string;
    gender: Gender;
    phone: string;
    localAddress: string;
    permanentAddress: string;
}

export const departments = ["Crops", "Livestock", "Dairy", "Machinery", "Administration"];

export const genders: Gender[] = ["Male", "Female", "Other"];

export const employees: Employee[] = [
    { id: 1, name: "Ravi Kumar", employeeId: "FRM-001", department: "Crops", gender: "Male", phone: "+91 98300 11201", localAddress: "Plot 4, Green Acres Lane, Barasat", permanentAddress: "Village Kalna, Purba Bardhaman" },
    { id: 2, name: "Sunita Das", employeeId: "FRM-002", department: "Dairy", gender: "Female", phone: "+91 98310 22302", localAddress: "12 Milk Colony Road, Barasat", permanentAddress: "Ward 7, Krishnanagar, Nadia" },
    { id: 3, name: "Imran Sheikh", employeeId: "FRM-003", department: "Machinery", gender: "Male", phone: "+91 98320 33403", localAddress: "Workshop Quarters B, Farm Gate", permanentAddress: "Lane 3, Berhampore, Murshidabad" },
    { id: 4, name: "Meera Paul", employeeId: "FRM-004", department: "Administration", gender: "Female", phone: "+91 98330 44504", localAddress: "Staff Housing 2, Barasat", permanentAddress: "45 Lake Road, Kolkata" },
    { id: 5, name: "Joseph Tudu", employeeId: "FRM-005", department: "Livestock", gender: "Male", phone: "+91 98340 55605", localAddress: "Barn Cottage, North Field", permanentAddress: "Village Dumka, Jharkhand" },
    { id: 6, name: "Asha Roy", employeeId: "FRM-006", department: "Crops", gender: "Female", phone: "+91 98350 66706", localAddress: "Plot 9, Green Acres Lane, Barasat", permanentAddress: "Village Ranaghat, Nadia" },
    { id: 7, name: "Kabir Ansari", employeeId: "FRM-007", department: "Livestock", gender: "Other", phone: "+91 98360 77807", localAddress: "Barn Cottage 2, North Field", permanentAddress: "Sector 2, Siliguri" },
];
