import { useHomeContext } from "../../context/HomeContext";
import { useEffectAfterMount } from "../../tools/common";

const Add = () => {
    const { count, name, setName } = useHomeContext();
    
    const changeName = (name: string) => {
        setName(name);
    }
    
    useEffectAfterMount(() => {
        console.log("Name changed to:", name);
    }, [name]);
    
    return (<>
        <div>Home Add Page (Count: {count})</div>
        <div>Name is {name}</div>
        <input value={name} onChange={e => changeName(e.target.value)} placeholder="Enter name" />
    </>);
}

export default Add;