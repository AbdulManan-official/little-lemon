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

const HERO_IMAGE_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/bruschetta.jpg';

const validName = (n) => /^[A-Za-z ]+$/.test(n.trim());
const validEmail = (e) => /^\S+@\S+\.\S+$/.test(e.trim());

export default function Onboarding() {
  const { complete } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const enabled = validName(firstName) && validEmail(email);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={s.hero}>
          <Text style={s.heroTitle}>Little Lemon</Text>
          <View style={s.heroRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={s.heroCity}>Chicago</Text>
              <Text style={s.heroAbout}>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </Text>
            </View>
            <Image source={{ uri: HERO_IMAGE_URL }} style={s.heroImg} resizeMode="cover" />
          </View>
        </View>

        <View style={s.form}>
          <Text style={s.formHeading}>Let us get to know you</Text>
          <Text style={s.label}>First Name *</Text>
          <TextInput
            style={s.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Tilly"
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
  heroTitle: { color: '#F4CE14', fontSize: 36, fontWeight: 'bold' },
  heroRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  heroCity: { color: '#fff', fontSize: 22, fontWeight: '600' },
  heroAbout: { color: '#EDEFEE', fontSize: 14, marginTop: 8, lineHeight: 20 },
  heroImg: { width: 100, height: 110, borderRadius: 12 },
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  formHeading: { fontSize: 20, fontWeight: 'bold', color: '#495E57', marginBottom: 12 },
  label: { fontSize: 16, color: '#495E57', fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1.5,
    borderColor: '#495E57',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#EDEFEE',
    marginTop: 6,
  },
  footer: { padding: 24, alignItems: 'flex-end' },
  btn: {
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  btnOff: { backgroundColor: '#aaa' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
