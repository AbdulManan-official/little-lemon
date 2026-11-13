import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Avatar = ({ profile, size = 44 }) => {
  if (profile?.image) {
    return (
      <Image
        source={{ uri: profile.image }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    );
  }
  return (
    <View style={[s.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: size / 2.4 }}>
        {(profile?.firstName?.[0] || 'T').toUpperCase()}{(profile?.lastName?.[0] || '').toUpperCase()}
      </Text>
    </View>
  );
};

export default function Header({ profile, onBack, onProfile }) {
  return (
    <SafeAreaView edges={['top']} style={s.safe}>
      <View style={s.bar}>
        <View style={s.sideSlot}>
          {onBack ? (
            <Pressable onPress={onBack} style={s.backBtn}>
              <Text style={s.backArrow}>←</Text>
            </Pressable>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>

        <Image
          source={require('../assets/images/logo.png')}
          style={s.logoImg}
          resizeMode="contain"
        />

        <View style={s.sideSlotRight}>
          {profile ? (
            <Pressable onPress={onProfile} disabled={!onProfile}>
              <Avatar profile={profile} size={46} />
            </Pressable>
          ) : (
            <View style={{ width: 46 }} />
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
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sideSlot: {
    width: 46,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideSlotRight: {
    width: 46,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImg: {
    width: 175,
    height: 44,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3E524B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  avatar: {
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
