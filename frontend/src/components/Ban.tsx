interface Info {
    name: string
    url: string
}

function Ban({ champion, isActive }: { champion: Info | null, isActive: boolean }) {
    return (
        <div className={`m-auto ${isActive ? 'border-4 rounded border-gray-200 animate-pulse transition-all ease-in-out duration-200' : ''}`}>
            <div className="">
                {champion ? (
                    <img src={champion.url} alt={champion.name} className="w-12 h-12 object-cover" />
                ) : (
                    <img className="w-12 h-12" />
                )}
            </div>
        </div>
    );
}


export default Ban;