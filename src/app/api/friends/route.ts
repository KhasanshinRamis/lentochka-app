import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    console.log(body)
    const potentialFriend = await db.user.findUnique({
        where: {nickname: body.inputValue}
    })
    console.log(potentialFriend)
    return NextResponse.json(potentialFriend, {status: 200})
}

export const GET = async() => {
    const user = await currentUser()

    if (!user) return NextResponse.json({error: 'Пользователь не авторизован'}, {status: 200})

    const friends = await db.friends.findMany({
        where: {userId: user?.id}
    })

    return NextResponse.json(friends, {status: 200})
}

export const PUT = async(req: NextRequest) => {
    const user = await currentUser()

    const body = await req.json()
    console.log(body)

    const potentialFriendsRecord = await db.potentialFriends.findFirst({
        where: {
            userId: body.friend.userId, 
            userIdPFriend: body.friend.userIdPFriend
        }
    })

    if (!potentialFriendsRecord) return NextResponse.json({error: 'Запись не найдена'}, {status: 401})

        
    await db.$transaction([
        db.friends.create({
            data: {
            nicknameTo: potentialFriendsRecord.nicknameTo as string,
            nicknameBy: potentialFriendsRecord.nicknameBy,
            userId: potentialFriendsRecord.userId,
            userIdPFriend: potentialFriendsRecord.userIdPFriend
        }
        }),

        db.friends.create({
            data: {
            nicknameTo: potentialFriendsRecord.nicknameBy as string,
            nicknameBy: potentialFriendsRecord.nicknameTo,
            userId: potentialFriendsRecord.userIdPFriend,
            userIdPFriend: potentialFriendsRecord.userId
        }
        }),

        db.potentialFriends.delete({
                where: {
                userId: potentialFriendsRecord.userId, 
                userIdPFriend: potentialFriendsRecord.userIdPFriend
            }
        })
    ])
    

    if (!user) return NextResponse.json({error: 'Пользователь не авторизован'}, {status: 200})

    

    return NextResponse.json({message: "Добавлен в друзья"}, {status: 200})

}

