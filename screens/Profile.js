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
import { AuthContext } from '../AuthContext';
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
      Alert.alert('Permission needed', 'Camera roll permission is required to upload an avatar.');
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
      <Header profile={p} onBack={() => navigation.goBack()} onProfile={() => {}} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={s.card}>
          <Text style={s.h}>Personal information</Text>

          <Text style={s.label}>Avatar</Text>
          <View style={s.avatarRow}>
            <Avatar profile={p} size={76} />
            <Pressable style={s.changeBtn} onPress={pickImage}>
              <Text style={s.changeBtnText}>Change</Text>
            </Pressable>
            <Pressable style={s.removeBtn} onPress={removeImage}>
              <Text style={s.removeBtnText}>Remove</Text>
            </Pressable>
          </View>

          {[
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['email', 'Email'],
            ['phone', 'Phone number'],
          ].map(([k, l]) => (
            <View key={k}>
              <Text style={s.label}>{l}</Text>
              <TextInput
                style={s.input}
                value={p[k]}
                onChangeText={(v) => set(k, v)}
                placeholder={k === 'phone' ? '(217) 555-0113' : ''}
                placeholderTextColor="#9CA3AF"
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
              <Text style={s.discardText}>Discard changes</Text>
            </Pressable>
            <Pressable
              disabled={!phoneOk}
              style={[s.save, !phoneOk && { backgroundColor: '#aaa' }]}
              onPress={save}
            >
              <Text style={s.saveText}>Save changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 18,
    backgroundColor: '#fff',
  },
  h: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 14,
    marginBottom: 6,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  changeBtn: {
    backgroundColor: '#495E57',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginLeft: 18,
  },
  changeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  removeBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#495E57',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginLeft: 14,
  },
  removeBtnText: {
    color: '#495E57',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 6,
    fontSize: 13,
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#374151',
  },
  logout: {
    backgroundColor: '#F4CE14',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#EAB308',
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F2937',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  discard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  discardText: {
    color: '#495E57',
    fontWeight: 'bold',
    fontSize: 15,
  },
  save: {
    flex: 1,
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
