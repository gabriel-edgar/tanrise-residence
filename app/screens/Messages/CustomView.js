import PropTypes from "prop-types";
import React from "react";
import {
    Linking,
    Platform,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
} from "react-native";
import MapView from "react-native-maps";

const CustomView = (props) => {
    const { container, mapView, currentMessage } = props;
    const { location } = currentMessage;

    if (location) {
        return (
            <TouchableOpacity
                style={[styles.container, containerStyle]}
                onPress={() => {
                    const url = Platform.select({
                        ios: `http://maps.apple.com/?ll=${location.latitude},${
                            location.longitude
                        }`,
                        android: `http://maps.google.com/?q=${
                            location.latitude
                        },${location.longitude}`,
                    });
                    Linking.canOpenURL(url)
                        .then((supported) => {
                            if (supported) {
                                return Linking.openURL(url);
                            }
                        })
                        .catch((err) => {
                            console.error("An error occurred", err);
                        });
                }}
            >
                <MapView
                    style={[styles.mapView, mapViewStyle]}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                />
            </TouchableOpacity>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {},
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
});

CustomView.defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
};

CustomView.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    mapViewStyle: ViewPropTypes.style,
};

export default CustomView;
