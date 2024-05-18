interface Props{
    signin?: boolean
    variant?: 'blue' | 'white'
}


const Background = ({signin=false, variant='blue'}: Props) => {
    return (
        <div id='user-background' className={"full-screen-size " + (signin ? 'signin' : '')}>
            <div id="q1" className="risco"></div>
            <div id="q2" className="risco"></div>
            <div id="q3" className="risco"></div>
            <div id="q4" className="risco"></div>
            <div id="q5" className="risco"></div>
            <div id="q6"></div>
            <div id="q7"></div>
            <div id="q8"></div>
            <div id="q9"></div>
            <div id="q10"></div>
            <div id="color" className={variant}></div>
        </div>
    );
}

export default Background;