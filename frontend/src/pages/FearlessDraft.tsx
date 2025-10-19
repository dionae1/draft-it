import { useState } from "react";

import Draft from "../components/Draft";
import FearlessBans from "../components/FearlessBans";

import type { Champion } from "../types/Data";

function FearlessDraft() {
    const [maxStages, setMaxStages] = useState(0);
    const [stage, setStage] = useState<number | null>(1);
    const [picks, setPicks] = useState<Array<Champion>>([]);
    const [modeSelection, setModeSelection] = useState<boolean>(true);

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
            {modeSelection && (
                <div className="p-10 m-10 text-center">
                    <h2 className="text-4xl mb-6">Select Draft Mode</h2>
                    <p className="mb-4 text-xl">Choose between Best of 3 (BO3) or Best of 5 (BO5) draft modes.</p>
                    <div className="flex flex-row justify-center gap-8">
                        <button
                            className="text-2xl border-2 border-white p-4 rounded-md w-56 text-center
                    hover:bg-white hover:text-black transition hover:cursor-pointer"
                            onClick={() => {
                                setModeSelection(false);
                                setMaxStages(5);
                            }}
                        >
                            BO5
                        </button>
                        <button
                            className="text-2xl border-2 border-white p-4 rounded-md w-56 text-center
                    hover:bg-white hover:text-black transition hover:cursor-pointer"
                            onClick={() => {
                                setModeSelection(false);
                                setMaxStages(3);
                            }}
                        >
                            BO3
                        </button>
                    </div>
                </div>
            )}

            {!modeSelection && (
                <div className="p-10 m-10">
                    {picks.length > 0 && (
                        <FearlessBans bans={picks} />
                    )}

                    <h2 className="text-center text-4xl">Stage {stage}</h2>

                    {stage === 1 && <Draft onComplete={handleComplete} fearlessBans={picks} />}
                    {stage === 2 && <Draft onComplete={handleComplete} fearlessBans={picks} />}
                    {stage === 3 && <Draft onComplete={handleComplete} fearlessBans={picks} />}
                    {stage === 4 && <Draft onComplete={handleComplete} fearlessBans={picks} />}
                    {stage === 5 && <Draft onComplete={handleComplete} fearlessBans={picks} />}

                    {stage === null && (
                        <div className="text-center mt-10">
                            <h2 className="text-3xl mb-4">Draft Complete!</h2>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FearlessDraft;