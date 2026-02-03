import { useState, useEffect } from "react";
export default function Home() {
    let [count, setCount] = useState(0);
    useEffect(() => {
        console.log("Mine mounted");
        return () => {
            console.log("Mine unmounted");
        };
    }, []);
    return (<>
        <div>This is Mine Page {count}</div>
        <button onClick={() => setCount(count + 1)}>Add</button>
    </>);
}