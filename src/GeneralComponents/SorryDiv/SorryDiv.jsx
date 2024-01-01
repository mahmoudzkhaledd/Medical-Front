
export default function SorryDiv({ message="" }) {


    return (
        <div className=' w-100 h-64 flex flex-col items-center justify-center'>
            <h6>{message}</h6>
        </div>
    )
}
