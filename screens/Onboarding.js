import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../App';
import Header from './Header';

const validName = (n) => /^[A-Za-z ]+$/.test(n.trim());
const validEmail = (e) => /^\S+@\S+\.\S+$/.test(e.trim());

export default function Onboarding() {
  const { complete } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const enabled = validName(firstName) && validEmail(email);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#EDEFEE' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header />
      <View style={s.hero}><Text style={s.heroText}>Let us get to know you</Text></View>
      <View style={s.form}>
        <Text style={s.label}>First Name *</Text>
        <TextInput style={s.input} value={firstName} onChangeText={setFirstName} placeholder="Tilly" />
        <Text style={s.label}>Email *</Text>
        <TextInput style={s.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="tilly@example.com" />
      </View>
      <View style={s.footer}>
        <Pressable
          disabled={!enabled}
          style={[s.btn, !enabled && s.btnOff]}
          onPress={() => complete({ firstName: firstName.trim(), lastName: '', email: email.trim(), phone: '', image: null, notif: { orders: true, password: true, offers: true, news: true } })}
        >
          <Text style={s.btnText}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  hero: { backgroundColor: '#495E57', padding: 30, alignItems: 'center' },
  heroText: { color: '#EDEFEE', fontSize: 26, fontWeight: 'bold' },
  form: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  label: { fontSize: 20, color: '#495E57', fontWeight: 'bold', marginTop: 12 },
  input: { borderWidth: 2, borderColor: '#495E57', borderRadius: 10, padding: 10, fontSize: 18, backgroundColor: '#fff', marginTop: 6 },
  footer: { padding: 24, alignItems: 'flex-end' },
  btn: { backgroundColor: '#495E57', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 36 },
  btnOff: { backgroundColor: '#aaa' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
