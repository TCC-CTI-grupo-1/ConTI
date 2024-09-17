interface Props {
    imagePath:string;
    memberName:string;
    memberPosition:string;
    children?: JSX.Element;
}

const memberFrame = ({children, imagePath="client\\src\\assets\\expand.png",memberName="igor",memberPosition="desenvolvedor"}:Props) => {
    memberName = memberName.toUpperCase();
    memberPosition = memberPosition.toUpperCase();
    return(
        <div className='member-frame'>
            <div className='image-container'>
                <img src={imagePath}></img>
            </div>
            <div className ='text-container'>
                <span className='member-name'>{memberName}</span>
                <span className='member-position'>{memberPosition}</span>
                <span className='description'>
                    {children}
                </span>
            </div>
        </div>

    );
}

export default memberFrame;