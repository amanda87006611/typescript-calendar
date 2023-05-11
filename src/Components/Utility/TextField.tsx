import styles from "./style/TextField.module.scss";
import { useState, useEffect } from "react";

interface Props {
  value: any;
  type: string;
  placeholder?: any;
  onChange: (params: any) => any;
  onBlur: () => void; 
  onKeyPress: () => void;
  disabled: boolean;
  error: boolean;
  inputType?: string;
  maxLength?: number;
}

const TextField: React.FC<Props> = ({
  value,
  type,
  placeholder,
  onBlur,
  onKeyPress,
  onChange,
  disabled,
  error,
  inputType,
  maxLength,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  function inputChange(evt: any) {
    setInputValue(evt.target.value);
    onChange(evt);
  }

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      disabled={disabled}
      id='textInput'
      className={type === "small" ? styles.smallTextField : styles.textField}
      placeholder={placeholder ? placeholder : "請輸入"}
      value={inputValue}
      onChange={(evt: any) => inputChange(evt)}
      onBlur={onBlur}
      onKeyUp={onKeyPress}
      type={inputType ? inputType : "text"}
      maxLength={maxLength}
      style={
        error ? { border: "1px solid #ff3b30" } : { border: "1px solid #eee" }
      }
    />
  );
};

export default TextField;
