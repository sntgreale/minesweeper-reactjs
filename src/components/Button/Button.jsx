import "./Button.scss"

const Button = ({ label, handleChange }) => {
    return (
        <div className="button">
            <div className="button-container">
                <button
                    className="button-clickable"
                    onClick={handleChange}
                >
                    {label}
                </button>
            </div>
        </div>
    )
}

export default Button;