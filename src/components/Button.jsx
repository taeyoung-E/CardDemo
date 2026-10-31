import './button.css';

function Button({className, feature, onClick}){ //className for button css , feature for button displayname, onClick for the type of event
    return(
        <>
            <button className={`btn ${className}`} onClick={onClick}>{feature}</button>
        </>
    );
}

export default Button;