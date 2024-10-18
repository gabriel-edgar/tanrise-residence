import ReactNativeBlobUtil from 'react-native-blob-util';
import axios from 'axios';
//import {API_URL} from '@env';
import {
    View,
    TouchableOpacity,
    FlatList,
    useWindowDimensions,
    Modal,
    Dimensions,
    Alert,
    Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

//const [images, setImage] = useState([]);

const photoUpload = (
    stringType,
    imagesState,
    setState,
    // setDataScreen1,
    // dataScreen1,
) => {
    // console.log(
    //     '26 stringType: ',
    //     stringType,
    //     'imagesState: ',
    //     imagesState,
    //     'setState: ',
    //     setState,
    //     '26',
    // );

    //return;

    const handlePhotoPick = () => {
        //console.log('30 datImage', imagesState);
        Alert.alert(
            'Select a Photo',
            'Choose the place where you want to get a photo',
            [
                {text: 'Gallery', onPress: () => fromGallery()},
                {text: 'Camera', onPress: () => fromCamera()},
                {
                    text: 'Cancel',
                    onPress: () => console.log('User Cancel'),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    const saveFotoProfil = async data => {
        try {
            //sconsole.log('33 data akan save foto profil: ', data);
            //console.log('isi images', data.image[0].uri);

            //console.log('isi images', data.image[0].uri);

            //let fileName = 'profile.png';
            // let fileImg = ReactNativeBlobUtil.wrap(
            //     data.image[0].uri.replace('file://', ''),
            // );

            // const b64 = fileImg.base64;
            const b64 = await ReactNativeBlobUtil.fs.readFile(
                data.uri,
                'base64',
            );

            //console.log('68 url: ', data.uri);
            console.log('69 typeOf: ', typeof b64);
            //console.log('231 b64: ', b64, ' end of images 231');

            const dataPhoto = 'data:image/png;base64,' + b64;

            console.log('81 dataPhoto: ', dataPhoto, '812345');

            //const result = dataPhoto;

            setState({
                ...imagesState,
                [stringType]: data.uri,
                [stringType + '_base64']: dataPhoto,
            });

            //return result;
        } catch (error) {
            console.log('76 error', error, ' error 76');
        }

        return;
        try {
            // Define your custom headers
            const headers = {
                //Authorization: 'Bearer YOUR_ACCESS_TOKEN',
                //'Content-Type': 'application/json',
            };

            // Define the data to send in the POST request
            const postData = {
                key1: 'value1',
                key2: 'value2',
            };

            // Make the HTTP POST request with Axios
            const response = await axios.post(
                'https://api.example.com/endpoint',
                postData,
                {headers},
            );

            //---------------

            const result = await httpClient.request({
                url: `/profile/change-photo`,
                // url: `/changephoto_mobile`,
                method: 'POST',
                data: {
                    dataPhoto: 'data:image/png;base64,' + b64,
                    email: data.email,
                },
            });

            return result;
        } catch (error) {
            console.log('error change photo', error.response);
            return Promise.reject(error);
        }
    };

    const fromCamera = () => {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
        })
            .then(images => {
                //console.log('97 received image', images);

                // setImage([
                //     {
                //         uri: images.path,
                //         width: images.width,
                //         height: images.height,
                //         mime: images.mime,
                //     },
                // ]);

                //return;

                imagePhotoUpload = {
                    uri: images.path,
                    width: images.width,
                    height: images.height,
                    mime: images.mime,
                };

                //return;

                saveFotoProfil(imagePhotoUpload);

                return;

                const dataPhoto = saveFotoProfil(imagePhotoUpload);

                console.log('159 dataPhoto: ', dataPhoto, '15912345');

                setState({
                    ...imagesProp,
                    [stringType]: images.path,
                    [stringType + '_base64']: dataPhoto,
                });

                console.log('131 run');

                return;

                // setDataScreen1({
                //     ...dataScreen1,
                //     [stringType]: {
                //         uri: images.path,
                //     },
                // });

                // savePhoto();
                // uploadPhoto();
                // setImage(prevState => ({
                //   image: [
                //     ...prevState.image,
                //     {
                //       uri: image.path,
                //       width: image.width,
                //       height: image.height,
                //       mime: image.mime,
                //     },
                //   ],
                // }));
            })
            .catch(e => console.log('145 error: ', e, ' 145'));
    };

    const fromGallery = (cropping, mediaType = 'photo') => {
        // let imageList = [];

        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
            //multiple: false,
        })
            .then(images => {
                console.log('142 received images', images, '142');
                // setImage([
                //     {
                //         uri: images.path,
                //         width: images.width,
                //         height: images.height,
                //         mime: images.mime,
                //     },
                // ]);

                imagePhotoUpload = {
                    uri: images.path,
                    width: images.width,
                    height: images.height,
                    mime: images.mime,
                };

                const dataPhoto = saveFotoProfil(imagePhotoUpload);

                setState({
                    ...images,
                    [stringType]: dataPhoto,
                });

                // setDataScreen1({
                //     ...dataScreen1,
                //     [stringType]: {uri: images.path},
                // });

                // savePhoto();
                // uploadPhoto();
                // image.map(image => {
                //   imageList.push({
                //     uri: image.path,
                //     width: image.width,
                //     height: image.height,
                //     mime: image.mime,
                //   });
                // });
                // console.log('received images', image);
                // console.log('received images >', imageList);
                // setImage(imageList);
                // for (var i = 0; i < image.length; i++) {
                //   setImage({
                //     images: [
                //       {
                //         uri: image[i].path,
                //         width: image[i].width,
                //         height: image[i].height,
                //         mime: image[i].mime,
                //       },
                //     ],
                //   });
                // }
            })
            .catch(e => console.log('202 error: ', e, '202'));
    };

    // const savePhoto = useCallback(() =>
    //     dispatch(saveFotoProfil({image: images, email: user.user})),
    // );

    // useEffect(() => {
    //     images.length != 0 ? savePhoto() : null;
    // }, [images]);

    let imagePhotoUpload;

    handlePhotoPick();

    // const dataPhoto = saveFotoProfil(imagePhotoUpload);

    //3"pictUrlBuktiTF": 1"pictUrlKTP": 2"pictUrlNPWP":

    // setState({
    //     ...images,
    //     [stringType]: dataPhoto,
    // });
};

export {photoUpload};
