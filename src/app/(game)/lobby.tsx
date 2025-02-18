import React, { useEffect, useState } from "react"
import { View } from "react-native"

import { useHeader } from "@/hooks"
import { TransferUser } from "@/services"

import { Text } from "blueprints/Text"

import ProfileImage from "@/components/ProfileImage"
import TcpEventManager from '@/services/TcpEventManager'
import { Button } from "blueprints/Button"

const LobbyScreen = () => {
    const [lobbyId, setLobbyId] = useState('dsfafdjdd')
    const [users, setUsers] = useState<Record<string, TransferUser>>({
        "1": {equippedEmoji: "3", profileImage: null, username: "Test"},
        "2": {equippedEmoji: "5", profileImage: null, username: "Test"},
        "3": {equippedEmoji: "6", profileImage: null, username: "Test"},
        "4": {equippedEmoji: "6", profileImage: null, username: "Test"},
        "5": {equippedEmoji: "6", profileImage: null, username: "Test"}
    })

    useHeader({
        TitleActionComponent: (
            <View className="flex justify-center items-center">
                <Text variant="h1" className="text-4xl" tx="tabs.lobby" />
                <Text variant="h1" textColor="text-accent" uppercase>{lobbyId}</Text>
            </View>
        ),
    }, [])

    useEffect(() => {
    TcpEventManager.on('data', (data) => {
        //if (data.data.id) setLobbyId(data.data.id)
        //if (data.data.users) setUsers(data.data.users)
    })

    return () => {
        TcpEventManager.removeAllListeners()
    }
    }, [])

    return (
        <>
            <View className="bg-primary flex-1 p-4">
                <View className="flex-row flex-wrap gap-4">
                    {Object.values(users).map((user: TransferUser, index: number) => (
                        <View className="items-center w-24" key={index}>
                            <ProfileImage
                                imageUrl={user.profileImage}
                                disabled
                                equippedEmojiId={user.equippedEmoji}
                            />
                            <Text className="mt-2 text-center">{user.username}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <Button disabled={Object.keys(users).length > 1} tx="common.start" className="h-12" outerClassName="absolute bottom-6 w-full p-4" />
        </>
    )
}

export default LobbyScreen