export default function Button({ name, isBeam= false, containerClass, href}){
    return (
        <a href={`#${href}`}>
            <button className={`btn ${containerClass}`}>

                {isBeam && (
                    <span className={'relative flex h-3 w-3'}>
                        <span className={'btn-ping'}/>
                        <span className={'btn-ping_dot'}/>
                    </span>

                )}
                {name}
            </button>
        </a>
    )
}
