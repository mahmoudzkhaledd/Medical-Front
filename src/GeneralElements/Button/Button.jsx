import './style.css';

export default function Button({ icon, fontWeight, btnStyle, width, height, borderWidth, flexDirection, borderColor, bordered, disabled, justifyContent, className = "", text = "", borderRadius, onClick, loading, color, textColor, btnType, fontSize, verticalPadding, horizontalPadding, faicon = "" }) {

    justifyContent = justifyContent || 'center';
    return (
        <button
            type={btnType}
            disabled={disabled}
            style={{
                width: width || "fit-content",
                height: height,
                border: !bordered ? "none" : `${borderWidth}px solid ${borderColor}`,
                backgroundColor: color,
                fontSize: fontSize,
                color: textColor,
                paddingInline: horizontalPadding,
                paddingBlock: verticalPadding,
                borderRadius: borderRadius,
                fontWeight: fontWeight || 500,
                justifyContent: justifyContent,
                alignItems: justifyContent,
                flexDirection: flexDirection || "row",
                ...btnStyle,
            }}
            onClick={onClick} className={`btn__button ${className}`}>

            {
                !loading ? <>
                    {text}
                    {faicon && <i className={faicon}></i>}
                    {icon}
                </> :
                    <i className={`fa-solid fa-circle-notch btn__spinner`}></i>
            }

        </button>
    )
}
