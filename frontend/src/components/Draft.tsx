import { useEffect, useState } from "react"
import { getData } from "../services/data"

import Pick from "./Pick"
import Ban from "./Ban"
import Icon from "./Icon"

import type { Champion } from "../types/Data";

type Action = "pick" | "ban" | "complete" | "starting"

interface DraftProps {
    onComplete?: (picks: Array<Champion>) => void,
    fearlessBans?: Array<Champion>
}

function Draft({ onComplete, fearlessBans }: DraftProps) {
    const [data, setData] = useState<Array<Champion> | null>(null)
    const [action, setAction] = useState<Action>("starting")

    const [pickIndex, setPickIndex] = useState<number>(0)
    const [pickedChampions, setPickedChampions] = useState<Array<Champion>>([])

    const [banIndex, setBanIndex] = useState<number>(0)
    const [bannedChampions, setBannedChampions] = useState<Array<Champion>>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData()
                setData(data)

            } catch (error) {
                console.error('Error in App component while fetching data:', error)
                setError('Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSelect = (champion: Champion) => {
        if (pickIndex === 0 && banIndex === 0) return

        if (action === "ban") {
            setBannedChampions((prevBans) => {
                const newBans = [...prevBans]
                if (!newBans) return prevBans
                newBans[banIndex] = champion
                return newBans
            })
            return
        }

        setPickedChampions((prevPicks) => {
            const newPicks = [...prevPicks]
            if (!newPicks) return prevPicks
            newPicks[pickIndex] = champion
            return newPicks
        })
    }

    const handleConfirm = () => {

        if (action === "starting") {
            setAction("ban")
            setBanIndex(1)
            return
        }

        if (action === "ban") {
            if (!bannedChampions[banIndex])
                return

            setBanIndex((prevIndex) => prevIndex + 1)
            if (banIndex === 6) {
                setAction("pick")
                setPickIndex(1)
                setBanIndex(0)
                return
            }

            if (banIndex === 10) {
                setAction("pick")
                setPickIndex(7)
            }

            return
        }

        if (!pickedChampions[pickIndex])
            return

        setPickIndex((prevIndex) => prevIndex + 1)

        if (pickIndex === 6) {
            setAction("ban")
            setBanIndex(7)
            setPickIndex(0)
        }

        if (pickIndex === 10) {
            setAction("complete")

            if (onComplete) onComplete(pickedChampions.slice(1))
        }
    }

    const isTaken = (champion: Champion) => {
        const byName = (arr?: Array<Champion>) =>
            !!arr && arr.some((c) => c && c.name === champion.name)

        return byName(bannedChampions) || byName(pickedChampions) || byName(fearlessBans)
    }

    return (
        <div className="grid grid-cols-[1fr_3fr_1fr]">

            <div className="">
                <h2 className="text-2xl text-center">Blue Team</h2>
                <div className="flex flex-row my-6 w-4/5 m-auto gap-1">
                    <Ban champion={bannedChampions[1]} isActive={banIndex === 1} />
                    <Ban champion={bannedChampions[3]} isActive={banIndex === 3} />
                    <Ban champion={bannedChampions[5]} isActive={banIndex === 5} />
                    <Ban champion={bannedChampions[7]} isActive={banIndex === 7} />
                    <Ban champion={bannedChampions[9]} isActive={banIndex === 9} />
                </div>
                <div className="flex flex-col gap-2">
                    <Pick champion={pickedChampions[1]} isActive={pickIndex === 1} />
                    <Pick champion={pickedChampions[4]} isActive={pickIndex === 4} />
                    <Pick champion={pickedChampions[5]} isActive={pickIndex === 5} />
                    <Pick champion={pickedChampions[8]} isActive={pickIndex === 8} />
                    <Pick champion={pickedChampions[9]} isActive={pickIndex === 9} />
                </div>
            </div>


            {loading ? (
                <div className="p-4 max-w-5xl m-auto flex flex-col items-center">
                    <h2 className="text-2xl">Loading champions...</h2>
                </div>

            ) : error ? (
                <div className="p-4 max-w-5xl m-auto flex flex-col items-center">
                    <h2 className="text-2xl text-red-600">{error}</h2>
                </div>

            ) : (
                <div className="p-4 max-w-5xl m-auto flex flex-col items-center">
                    <h2 className="text-2xl">Select a Champion</h2>
                    {data && Array.isArray(data) && (
                        <ul className="grid grid-cols-5 gap-2 h-150 overflow-y-scroll overflow-x-hidden border-1 m-4 p-2 rounded-md">
                            {
                                data.map((champion) => (
                                    <Icon
                                        key={champion.name}
                                        champion={champion}
                                        handleSelect={handleSelect}
                                        isActive={
                                            ((action !== "starting") && !isTaken(champion))
                                        }
                                    />
                                ))
                            }
                        </ul>
                    )}

                    {
                        pickIndex > 10 ? <h2 className="text-3xl mt-4">Draft Complete!</h2> :
                            <button
                                className="p-2 text-2xl rounded-md w-32 text-center hover:bg-white hover:text-black transition mt-4 border-2 border-white hover:cursor-pointer"
                                onClick={handleConfirm}>{`${action === "starting" ? 'Start' : 'Confirm'}`}
                            </button>
                    }

                </div>
            )}

            <div className="">
                <h2 className="text-2xl text-center">Red Team</h2>
                <div className="flex flex-row my-6 w-4/5 m-auto gap-1">
                    <Ban champion={bannedChampions[2]} isActive={banIndex === 2} />
                    <Ban champion={bannedChampions[4]} isActive={banIndex === 4} />
                    <Ban champion={bannedChampions[6]} isActive={banIndex === 6} />
                    <Ban champion={bannedChampions[8]} isActive={banIndex === 8} />
                    <Ban champion={bannedChampions[10]} isActive={banIndex === 10} />
                </div>
                <div className="flex flex-col m-auto gap-2">
                    <Pick champion={pickedChampions[2]} isActive={pickIndex === 2} />
                    <Pick champion={pickedChampions[3]} isActive={pickIndex === 3} />
                    <Pick champion={pickedChampions[6]} isActive={pickIndex === 6} />
                    <Pick champion={pickedChampions[7]} isActive={pickIndex === 7} />
                    <Pick champion={pickedChampions[10]} isActive={pickIndex === 10} />
                </div>
            </div>
        </div>
    )
}

export default Draft