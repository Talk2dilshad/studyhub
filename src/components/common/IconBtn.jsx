export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center rounded-full ${customClasses} cursor-pointer gap-x-2  py-2 px-5 font-semibold text-white`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-blue-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
}