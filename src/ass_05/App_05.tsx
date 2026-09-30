import { useEffect, useState } from "react"
import { Container } from "../components/Container"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { ProductList } from "./components/ProductList"
import { CartList, type CartLine } from "./components/CartList"
import { CouponInput } from "./components/CouponInput"
import { OrderSummary } from "./components/OrderSummary"
import { products, coupons, GST_RATE, type CartEntry } from "./products"

const CART_KEY = "ass05-cart"
const COUPON_KEY = "ass05-coupon"

function load<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
        return fallback
    }
}

function App_05() {
    const [cart, setCart] = useState<CartEntry[]>(() => load<CartEntry[]>(CART_KEY, []))
    const [coupon, setCoupon] = useState<string | null>(() => {
        const saved = load<string | null>(COUPON_KEY, null)
        return saved && saved in coupons ? saved : null
    })
    const [notice, setNotice] = useState("")

    useEffect(() => {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart))
            localStorage.setItem(COUPON_KEY, JSON.stringify(coupon))
        } catch {
            // storage unavailable
        }
    }, [cart, coupon])

    const lines: CartLine[] = cart.flatMap((entry) => {
        const product = products.find((p) => p.id === entry.id)
        return product ? [{ product, qty: entry.qty }] : []
    })

    const percent = coupon ? coupons[coupon] : 0
    const itemCount = cart.reduce((sum, e) => sum + e.qty, 0)
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
    const discount = Math.round(subtotal * percent) / 100
    const gst = Math.round((subtotal - discount) * GST_RATE) / 100
    const grandTotal = subtotal - discount + gst

    const handleAdd = (id: number) => {
        setNotice("")
        setCart(cart.some((e) => e.id === id)
            ? cart.map((e) => (e.id === id ? { ...e, qty: e.qty + 1 } : e))
            : [...cart, { id, qty: 1 }])
    }

    const handleChangeQty = (id: number, delta: number) => {
        setCart(cart
            .map((e) => (e.id === id ? { ...e, qty: e.qty + delta } : e))
            .filter((e) => e.qty > 0))
    }

    const handleRemove = (id: number) => setCart(cart.filter((e) => e.id !== id))

    const handleApply = (code: string) => {
        if (!(code in coupons)) return false
        setCoupon(code)
        return true
    }

    const handleCheckout = () => {
        setNotice(`Order placed — ${itemCount} item${itemCount === 1 ? "" : "s"}, total ${grandTotal.toFixed(2)}`)
        setCart([])
        setCoupon(null)
    }

    return (
        <Container>
            <Header
                title="Online Shopping Cart"
                subtitle="Add products, apply a coupon and check out with GST."
                backHref="../../index.html"
            />
            <Section style={{ gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                    <Title>Products — {products.length}</Title>
                    <ProductList products={products} onAdd={handleAdd} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Title>Cart — {itemCount}</Title>
                    {notice && (
                        <div style={{ background: "var(--secondary)", borderRadius: "20px", padding: "14px 18px", fontSize: "16px", color: "var(--default)" }}>
                            {notice}
                        </div>
                    )}
                    <CartList lines={lines} onChangeQty={handleChangeQty} onRemove={handleRemove} />
                </div>
                {lines.length > 0 && (
                    <>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <Title>Coupon</Title>
                            <CouponInput applied={coupon} percent={percent} onApply={handleApply} onRemove={() => setCoupon(null)} />
                            {!coupon && <Title style={{ opacity: 0.7 }}>Try SAVE10, FARM20 or WELCOME5</Title>}
                        </div>
                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            gstRate={GST_RATE}
                            gst={gst}
                            grandTotal={grandTotal}
                            disabled={false}
                            onCheckout={handleCheckout}
                        />
                    </>
                )}
            </Section>
            <Footer year={2026} author="Koushik" />
        </Container>
    )
}

export default App_05
