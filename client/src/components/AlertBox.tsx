
interface Props{
    message: string;

}
const AlertBox = ( {message}:Props ) => {

    return (
        <div id='alert-box'>
            <div id='alert-message'>{message}</div>
        </div>
    );
};


export default AlertBox;