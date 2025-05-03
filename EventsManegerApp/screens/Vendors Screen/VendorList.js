import React from "react";

function VendorList() {
  return (
    <FlatList
      data={services1}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.vendorCard}
          onPress={() => navigation.navigate("Vendor Details")}
        >
          <MaterialIcons name="store" size={40} color="#2a5298" />
          <View style={styles.vendorInfo}>
            <Text style={styles.vendorName}>{item.type}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.vendorsList}
    />
  );
}

export default VendorList;
