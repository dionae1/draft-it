interface Info {
    name: string
    url: string
}

function Pick({ champion, isActive }: { champion: Info | null, isActive: boolean }) {
    return (
        <div className={`m-auto ${isActive ? 'border-4 rounded border-gray-200 animate-pulse transition-all ease-in-out duration-200' : ''}`}>
            <div className="">
                {champion ? (
                    <img src={champion.url} alt={champion.name} className="w-28 h-28 object-cover" />
                ) : (
                    <img className="w-28 h-28" />
                )}
            </div>
        </div>
    );
}


export default Pick;