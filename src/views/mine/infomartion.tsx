import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import css from "./mine.module.less";
interface User {
    name?: string;
    age?: number;
    sex?: 'male' | 'female';
    province?: string;
    mobile: string;
}
export default function Home() {
    let [user, setUser] = useState<User>({});
    
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
    const handleUpdate = () => {
        console.log(user, "handleUpdate");
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
        console.log(event.target.value, user, "handleChange");
        setUser({ ...user, [field]: event.target.value });
    }
    const handleSexChange = (event: SelectChangeEvent) => {
        setUser({ ...user, sex: event.target.value as User["sex"] });
    }
    const handleProvinceChange = (event: SelectChangeEvent) => {
        setUser({ ...user, province: event.target.value });
    }
    useEffect(() => {
        console.log("Mine mounted");
        return () => {
            console.log("Mine unmounted");
        };
    }, []);
    return (
        <div className={css.information}>
            <div>
                
            </div>
            <TextField label="姓名" variant="outlined" placeholder="请输入姓名" value={user.name} onChange={(e) => handleChange(e, "name")}></TextField>
            <TextField label="手机号" variant="outlined" placeholder="请输入手机号" value={user.mobile} onChange={(e) => handleChange(e, "mobile")}></TextField>
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-label">性别</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.sex}
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
                        <MenuItem key={province} value={province}>{province}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <button onClick={handleUpdate}>更新</button>
        </div>
    );
}