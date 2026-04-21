import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { use, useEffect, useState } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import StoriesSlider from '../../components/StoriesSlider';
import EmptyData from '../../components/EmptyData';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/profileSlice';
import { getAuth } from '@react-native-firebase/auth';
import styles from './HomeStyle';
import Video from 'react-native-video';
import {
  getPosts,
  getSinglePost,
  postLike,
} from '../../redux/slices/postSlice';
import { rh, rw } from '../../helper/responsive';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  // const des = `@dipendra  Lorem, ipsum dolor sit amet consectetur adipisicing elit.delenitis ed illo architecto natus perspiciatis! Officia ab adipisci quibusdam officiis beatae illum facere quaerat corporis `;
  // const des = 'sdf sfdsf sfsfsdf ';
  const [showMore, setShowMore] = useState(false);
  const [selectedShowMoreIndex, setSelectedShowMoreIndex] = useState();
  const [allStories, setAllStories] = useState([]);
  const loggedInUser = getAuth().currentUser._user;
  const { profile } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  const { posts, loading } = useSelector(state => state.posts);

  console.warn('user data ---------------------------->', user);
  console.warn('posts from store', posts);
  // console.log('profile in home ', loggedInUser);
  // console.log('storeis', allStories);
  const Post = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    dispatch(getUserProfile(loggedInUser.uid));
    dispatch(getPosts(loggedInUser.uid));
    // getStories();
  }, []);

  // const getStories = async () => {
  //   const now = new Date();

  //   const snapshot = await firestore()
  //     .collection('stories')
  //     .where('expiresAt', '>', now)
  //     .get();

  //   const storiesData = snapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   // const formattedStories = [
  //   //   {
  //   //     isMyStory: true,
  //   //     avatar: profile?.avtar,
  //   //     user_id: profile?.id,
  //   //   },
  //   //   ...storiesData,
  //   // ];
  //   const myStory = storiesData.find(st => st.user_id == profile.id);
  //   const otherStories = storiesData.filter(st => st.user_id != profile.id);
  //   const formattedStories = [
  //     {
  //       isMyStory: true,
  //       ...myStory,
  //     },
  //     ...otherStories,
  //   ];

  //   setAllStories(formattedStories);
  // };

  // const getStories = async () => {
  //   const docs = await firestore().collection('stories').get();
  //   const now = new Date();

  //   const storyPromises = docs.docs.map(async doc => {
  //     const snapshot = await firestore()
  //       .collection('stories')
  //       .doc(doc.id)
  //       .collection('list')
  //       .get();

  //     return snapshot.docs.map(doc => {
  //       if (doc?.expiresAt > now) {
  //         return { id: doc.id, ...doc.data() };
  //       }
  //     });
  //   });

  //   const results = await Promise.all(storyPromises);
  //   const store = results.flat();

  //   console.log('Stories from Home ', store);

  //   const myStory = store.find(st => st.user_id == profile.id);
  //   const otherStories = store.filter(st => st.user_id != profile.id);

  //   const formattedStories = [
  //     {
  //       isMyStory: true,
  //       ...myStory,
  //     },
  //     ...otherStories,
  //   ];

  //   setAllStories(formattedStories);
  // };

  // const poslike = async id => {
  //   dispatch(getSinglePost(id));
  //   try {
  //     const likeRef = firestore()
  //       .collection('posts')
  //       .doc(id)
  //       .collection('likes')
  //       .doc(profile.id);

  //     const data = await likeRef.get();

  //     if (data.exists()) {
  //       await likeRef.delete();
  //     } else {
  //       await likeRef.set({});
  //     }
  //     console.log('post liked or unliked', data);
  //   } catch (error) {
  //     console.error('Error while Post like', error);
  //   }
  // };
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getPosts(profile.id));
      setRefreshing(false);
    }, 500);
  };

  const toggleLike = id => {
    console.warn('called');
    dispatch(postLike({ id, userId: profile.id }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['black']}
            tintColor="black"
            progressViewOffset={80}
          />
        }
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemProfileAndActionContainer}>
              <TouchableOpacity
                style={styles.profileAndNameContainer}
                activeOpacity={0.8}
                onPress={() => {
                  if (item?.user_id === profile.id) {
                    navigation.navigate('MainTabs', { screen: 'Profile' });
                  } else {
                    navigation.navigate('SearchedProfile', {
                      id: item?.user_id,
                      username: item?.username,
                    });
                  }
                }}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item?.post_media_url }}
                    style={styles.profileImageStyle}
                  ></Image>
                </View>
                <View>
                  <Text style={styles.usernameStyle}>
                    {item?.username || 'Unknown'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5
                  name="ellipsis-v"
                  size={15}
                  color="white"
                  iconStyle="solid"
                />
              </TouchableOpacity>
            </View>

            {/* image */}
            <View style={styles.postImageContainer}>
              {item?.post_media_url?.includes('video') ? (
                <Video
                  source={{
                    uri: item?.post_media_url,
                  }}
                  style={{ height: rh(50), width: rw(100) }}
                  paused={false} 
                  repeat={true} 
                  muted={true}
                />
              ) : (
                <Image
                  source={{ uri: item?.post_media_url }}
                  style={styles.postImageStyle}
                  resizeMode="cover"
                ></Image>
              )}
            </View>

            <View style={styles.postActionContainer}>
              <View style={styles.postActionLeftContainer}>
                <TouchableOpacity
                  style={styles.actionIconContainer}
                  onPress={() => toggleLike(item.id)}
                >
                  <FontAwesome5
                    name="heart"
                    size={25}
                    color={item?.isLiked ? 'red' : 'white'}
                    iconStyle={item.isLiked ? 'solid' : null}
                  />
                  <Text style={styles.actionTextStyle}>
                    {item?.likesCount == 0 ? '' : item?.likesCount}
                    {item?.isLiked}
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.actionIconContainer}>
                  <FontAwesome5 name="comment" size={25} color="white" />
                  <Text style={styles.actionTextStyle}>{25}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionIconContainer}>
                  <FontAwesome5 name="heart" size={25} color="white" />
                  <Text style={styles.actionTextStyle}>{25}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconContainer}>
                  <FontAwesome5 name="heart" size={25} color="white" />
                  <Text style={styles.actionTextStyle}>{25}</Text>
                </TouchableOpacity> */}
              </View>

              <View>
                <TouchableOpacity>
                  <FontAwesome5 name="bookmark" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.postDetailContainer}>
              <View>
                <Text style={styles.postDescTextStyle}>
                  {showMore && selectedShowMoreIndex === index
                    ? `${item?.content} `
                    : `${item?.content.substring(0, 90)}`}
                  {item?.content.length > 90 && (
                    <Text
                      style={styles.showMoreLessTextStyle}
                      onPress={() => {
                        setShowMore(!showMore);
                        setSelectedShowMoreIndex(index);
                      }}
                    >
                      {showMore && selectedShowMoreIndex === index
                        ? ' show less'
                        : ' show more'}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
        // ListHeaderComponent={
        //   <StoriesSlider stories={allStories}></StoriesSlider>
        // }
        ListEmptyComponent={<EmptyData title={'Post'}></EmptyData>}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: Post.length === 0 ? 'center' : 'flex-start',
          alignItems: Post.length === 0 ? 'center' : 'stretch',
        }}
      ></FlatList>
    </View>
  );
};

export default Home;
