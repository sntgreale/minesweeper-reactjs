import "./Input.scss"

const Input = ({ label, defaultValue, inputConfig, handleChange }) => {
    return (
        <div className="input">
            <div className="input-container">
                <div className="input-label">
                    <span>{ label }</span>
                </div>
                <div className="input-entry">
                    <input
                        className="input-entry-area"
                        type={inputConfig.type}
                        min={inputConfig.minQty}
                        max={inputConfig.maxQty}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Input;