interface Props{
    color: string;
    radius: number;
    filledPercentage: number;
    animation?: string | "";
}

const PI = 3.1415926535897932384;
function percentageToCircle(filledPercentage: number, radius: number){
    return radius * PI * 2 * filledPercentage/100;
}

const ProgressBar = ({color, radius, filledPercentage, animation = ""}: Props) =>  {

    const progressSize = radius*2+20;
    console.log(filledPercentage)
    console.log(percentageToCircle(filledPercentage, radius))
    return (
        <div className='progress-bar-container' style={{width: (progressSize + 'px'), height: (progressSize + 'px')}}>
            <div className='progress-bar-outline'>
                <div className='progress-bar-inner-circle'>
                    <div className='progress-bar-text'>{filledPercentage}%</div>
                </div>
            </div>
            <svg viewBox={"0 0 " + (progressSize) + ' ' + (progressSize)} version="1.1" xmlns="https://www.w3.org/2000/svg" 
            width={progressSize} height = {progressSize}>  
                <circle className = {animation} cx= "50%" cy ="50%" r = {radius} 
                stroke={color} strokeDasharray = {percentageToCircle(filledPercentage, radius) + ' 1000000000'}></circle>
            </svg>
        </div>
    )
}

export {ProgressBar}