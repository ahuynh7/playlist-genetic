import { useUserFetch } from "../../hooks/useUser";

const Main = () => {
    const user = useUserFetch();
    console.log(user);
    return (
        <div>main</div>
    );
};

export default Main;