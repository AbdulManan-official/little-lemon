import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const API = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const img = (f) => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${encodeURIComponent(f)}?raw=true`;
const CATEGORIES = ['starters', 'mains', 'desserts', 'drinks'];

export default function Home({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      AsyncStorage.getItem('profile').then((p) => p && setProfile(JSON.parse(p)));
    });
    return unsub;
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const cached = await AsyncStorage.getItem('menu');
        if (cached) {
          setMenu(JSON.parse(cached));
          setLoading(false);
        }
        const res = await fetch(API);
        const json = await res.json();
        if (json && json.menu) {
          setMenu(json.menu);
          AsyncStorage.setItem('menu', JSON.stringify(json.menu));
        }
      } catch (e) {
        console.warn('Network error, using cached data if available:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const data = useMemo(() => {
    return menu.filter((m) => {
      const matchCategory = selected.length === 0 || selected.includes(m.category?.toLowerCase());
      const matchSearch = m.name?.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [menu, selected, query]);

  const toggle = (c) => {
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const Top = (
    <View>
      <View style={s.hero}>
        <Text style={s.title}>Little Lemon</Text>
        <View style={s.row}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={s.city}>Chicago</Text>
            <Text style={s.about}>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image source={{ uri: img('Hero image.png') }} style={s.heroImg} resizeMode="cover" />
        </View>
        <TextInput
          style={s.search}
          placeholder="Search dishes"
          placeholderTextColor="#777"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>
      <Text style={s.delivery}>ORDER FOR DELIVERY!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.cats}>
        {CATEGORIES.map((c) => {
          const isSelected = selected.includes(c);
          return (
            <Pressable
              key={c}
              onPress={() => toggle(c)}
              style={[s.chip, isSelected && s.chipOn]}
            >
              <Text style={[s.chipText, isSelected && { color: '#fff' }]}>
                {c[0].toUpperCase() + c.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header profile={profile} onProfile={() => navigation.navigate('Profile')} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#495E57" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(i, index) => i.name + index}
          ListHeaderComponent={Top}
          ListEmptyComponent={
            <Text style={s.emptyText}>No dishes found</Text>
          }
          ItemSeparatorComponent={() => <View style={s.sep} />}
          renderItem={({ item }) => (
            <View style={s.item}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={s.name}>{item.name}</Text>
                <Text numberOfLines={2} style={s.desc}>{item.description}</Text>
                <Text style={s.price}>${Number(item.price).toFixed(2)}</Text>
              </View>
              <Image source={{ uri: img(item.image) }} style={s.dish} resizeMode="cover" />
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: '#495E57', padding: 16 },
  title: { color: '#F4CE14', fontSize: 36, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  city: { color: '#fff', fontSize: 22, fontWeight: '600' },
  about: { color: '#EDEFEE', fontSize: 14, marginTop: 8, lineHeight: 20 },
  heroImg: { width: 100, height: 110, borderRadius: 12 },
  search: {
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    padding: 10,
    marginTop: 14,
    fontSize: 16,
    color: '#333',
  },
  delivery: { fontWeight: 'bold', fontSize: 18, margin: 16, marginBottom: 10, color: '#333' },
  cats: { paddingHorizontal: 16, marginBottom: 12 },
  chip: {
    backgroundColor: '#EDEFEE',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  chipOn: { backgroundColor: '#495E57' },
  chipText: { fontWeight: 'bold', color: '#495E57' },
  sep: { height: 1, backgroundColor: '#e0e0e0', marginHorizontal: 16 },
  item: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  name: { fontWeight: 'bold', fontSize: 17, color: '#333' },
  desc: { color: '#495E57', marginVertical: 4, fontSize: 14, lineHeight: 18 },
  price: { color: '#495E57', fontWeight: 'bold', fontSize: 16, marginTop: 2 },
  dish: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#f0f0f0' },
  emptyText: { textAlign: 'center', margin: 30, color: '#777', fontSize: 16 },
});
