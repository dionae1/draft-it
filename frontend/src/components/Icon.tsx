interface Info {
    name: string
    url: string
}

function Icon({ champion, handleSelect, isActive }: { champion: Info; handleSelect: (champion: Info) => void; isActive: boolean }) {
    if (!isActive) return (
        <li key={champion.name} className="m-auto opacity-50 pointer-events-none">
            <img src={champion.url} alt={champion.name} className="w-28 h-28 object-cover object-top" />
            <p className="text-xl text-center">{champion.name}</p>
        </li>
    )


    return (
        <li key={champion.name} className="m-auto"
            onClick={() => handleSelect(champion)}
        >
            <img src={champion.url} alt={champion.name} className="w-28 h-28 object-cover object-top hover:cursor-pointer hover:brightness-120" />
            <p className="text-xl text-center">{champion.name}</p>
        </li>
    );
}

export default Icon;