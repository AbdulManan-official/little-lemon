import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../App';
import Header, { Avatar } from './Header';

const NOTIFS = [
  ['orders', 'Order statuses'],
  ['password', 'Password changes'],
  ['offers', 'Special offers'],
  ['news', 'Newsletter'],
];

export default function Profile({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [saved, setSaved] = useState(null);
  const [p, setP] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('profile').then((v) => {
      if (v) {
        const parsed = JSON.parse(v);
        setSaved(parsed);
        setP(parsed);
      }
    });
  }, []);

  if (!p) return null;

  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload an avatar.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      set('image', result.assets[0].uri);
    }
  };

  const removeImage = () => {
    set('image', null);
  };

  const phoneOk = !p.phone || p.phone.trim() === '' || /^\d{10}$/.test(p.phone.trim());

  const save = async () => {
    if (!phoneOk) {
      Alert.alert('Invalid Phone', 'Phone number must be exactly 10 digits.');
      return;
    }
    await AsyncStorage.setItem('profile', JSON.stringify(p));
    setSaved(p);
    Alert.alert('Success', 'Profile changes saved successfully.');
  };

  const discard = () => {
    setP(saved);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header profile={p} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={s.h}>Personal information</Text>

        <Text style={s.small}>Avatar</Text>
        <View style={s.avatarRow}>
          <Avatar profile={p} size={80} />
          <Pressable style={s.changeBtn} onPress={pickImage}>
            <Text style={s.changeBtnText}>Change</Text>
          </Pressable>
          <Pressable style={s.removeBtn} onPress={removeImage}>
            <Text style={s.removeBtnText}>Remove</Text>
          </Pressable>
        </View>

        {[
          ['firstName', 'First name *'],
          ['lastName', 'Last name'],
          ['email', 'Email *'],
          ['phone', 'Phone number (10 digits)'],
        ].map(([k, l]) => (
          <View key={k}>
            <Text style={s.small}>{l}</Text>
            <TextInput
              style={s.input}
              value={p[k]}
              onChangeText={(v) => set(k, v)}
              keyboardType={k === 'phone' ? 'phone-pad' : k === 'email' ? 'email-address' : 'default'}
              autoCapitalize={k === 'email' ? 'none' : 'words'}
            />
          </View>
        ))}

        {!phoneOk && (
          <Text style={s.errorText}>Phone number must be exactly 10 digits if provided</Text>
        )}

        <Text style={[s.h, { marginTop: 24 }]}>Email notifications</Text>
        {NOTIFS.map(([k, l]) => (
          <Pressable
            key={k}
            style={s.check}
            onPress={() => set('notif', { ...p.notif, [k]: !p.notif?.[k] })}
          >
            <View style={[s.box, p.notif?.[k] && { backgroundColor: '#495E57' }]}>
              {p.notif?.[k] && <Text style={{ color: '#fff', fontWeight: 'bold' }}>✓</Text>}
            </View>
            <Text style={s.checkLabel}>{l}</Text>
          </Pressable>
        ))}

        <Pressable style={s.logout} onPress={logout}>
          <Text style={s.logoutText}>Log out</Text>
        </Pressable>

        <View style={s.btns}>
          <Pressable style={s.discard} onPress={discard}>
            <Text style={{ color: '#495E57', fontWeight: 'bold', fontSize: 16 }}>Discard changes</Text>
          </Pressable>
          <Pressable
            disabled={!phoneOk}
            style={[s.save, !phoneOk && { backgroundColor: '#aaa' }]}
            onPress={save}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  small: { fontSize: 14, color: '#495E57', fontWeight: '600', marginTop: 14, marginBottom: 4 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  changeBtn: {
    backgroundColor: '#495E57',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 16,
  },
  changeBtnText: { color: '#fff', fontWeight: 'bold' },
  removeBtn: {
    borderWidth: 1,
    borderColor: '#495E57',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 12,
  },
  removeBtnText: { color: '#495E57', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#EDEFEE',
  },
  errorText: { color: '#d9534f', marginTop: 6, fontSize: 13 },
  check: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkLabel: { marginLeft: 12, fontSize: 15, color: '#333' },
  logout: {
    backgroundColor: '#F4CE14',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#EE9972',
  },
  logoutText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  discard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  save: {
    flex: 1,
    backgroundColor: '#495E57',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
});
