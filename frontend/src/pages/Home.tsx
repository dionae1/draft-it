import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    const goToClassicDraft = () => {
        navigate("/classic");
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={goToClassicDraft}>Go to Classic Draft</button>
        </div>
    );
}

export default Home;
