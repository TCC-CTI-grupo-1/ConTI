import React, {useState,useEffect} from 'react';
interface Props{
    color: string;
    radius: number;
    filledPercentage: number;
    animation?: boolean | false;
}
const PI = 3.1415926535897932384;

function percentageToCircle(percentage: number, radius: number){
    return radius * PI * 2 * percentage/100;
}

const ProgressBar = ({color, radius, filledPercentage, animation = false}: Props) =>  {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const progressSize = radius*2+20;

    useEffect(() => {
        if (animation) {
            const interval = setInterval(() => {
                setCurrentPercentage(prevPercentage => {
                    if (prevPercentage < filledPercentage) {
                        return prevPercentage + 1;
                    }
                    clearInterval(interval);
                    return prevPercentage;
                });
            }, 0.5); 

            return () => clearInterval(interval);
        }
    }, [filledPercentage, animation]);

    const percentage = animation ? currentPercentage : filledPercentage;

    return (
        <div className='progress-bar-container' style={{width: (progressSize + 'px'), height: (progressSize + 'px')}}>
            <div className='progress-bar-outline'>
                <div className='progress-bar-inner-circle'>
                    <div className='progress-bar-text'>{percentage}%</div>
                </div>
            </div>
            <svg viewBox={"0 0 " + (progressSize) + ' ' + (progressSize)} version="1.1" xmlns="https://www.w3.org/2000/svg" 
            width={progressSize} height = {progressSize}>  
                <circle cx="50%" cy="50%" r = {radius} stroke='#F5F5F5'></circle>
                <circle cx= "50%" cy ="50%" r = {radius} 
                stroke={color} strokeDasharray = {percentageToCircle(percentage, radius) + ' 1000000000'}></circle>
            </svg>
        </div>
    )
}

export {ProgressBar}