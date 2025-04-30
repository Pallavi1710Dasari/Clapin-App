import React, { useState, useRef } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  FlatList, 
  TouchableOpacity,
  Text 
} from 'react-native';
import { Colors } from '../../../constants/constantStyles';

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Handle scroll end to update active index
  const handleScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(pageNum);
  };

  // Render each image
  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: item }} 
        style={styles.image}
        resizeMode="cover"
      />
      {images.length > 1 && (
        <Text style={styles.imageCounter}>
          {index + 1}/{images.length}
        </Text>
      )}
    </View>
  );

  // Render pagination dots
  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : {}
            ]}
            onPress={() => {
              flatListRef.current.scrollToIndex({
                animated: true,
                index: index
              });
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => `image-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(data, index) => ({
          length: width - 30, // Account for padding
          offset: (width - 30) * index,
          index,
        })}
      />
      {images.length > 1 && renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  imageContainer: {
    width: width - 30, // Account for padding
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '97%',
    height: '100%',
    borderRadius: 8,
    marginLeft:35,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: Colors.textGray,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  imageCounter: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    padding: 5,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default ImageCarousel;