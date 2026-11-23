import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

interface AddressItem {
    id: string;
    receiver: string;
    mobile: string;
    region: string;
    detail: string;
    isDefault: boolean;
}

const initialAddresses: AddressItem[] = [
    {
        id: "addr-1",
        receiver: "林女士",
        mobile: "138****6210",
        region: "上海市 静安区",
        detail: "南京西路 1266 号恒隆广场一期 28 层",
        isDefault: true,
    },
    {
        id: "addr-2",
        receiver: "林女士",
        mobile: "138****6210",
        region: "北京市 朝阳区",
        detail: "建国门外大街 1 号国贸大厦 A 座 1602",
        isDefault: false,
    },
];

const emptyForm = {
    receiver: "",
    mobile: "",
    region: "",
    detail: "",
    isDefault: false,
};

export default function MineAddress() {
    const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [notice, setNotice] = useState<string>("");

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowForm(true);
        setNotice("");
    };

    const openEdit = (item: AddressItem) => {
        setEditingId(item.id);
        setForm({
            receiver: item.receiver,
            mobile: item.mobile,
            region: item.region,
            detail: item.detail,
            isDefault: item.isDefault,
        });
        setShowForm(true);
        setNotice("");
    };

    const handleSetDefault = (id: string) => {
        setAddresses((prev) => prev.map((item) => ({ ...item, isDefault: item.id === id })));
        setNotice("已更新默认收货地址。");
    };

    const handleDelete = (id: string) => {
        setAddresses((prev) => prev.filter((item) => item.id !== id));
        setNotice("收货地址已删除。");
    };

    const handleSave = () => {
        if (!form.receiver.trim() || !form.mobile.trim() || !form.region.trim() || !form.detail.trim()) {
            setNotice("请完整填写收货人、手机号、所在地区及详细地址。");
            return;
        }

        setAddresses((prev) => {
            const base = form.isDefault ? prev.map((item) => ({ ...item, isDefault: false })) : prev;
            if (editingId) {
                return base.map((item) =>
                    item.id === editingId
                        ? {
                              ...item,
                              receiver: form.receiver.trim(),
                              mobile: form.mobile.trim(),
                              region: form.region.trim(),
                              detail: form.detail.trim(),
                              isDefault: form.isDefault,
                          }
                        : item
                );
            }
            return [
                ...base,
                {
                    id: `addr-${Date.now()}`,
                    receiver: form.receiver.trim(),
                    mobile: form.mobile.trim(),
                    region: form.region.trim(),
                    detail: form.detail.trim(),
                    isDefault: form.isDefault || base.length === 0,
                },
            ];
        });

        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        setNotice(editingId ? "收货地址已更新。" : "已新增收货地址。");
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="我的地址" />

            <div className={css.content}>
                {notice ? <div className={css.toastNotice}>{notice}</div> : null}

                {showForm ? (
                    <div className={css.formPanel}>
                        <span className={css.formTitle}>{editingId ? "编辑收货地址" : "新增收货地址"}</span>
                        <input
                            className={css.inputField}
                            placeholder="收货人姓名"
                            value={form.receiver}
                            onChange={(e) => setForm({ ...form, receiver: e.target.value })}
                        />
                        <input
                            className={css.inputField}
                            placeholder="手机号码"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        />
                        <input
                            className={css.inputField}
                            placeholder="所在省 / 市 / 区"
                            value={form.region}
                            onChange={(e) => setForm({ ...form, region: e.target.value })}
                        />
                        <input
                            className={css.inputField}
                            placeholder="详细地址（街道、楼栋、门牌号）"
                            value={form.detail}
                            onChange={(e) => setForm({ ...form, detail: e.target.value })}
                        />
                        <label className={css.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={form.isDefault}
                                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                            />
                            <span>设为默认收货地址</span>
                        </label>
                        <div className={css.formBtns}>
                            <button className={css.outlineBtn} onClick={() => setShowForm(false)}>
                                取消
                            </button>
                            <button className={css.primaryBtn} onClick={handleSave}>
                                保存地址
                            </button>
                        </div>
                    </div>
                ) : null}

                <div className={css.addressList}>
                    {addresses.length > 0 ? (
                        addresses.map((item) => (
                            <div
                                key={item.id}
                                className={`${css.addressCard} ${item.isDefault ? css.defaultCard : ""}`}
                            >
                                <div className={css.addressTop}>
                                    <div className={css.userMeta}>
                                        <span>{item.receiver}</span>
                                        <span>{item.mobile}</span>
                                    </div>
                                    {item.isDefault ? <span className={css.defaultTag}>默认</span> : null}
                                </div>
                                <div className={css.addressDetail}>
                                    {item.region} {item.detail}
                                </div>
                                <div className={css.addressActions}>
                                    {!item.isDefault ? (
                                        <span onClick={() => handleSetDefault(item.id)}>设为默认</span>
                                    ) : null}
                                    <span onClick={() => openEdit(item)}>编辑</span>
                                    <span className={css.dangerText} onClick={() => handleDelete(item.id)}>
                                        删除
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={css.emptyState}>暂无收货地址，请点击下方按钮添加</div>
                    )}
                </div>

                {!showForm ? (
                    <button className={css.primaryBtn} onClick={openCreate}>
                        新增收货地址
                    </button>
                ) : null}
            </div>
        </div>
    );
}
