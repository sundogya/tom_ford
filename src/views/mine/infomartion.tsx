import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

interface User {
    name?: string;
    age?: number;
    sex?: "male" | "female";
    province?: string;
    mobile?: string;
}

const provinceOptions = [
    "北京",
    "天津",
    "上海",
    "重庆",
    "河北",
    "山西",
    "辽宁",
    "吉林",
    "黑龙江",
    "江苏",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山东",
    "河南",
    "湖北",
    "湖南",
    "广东",
    "海南",
    "四川",
    "贵州",
    "云南",
    "陕西",
    "甘肃",
    "青海",
    "内蒙古",
    "广西",
    "西藏",
    "宁夏",
    "新疆",
    "香港",
    "澳门",
    "台湾",
];

export default function Home() {
    const [user, setUser] = useState<User>({});
    const [notice, setNotice] = useState<string>("");

    const handleUpdate = () => {
        console.log(user, "handleUpdate");
        setNotice("个人信息已更新保存。");
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof User
    ) => {
        console.log(event.target.value, user, "handleChange");
        setUser({ ...user, [field]: event.target.value });
        setNotice("");
    };

    const handleSexChange = (event: SelectChangeEvent) => {
        setUser({ ...user, sex: event.target.value as User["sex"] });
        setNotice("");
    };

    const handleProvinceChange = (event: SelectChangeEvent) => {
        setUser({ ...user, province: event.target.value });
        setNotice("");
    };

    useEffect(() => {
        console.log("Mine mounted");
        return () => {
            console.log("Mine unmounted");
        };
    }, []);

    return (
        <div className={css.pageContainer}>
            <PageHeader title="个人信息" />

            <div className={css.heroStrip}>
                <span className={css.heroSub}>TOM FORD MEMBER PROFILE</span>
                <span className={css.heroTitle}>完善您的专属档案</span>
                <span className={css.heroDesc}>
                    填写基础资料以便同步会员等级、接收礼遇通知及享受更贴合的香氛美妆服务。
                </span>
            </div>

            <div className={css.information}>
                <TextField
                    label="姓名"
                    variant="outlined"
                    placeholder="请输入姓名"
                    value={user.name ?? ""}
                    onChange={(e) => handleChange(e, "name")}
                />
                <TextField
                    label="手机号"
                    variant="outlined"
                    placeholder="请输入手机号"
                    value={user.mobile ?? ""}
                    onChange={(e) => handleChange(e, "mobile")}
                />
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-label">性别</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.sex ?? ""}
                        label="性别"
                        onChange={handleSexChange}
                        MenuProps={{
                            PaperProps: { className: css.menuPaper },
                            MenuListProps: { className: css.menuList },
                        }}
                    >
                        <MenuItem value="male">男</MenuItem>
                        <MenuItem value="female">女</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel id="province-select-label">省/直辖市</InputLabel>
                    <Select
                        labelId="province-select-label"
                        id="province-select"
                        value={user.province ?? ""}
                        label="省/直辖市"
                        onChange={handleProvinceChange}
                        MenuProps={{
                            PaperProps: { className: css.menuPaper },
                            MenuListProps: { className: css.menuList },
                        }}
                    >
                        {provinceOptions.map((province) => (
                            <MenuItem key={province} value={province}>
                                {province}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <span className={css.infoTip}>
                    您的个人信息仅用于会员身份核验与礼遇服务，我们将严格按照隐私政策为您加密保护。
                </span>

                {notice ? <div className={css.infoNotice}>{notice}</div> : null}

                <button className={css.submitBtn} onClick={handleUpdate}>
                    保存更新
                </button>
            </div>
        </div>
    );
}
