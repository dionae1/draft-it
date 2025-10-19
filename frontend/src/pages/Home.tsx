import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    const goToClassicDraft = () => {
        navigate("/classic");
    };

    const goToFearlessDraft = () => {
        navigate("/fearless");
    };

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <button onClick={goToClassicDraft}>Go to Classic Draft</button>
            </div>
            <div>
                <button onClick={goToFearlessDraft}>Go to Fearless Draft</button>
            </div>

        </div>
    );
}

export default Home;
