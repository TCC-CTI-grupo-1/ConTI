
interface Props{
    size?: string | "medium";
    color: string;
    radius: number;
    filledPercentage: number;
    animation?: string | "";
}

function percentageToCircle(filledPercentage: number){
    return 450 * filledPercentage;
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




const ProgressBar = () =>  {
    return ( {size='medium',color, radius, filledPercentage, animation = ""}: Props) => (
        <div className='progress-bar-container' style={eval(buildInlineSizeString(size))}>
            <div className='progress-bar-outline'>
                <div className='progress-bar-inner-circle'>
                    <span className='progress-bar-text'>{filledPercentage}%</span>
                </div>
            </div>
            <svg viewBox="0 0 100 100" version="1.1" xmlns="https://www.w3.org/2000/svg" width={radius} height = {radius}>  
                <circle className = {animation} cx= "50%" cy ="50%" r = {radius} 
                stroke={color} strokeDasharray = {percentageToCircle(filledPercentage)}></circle>
            </svg>
        </div>
    )
}

export {ProgressBar}