'use client'
const ExploreBtn = () => {
    return (
        <button 
            type="button" 
            id="explore-btn" 
            className="mt-7 mx-auto inline-flex items-center gap-2"
            onClick={() => console.log('Clicked')}
            >
            <a href="#events" className="flex items-center gap-2">
                Explore Events 
                <img 
                    src="/icons/calendar.svg" 
                    alt="calendar" 
                    width={24} 
                    height={24}
                />
            </a>
        </button>
    )
}
export default ExploreBtn