import React, { Fragment, useState } from 'react'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import { Button, StyleSheet, View } from 'react-native'
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker'

export function App(): React.ReactElement | null {
  const cameraPermission = Camera.getCameraPermissionStatus()
  const microphonePermission = Camera.getMicrophonePermissionStatus()

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`)

  const [open, setOpen] = useState(false)

  const device = useCameraDevice('back')
  console.log(JSON.stringify(device, (k, v) => k === "formats" ? [] : v, 2))

  return (
    <View style={styles.root}>
      <Button
        title="open"
        onPress={() => {
          setOpen(true)
        }}
      />
      {open && device !== undefined &&
        <Fragment>
          <OrientationLocker orientation={PORTRAIT} />
          <Camera style={StyleSheet.absoluteFill} device={device} isActive outputOrientation="preview" />
        </Fragment>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
