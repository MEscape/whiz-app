import React, { useRef, useState } from "react"
import { Keyboard, TextInput, View } from "react-native"

import { Icon, LibraryTypes, Text, TextField, TextFieldProps } from "blueprints"

import { TxKeyPath } from "@/i18n"


interface EditorProps extends TextFieldProps<LibraryTypes, LibraryTypes> {
    name?: string
    onSave?: (name: string) => void
}

export const Editor = ({ name, onSave, ...props }: EditorProps) => {
    const textFieldRef = useRef<TextInput>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState(name)
    const [error, setError] = useState<TxKeyPath | null>(null)

    const handleEditPress = () => {
        setIsEditing(true)
        setEditedName(name)
        Keyboard.dismiss()
        setTimeout(() => {
            textFieldRef.current?.focus()
        }, 200)
    }

    const handleSave = () => {
        if (editedName.length < 4) {
            return setError('error.less')
        }

        setIsEditing(false)
        setError(null)
        onSave && onSave(editedName)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setError(null)
        setEditedName(name)
    }

    const handleOnChangeText = (text: string) => {
        setError(null)
        setEditedName(text)
    }

    return (
        <View className={`flex-1 ${props.className}`}>
          {isEditing ? (
            <View className="flex-row items-center justify-around gap-x-2">
              <TextField
                ref={textFieldRef}
                value={editedName}
                onChangeText={handleOnChangeText}
                variant="underlined"
                errorTx={error}
                {...props}
              />
              <View className="flex-row items-center">
                <Icon
                  name="checkmark-circle"
                  library="Ionicons"
                  color="text-accent"
                  size={24}
                  onPress={handleSave}
                  className="p-2"
                />
                <Icon
                  name="close-circle"
                  library="Ionicons"
                  color="text-accent"
                  className="p-2"
                  size={24}
                  onPress={handleCancel}
                />
              </View>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text variant="h2" className="mr-2">
                {name}
              </Text>
              {props.editable && (
                <Icon
                  name="pencil"
                  library="Ionicons"
                  color="text-accent"
                  size={24}
                  className="p-2"
                  onPress={handleEditPress}
                />
              )}
            </View>
          )}
        </View>
      )
}