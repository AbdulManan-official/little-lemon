import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Avatar = ({ profile, size = 40 }) => {
  if (profile?.image) {
    return (
      <Image
        source={{ uri: profile.image }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
  return (
    <View style={[s.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: size / 2.5 }}>
        {(profile?.firstName?.[0] || '?').toUpperCase()}{(profile?.lastName?.[0] || '').toUpperCase()}
      </Text>
    </View>
  );
};

export default function Header({ profile, onBack, onProfile }) {
  return (
    <SafeAreaView edges={['top']} style={s.safe}>
      <View style={s.bar}>
        <View style={{ width: 40, alignItems: 'flex-start' }}>
          {onBack && (
            <Pressable onPress={onBack} style={s.back}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>←</Text>
            </Pressable>
          )}
        </View>
        <Text style={s.logo}>🍋 LITTLE LEMON</Text>
        <View style={{ width: 40, alignItems: 'flex-end' }}>
          {onProfile && (
            <Pressable onPress={onProfile}>
              <Avatar profile={profile} />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  logo: { fontWeight: 'bold', letterSpacing: 2, color: '#495E57', fontSize: 18 },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
