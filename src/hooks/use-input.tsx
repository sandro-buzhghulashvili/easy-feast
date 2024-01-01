import { useState } from "react"

const useInput = (validatorFunc:(value:string) => boolean) => {
    const [value,setValue] = useState("")
    const [isTouched,setIsTouched] = useState(false)

    const isValid = validatorFunc(value)
    const hasError = isTouched && !isValid


    const valueChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const blurHandler = () => {
        setIsTouched(true)
    }

    return {
        value,
        hasError,
        isValid,
        valueChangeHandler,
        blurHandler
    }
}

export default useInput