import './Button.scss'

const Button = ({ disabled = false, label, handleChange }) => {
    return (
        <div className='button'>
            <div className='button-container'>
                <button
                    disabled={disabled}
                    className='button-clickable'
                    onClick={handleChange}
                >
                    <b>
                        {label}
                    </b>
                </button>
            </div>
        </div>
    )
}

export default Button;