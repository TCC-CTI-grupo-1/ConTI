interface Props{
    size?: string | "medium";
    color: string;
    radius: number;
    filledPercentage: number;
    animation?: string | "";
}

const PI = 3.1415926535897932384;
function percentageToCircle(filledPercentage: number, radius: number){
    return radius * PI * 2 * filledPercentage/100;
}
function buildInlineSizeString(size:string){
    let val = "";
    switch(size){
        case "small":
            val = "50";
            break;
        case "medium":
            val = "100";
            break;
        case "large":
            val = "150";
            break;
        default:
            val = "100";
    }
    return "width: " + val + "px; height: " + val + "px;";
    }




const ProgressBar = ({size='medium',color, radius, filledPercentage, animation = ""}: Props) =>  {

    const progressSize = radius*2+20;
    console.log(filledPercentage)
    console.log(percentageToCircle(filledPercentage, radius))
    return (
        <div className='progress-bar-container' style={{width: (progressSize + 'px'), height: (progressSize + 'px')}}>
            <div className='progress-bar-outline'>
                <div className='progress-bar-inner-circle'>
                    <span className='progress-bar-text'>{filledPercentage}%</span>
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