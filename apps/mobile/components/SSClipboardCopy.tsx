import { TouchableWithoutFeedback, View } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import SSPopupText from './SSPopupText'
import { useState } from 'react'

type SSTextClipboardProps = {
  text: string | number
  children: React.ReactNode
}

export default function SSTextClipboard({
  text,
  children
}: SSTextClipboardProps) {
  const [showPopup, setShowPopup] = useState(false)
  const handleClick = async () => {
    const textToCopy = typeof text === 'string' ? text : text.toString()
    await Clipboard.setStringAsync(textToCopy)
    setShowPopup(true)
  }

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View>
        {children}
        <SSPopupText
          isVisible={showPopup}
          onTimeout={() => setShowPopup(false)}
          message="Copied to clipboard"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
