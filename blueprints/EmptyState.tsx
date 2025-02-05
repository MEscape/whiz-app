import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { Image } from "./Image";
import { Images, ImageUris } from "assets/images";

export const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-4">
        <Image src={{dark: ImageUris[Images.LOGO_LIGHT], light: ImageUris[Images.LOGO_DARK]}} classNameContainer="h-20 w-20" />
        <View className="mt-2 flex justify-center items-center">
            <Text variant="h1" text="Kein Inhalt" />
            <Text variant="body" text="Hier gibt es momentan nichts zu sehen." className="text-gray-500 text-center" />
        </View>
    </View>
);
