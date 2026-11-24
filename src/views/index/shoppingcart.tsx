import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
    ChatBubbleOutlineSharp,
    CloseSharp,
    DeleteOutlineSharp,
    KeyboardArrowDownSharp,
    KeyboardArrowUpSharp,
    PersonOutlineSharp,
} from "@mui/icons-material";
import { useIndexContext } from "@/context/IndexContext";
import { useToNav } from "@/tools/common";
import css from "./style/shoppingcart.module.less";

interface SpecOption {
    label: string;
    price: number;
}

interface CartGift {
    id: string;
    name: string;
    thumb: string;
    amount: number;
}

interface CartProduct {
    id: string;
    name: string;
    thumb: string;
    spec: string;
    specOptions: SpecOption[];
    price: number;
    amount: number;
    selected: boolean;
    gifts: CartGift[];
}

const initialCartList: CartProduct[] = [
    {
        id: "cart-1",
        name: "堕落烟巧香水",
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
        spec: "50ML",
        specOptions: [
            { label: "30ML", price: 1650 },
            { label: "50ML", price: 2450 },
            { label: "100ML", price: 3550 },
        ],
        price: 2450,
        amount: 1,
        selected: true,
        gifts: [
            {
                id: "g-1-1",
                name: "扩香石",
                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
            {
                id: "g-1-2",
                name: "暗麝心魄香水4ML",
                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
            {
                id: "g-1-3",
                name: "璀璨流光香水4ML",
                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
            {
                id: "g-1-4",
                name: "高定香氛首饰盒",
                thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
        ],
    },
    {
        id: "cart-2",
        name: "海洋乌木香水",
        thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px",
        spec: "50ML",
        specOptions: [
            { label: "50ML", price: 1450 },
            { label: "100ML", price: 2150 },
        ],
        price: 1450,
        amount: 1,
        selected: true,
        gifts: [
            {
                id: "g-2-1",
                name: "扩香石",
                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
            {
                id: "g-2-2",
                name: "暗麝心魄香水4ML",
                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
        ],
    },
    {
        id: "cart-3",
        name: "「烟熏樱桃」暗樱撩情香水",
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
        spec: "50ML",
        specOptions: [
            { label: "30ML", price: 2350 },
            { label: "50ML", price: 3550 },
        ],
        price: 3550,
        amount: 1,
        selected: true,
        gifts: [
            {
                id: "g-3-1",
                name: "迷你唇膏19",
                thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
            {
                id: "g-3-2",
                name: "高定勃艮第晚宴包",
                thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
                amount: 1,
            },
        ],
    },
];

const ProductGroupCard = memo(function ProductGroupCard({
    item,
    onToggle,
    onChangeSpec,
    onChangeAmount,
    onRemove,
}: {
    item: CartProduct;
    onToggle: (id: string) => void;
    onChangeSpec: (id: string, spec: string) => void;
    onChangeAmount: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className={css.productGroup}>
            <div className={css.productRow}>
                <div className={css.leftCol}>
                    <div className={css.checkWrap} onClick={() => onToggle(item.id)}>
                        <span className={`${css.checkbox} ${item.selected ? css.checked : ""}`} />
                    </div>
                    <div className={css.productThumb}>
                        <img src={item.thumb} alt={item.name} />
                    </div>
                </div>

                <div className={css.rightCol}>
                    <div className={css.titleLine}>
                        <span className={css.productName}>{item.name}</span>
                        <span className={css.removeBtn} onClick={() => onRemove(item.id)}>
                            <CloseSharp />
                        </span>
                    </div>

                    <div className={css.specSelectWrap}>
                        <select
                            value={item.spec}
                            onChange={(e) => onChangeSpec(item.id, e.target.value)}
                        >
                            {item.specOptions.map((opt) => (
                                <option key={opt.label} value={opt.label}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <span className={css.specArrow}>
                            <KeyboardArrowDownSharp />
                        </span>
                    </div>

                    <div className={css.stepper}>
                        <button
                            type="button"
                            disabled={item.amount <= 1}
                            onClick={() => onChangeAmount(item.id, -1)}
                        >
                            -
                        </button>
                        <span>{item.amount}</span>
                        <button type="button" onClick={() => onChangeAmount(item.id, 1)}>
                            +
                        </button>
                    </div>

                    <div className={css.priceText}>&yen;{item.price * item.amount}</div>
                </div>
            </div>

            {item.selected && item.gifts.length > 0 ? (
                <div className={css.giftList}>
                    {item.gifts.map((gift) => (
                        <div key={gift.id} className={css.giftRow}>
                            <div className={css.giftLeftCol}>
                                <span className={css.giftTag}>赠品</span>
                                <div className={css.giftThumb}>
                                    <img src={gift.thumb} alt={gift.name} />
                                </div>
                            </div>
                            <div className={css.giftRightCol}>
                                <span className={css.giftName}>{gift.name}</span>
                                <span className={css.giftQty}>数量：{gift.amount * item.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
});

const ShoppingCart = () => {
    const toNav = useToNav();
    const { setCartCount } = useIndexContext();
    const [cartList, setCartList] = useState<CartProduct[]>(initialCartList);
    const [showDiscountDetail, setShowDiscountDetail] = useState<boolean>(false);
    const [confirmingClear, setConfirmingClear] = useState<boolean>(false);
    const [pendingDeleteItem, setPendingDeleteItem] = useState<CartProduct | null>(null);
    const [checkoutNotice, setCheckoutNotice] = useState<string>("");

    const allCartQuantity = useMemo(
        () => cartList.reduce((sum, item) => sum + item.amount, 0),
        [cartList]
    );

    useEffect(() => {
        setCartCount(allCartQuantity);
    }, [allCartQuantity, setCartCount]);

    const selectedItems = useMemo(
        () => cartList.filter((item) => item.selected),
        [cartList]
    );
    const allSelected = cartList.length > 0 && selectedItems.length === cartList.length;

    const totalCount = useMemo(
        () => selectedItems.reduce((sum, item) => sum + item.amount, 0),
        [selectedItems]
    );
    const subtotal = useMemo(
        () => selectedItems.reduce((sum, item) => sum + item.price * item.amount, 0),
        [selectedItems]
    );
    const giftCount = useMemo(
        () =>
            selectedItems.reduce(
                (sum, item) =>
                    sum +
                    item.gifts.reduce((giftSum, gift) => giftSum + gift.amount * item.amount, 0),
                0
            ),
        [selectedItems]
    );

    const handleToggleItem = useCallback((id: string) => {
        setCartList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
        setCheckoutNotice("");
    }, []);

    const handleToggleAll = useCallback(() => {
        setCartList((prev) => {
            const nextSelected = !prev.every((item) => item.selected);
            return prev.map((item) => ({ ...item, selected: nextSelected }));
        });
        setCheckoutNotice("");
    }, []);

    const handleChangeSpec = useCallback((id: string, nextSpec: string) => {
        setCartList((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;
                const matched = item.specOptions.find((opt) => opt.label === nextSpec);
                return {
                    ...item,
                    spec: nextSpec,
                    price: matched ? matched.price : item.price,
                };
            })
        );
        setCheckoutNotice("");
    }, []);

    const handleChangeAmount = useCallback((id: string, delta: number) => {
        setCartList((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, amount: Math.max(1, item.amount + delta) }
                    : item
            )
        );
        setCheckoutNotice("");
    }, []);

    const handleRequestRemove = useCallback(
        (id: string) => {
            const target = cartList.find((item) => item.id === id) ?? null;
            setPendingDeleteItem(target);
        },
        [cartList]
    );

    const handleConfirmRemove = useCallback(() => {
        if (!pendingDeleteItem) return;
        setCartList((prev) => prev.filter((item) => item.id !== pendingDeleteItem.id));
        setPendingDeleteItem(null);
        setCheckoutNotice("");
    }, [pendingDeleteItem]);

    const handleClearCart = useCallback(() => {
        setCartList([]);
        setShowDiscountDetail(false);
        setConfirmingClear(false);
        setCheckoutNotice("");
    }, []);

    const handleCheckout = () => {
        if (selectedItems.length === 0) return;
        setCheckoutNotice(`已确认 ${totalCount} 件商品（总计 ¥${subtotal}），可前往订单页继续支付。`);
    };

    return (
        <div className={css.cartContainer}>
            <div className={css.scrollBody}>
                {checkoutNotice ? (
                    <div className={css.noticeBanner}>
                        <span>{checkoutNotice}</span>
                        <span
                            className={css.noticeLink}
                            onClick={() => toNav("/order?type=pendingPayment")}
                        >
                            查看订单
                        </span>
                    </div>
                ) : null}

                {cartList.length > 0 ? (
                    <>
                        <div className={css.productList}>
                            {cartList.map((item) => (
                                <ProductGroupCard
                                    key={item.id}
                                    item={item}
                                    onToggle={handleToggleItem}
                                    onChangeSpec={handleChangeSpec}
                                    onChangeAmount={handleChangeAmount}
                                    onRemove={handleRequestRemove}
                                />
                            ))}
                        </div>

                        <div className={css.clearCartArea}>
                            {confirmingClear ? (
                                <div className={css.clearConfirmBox}>
                                    <span className={css.clearConfirmText}>确认清空全部商品？</span>
                                    <div className={css.clearConfirmBtns}>
                                        <button
                                            type="button"
                                            className={css.cancelClearBtn}
                                            onClick={() => setConfirmingClear(false)}
                                        >
                                            取消
                                        </button>
                                        <button
                                            type="button"
                                            className={css.confirmClearBtn}
                                            onClick={handleClearCart}
                                        >
                                            确认清空
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={css.clearTrigger}
                                    onClick={() => setConfirmingClear(true)}
                                >
                                    <DeleteOutlineSharp />
                                    <span>清空购物车</span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={css.emptyCart}>
                        <span className={css.emptyText}>您的购物车暂无商品</span>
                        <button
                            type="button"
                            className={css.goShopBtn}
                            onClick={() => toNav("/index/category")}
                        >
                            浏览全部产品
                        </button>
                    </div>
                )}
            </div>

            <div className={css.floatingActions}>
                <div className={css.floatingBtn} onClick={() => toNav("/index/home")}>
                    <PersonOutlineSharp />
                    <span>专属顾问</span>
                </div>
                <div className={css.floatingBtn} onClick={() => toNav("/mine/contact")}>
                    <ChatBubbleOutlineSharp />
                    <span>客服</span>
                </div>
            </div>

            {cartList.length > 0 && showDiscountDetail ? (
                <div className={css.discountDrawer}>
                    <div className={css.discountRow}>
                        <span>商品总额（{totalCount} 件）</span>
                        <span>&yen;{subtotal}</span>
                    </div>
                    <div className={css.discountRow}>
                        <span>随单附赠礼遇</span>
                        <span>共 {giftCount} 件赠品</span>
                    </div>
                    <div className={css.discountRow}>
                        <span>优惠立减</span>
                        <span>-&yen;0</span>
                    </div>
                    <div className={`${css.discountRow} ${css.discountTotal}`}>
                        <span>预计实付</span>
                        <span>&yen;{subtotal}</span>
                    </div>
                </div>
            ) : null}

            {cartList.length > 0 ? (
                <div className={css.checkoutBar}>
                    <div className={css.selectAll} onClick={handleToggleAll}>
                        <span className={`${css.checkbox} ${allSelected ? css.checked : ""}`} />
                        <span>全选</span>
                    </div>

                    <div className={css.checkoutRight}>
                        <div className={css.totalWrap}>
                            <span className={css.totalMain}>总计: &yen; {subtotal}</span>
                            <div
                                className={css.discountToggle}
                                onClick={() => setShowDiscountDetail((prev) => !prev)}
                            >
                                <span className={css.discountUnderline}>优惠明细</span>
                                {showDiscountDetail ? (
                                    <KeyboardArrowDownSharp />
                                ) : (
                                    <KeyboardArrowUpSharp />
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            className={css.settleBtn}
                            disabled={selectedItems.length === 0}
                            onClick={handleCheckout}
                        >
                            结算（{totalCount}）
                        </button>
                    </div>
                </div>
            ) : null}
            {pendingDeleteItem ? (
                <div
                    className={css.modalMask}
                    onClick={() => setPendingDeleteItem(null)}
                >
                    <div
                        className={css.modalBox}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className={css.modalTitle}>确认删除</span>
                        <span className={css.modalMessage}>
                            确定将「{pendingDeleteItem.name}」移出购物车吗？
                        </span>
                        <div className={css.modalActions}>
                            <button
                                type="button"
                                className={css.modalCancelBtn}
                                onClick={() => setPendingDeleteItem(null)}
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                className={css.modalConfirmBtn}
                                onClick={handleConfirmRemove}
                            >
                                确认
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ShoppingCart;
