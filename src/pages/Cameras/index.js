
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cameras = ({ navigation, route }) => {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.Back);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          Alert.alert('Camera permission denied');
          navigation.goBack();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // For iOS, permissions are handled by the system when you attempt to use the camera.
      setHasPermission(true);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleQR = async (event) => {
    if (scanned) return;

    const res = event.nativeEvent.codeStringValue;
    console.log('QR code scanned:', res);

    try {
      const parsedData = JSON.parse(res);
    
      if (parsedData) {
        setScanned(true);
        navigation.push('DataQR', {
          data: parsedData,
        });
      } else {
        navigation.goBack();
        Alert.alert('QR tidak valid');
      }
    } catch (error) {
      setScanned(true);
      navigation.push('DataQR', {
        data: res,
      });
    }
  };

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => (this.camera = ref)}
        cameraType={cameraType}
        flashMode="auto"
        style={{ flex: 1 }}
        scanBarcode={true}
        onReadCode={(event) => handleQR(event)}
        showFrame={true}
        laserColor='red'
        frameColor='black'
        barCodeTypes={[
          'qr',            // QR Code
          'ean13',         // EAN-13 (UPC-A is similar)
          'upce',          // UPC-E
          'code39',        // Code 39
          'code128',       // Code 128
          'pdf417',        // PDF417
          'aztec',         // Aztec Code
          'datamatrix',    // Data Matrix
        ]}
      />
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setCameraType(
          cameraType === CameraType.Back ? CameraType.Front : CameraType.Back
        )}
      >
        <Icon name="switch-camera" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Cameras;

const styles = StyleSheet.create({
  switchButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 10,
  },
});