
export default function TextBox({ id, required, letterSpacing, width, textAlign, mb, dir = "rtl", pattern, initialValue, label = "", error, name = "", area, className="", minLength, maxLength, disabled, reference, type = "", onChanged, value, placeholder = "" }) {
    function input(e) {
        e.target.style.height = "";
        e.target.style.height =
            e.target.scrollHeight + "px";
    }

    return (
        <div className={className} style={{ marginBottom: mb,width: width }}>
            <label

                className={`block ${label && "mb-2"} text-sm font-medium text-gray-900 `}
            >
                {label}
                {error && ` (${error})`}
            </label>

            {!area ? <input
                id={id}
                style={{
                    letterSpacing: letterSpacing,
                    width: width,
                    textAlign: textAlign,
                }}
                required={required}
                name={name}
                pattern={pattern}
                defaultValue={initialValue}
                minLength={minLength}
                maxLength={maxLength}
                ref={reference}
                disabled={disabled}
                placeholder={placeholder}
                type={type || "text"}
                dir={dir}
                onChange={onChanged}
                value={value}
                className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  `} /> :
                <textarea
                    id={id}
                    style={{
                        letterSpacing: letterSpacing,
                    }}
                    pattern={pattern}
                    onInput={input}
                    name={name}
                    required={required}
                    defaultValue={initialValue}
                    minLength={minLength}
                    maxLength={maxLength}
                    ref={reference}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type || "text"}
                    onChange={onChanged}
                    value={value}
                    className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
                />}
        </div>

    )
}
