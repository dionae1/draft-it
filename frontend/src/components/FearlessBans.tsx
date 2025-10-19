import type { Champion } from "../types/Data";

function FearlessBans({ bans }: { bans: Array<Champion> }) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl mb-4">Bans by fearless.</h2>
            <ul className="flex gap-4">
                {bans.map((champion, index) => (
                    <li key={index}>
                        <img
                            className="w-12 h-12"
                            src={champion.url} alt={champion.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FearlessBans;
