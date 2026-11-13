import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../AuthContext';
import Header from './Header';

const validName = (n) => /^[A-Za-z ]+$/.test(n.trim());
const validEmail = (e) => /^\S+@\S+\.\S+$/.test(e.trim());

export default function Onboarding() {
  const { complete } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const enabled = validName(firstName) && validEmail(email);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#EDEFEE' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={s.hero}>
          <Text style={s.title}>Little Lemon</Text>
          <View style={s.row}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={s.city}>Chicago</Text>
              <Text style={s.about}>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </Text>
            </View>
            <Image
              source={require('../assets/images/hero.png')}
              style={s.heroImg}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={s.form}>
          <Text style={s.label}>First Name *</Text>
          <TextInput
            style={s.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="tilly"
            placeholderTextColor="#888"
          />
          <Text style={s.label}>Email *</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="tillydoe@example.com"
            placeholderTextColor="#888"
          />
        </View>

        <View style={s.footer}>
          <Pressable
            disabled={!enabled}
            style={[s.btn, !enabled && s.btnOff]}
            onPress={() =>
              complete({
                firstName: firstName.trim(),
                lastName: '',
                email: email.trim(),
                phone: '',
                image: null,
                notif: { orders: true, password: true, offers: true, news: true },
              })
            }
          >
            <Text style={s.btnText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: '#495E57', padding: 20 },
  title: { color: '#F4CE14', fontSize: 36, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  city: { color: '#fff', fontSize: 22, fontWeight: '600' },
  about: { color: '#EDEFEE', fontSize: 14, marginTop: 8, lineHeight: 20 },
  heroImg: { width: 100, height: 110, borderRadius: 12 },
  form: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  label: { fontSize: 16, color: '#333', fontWeight: 'bold', marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  footer: { padding: 20, alignItems: 'flex-end' },
  btn: {
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  btnOff: { backgroundColor: '#aaa' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
