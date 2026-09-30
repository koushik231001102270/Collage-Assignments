export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

export interface CartEntry {
    id: number;
    qty: number;
}

export const GST_RATE = 18;

export const coupons: Record<string, number> = {
    SAVE10: 10,
    FARM20: 20,
    WELCOME5: 5,
};

export const products: Product[] = [
    { id: 1, name: "Organic Basmati Rice 5 kg", category: "Grains", price: 640 },
    { id: 2, name: "Cold-Pressed Mustard Oil 1 L", category: "Oils", price: 210 },
    { id: 3, name: "Wildflower Honey 500 g", category: "Pantry", price: 380 },
    { id: 4, name: "Farm Fresh Eggs (12)", category: "Dairy", price: 120 },
    { id: 5, name: "A2 Desi Ghee 500 ml", category: "Dairy", price: 750 },
    { id: 6, name: "Whole Wheat Flour 10 kg", category: "Grains", price: 520 },
    { id: 7, name: "Jaggery Blocks 1 kg", category: "Pantry", price: 95 },
    { id: 8, name: "Darjeeling Tea 250 g", category: "Beverages", price: 430 },
];

export function formatPrice(value: number) {
    return "₹" + value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
