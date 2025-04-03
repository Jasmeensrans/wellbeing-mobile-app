import { TextInput } from "react-native";

export const TextField = (props: { onChangeText: any; value: string, placeholder: string }) => {
    return <TextInput onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder}/>;
  };
  

  