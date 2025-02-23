import React from "react"
import { TouchableOpacity, View } from "react-native"

import { Button, Image, Text } from "blueprints"
import { LinearGradient } from "expo-linear-gradient"

import { blackGradient } from "@/constants"
import { useAppContext } from "@/context"

import { ImageUris } from "assets/images"
import { observer } from "mobx-react-lite"

export const StartSection = observer(() => {
    const { gameStore, router } = useAppContext()

    const handleChangeCollection = () => {
        gameStore.setCurrentlySelecting(true)
        router.push('/collection')
    }

    return (
        <View className="absolute bottom-6 w-full p-4">
            <TouchableOpacity onPress={handleChangeCollection} className="relative w-full h-32 flex justify-center items-center">
                <Image 
                    src={ImageUris[gameStore?.collection.image] || gameStore?.collection.image} 
                    classNameContainer="absolute top-0 left-0 w-full h-32 rounded-tl-md rounded-tr-md overflow-hidden" 
                />
                <LinearGradient 
                    colors={blackGradient} 
                    className="absolute top-0 left-0 w-full h-32 rounded-tl-md rounded-tr-md"
                />
                <Text variant="h2" text={gameStore?.collection.name} />
            </TouchableOpacity>
            <Button
                disabled={Object.keys(gameStore.users).length > 1}
                tx="common.start"
                className="h-12 rounded-tr-none rounded-tl-none"
            />
        </View>
    )
})