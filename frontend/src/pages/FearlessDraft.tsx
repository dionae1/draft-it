import { useState, useEffect } from "react";

import Draft from "../components/Draft";
import type { Champion } from "../types/Data";

function FearlessDraft() {
    const maxStages = 3;
    const [stage, setStage] = useState<number | null>(1);
    const [picks, setPicks] = useState<Array<Champion>>([]);

    useEffect(() => {
        console.log("Current Stage:", stage);
        console.log("Picks so far:", picks);
    }, [stage, picks]);

    const handleComplete = (picks: Array<Champion>) => {
        if (stage && stage < maxStages) {
            setStage(stage + 1);
        } else {
            setStage(null);
        }
        setPicks((prevPicks) => [...prevPicks, ...picks]);
    };

    return (
        <div>
            <div className="p-10 m-10">

                {picks.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-2xl mb-4">Bans by fearless.</h2>
                        <ul className="flex gap-4">
                            {picks.map((champion, index) => (
                                <li key={index}>
                                    <img
                                        className="w-12 h-12"
                                        src={champion.url} alt={champion.name} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <h2 className="text-center text-4xl">Stage {stage}</h2>

                {stage === 1 && <Draft onComplete={handleComplete} fearlessBans={picks} />}
                {stage === 2 && <Draft onComplete={handleComplete} fearlessBans={picks} />}
                {stage === 3 && <Draft onComplete={handleComplete} fearlessBans={picks} />}

                {stage === null && (
                    <div className="text-center mt-10">
                        <h2 className="text-3xl mb-4">Draft Complete!</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FearlessDraft;