"use client"
import React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import friendsService from '@/services/friendsService';
import potentialFriendsService from '@/services/potentialFriendsService';
import { IFriends } from '@/interface/IFriend';
import { useCurrentUser } from '@/hooks/useCurrentUser';


const Content: React.FC = () => {
    const user = useCurrentUser()
    const queryClient = useQueryClient()
    const [inputValue, setInputValue] = useState<string>('')
    const [data, setData] = useState<any>()

    const onSearchClick = () => {
        if (inputValue != user?.nickname){
            mutationGetFriendByNickname.mutate({inputValue})
        }
    }

    const onAddFriend = () => {
        mutationAddFriend.mutate({nickname})
    }
    
    const onAdd = (friend: IFriends) => {
        mutationAcceptFriend.mutate({friend})
    }

    const onDeny = (friend: IFriends) => {
        mutationDenyFriend.mutate({friend})
    }

    const onDelete = (friend: IFriends) => {
        mutationDeleteFriend.mutate({friend})
    }

    const {data: friendsdata, isSuccess, isLoading} = useQuery({ 
        queryKey: ['friends'],
        queryFn: () => friendsService.getAll(),
        select: ({data}) => data
    })

    const {data: potentialfriendsdata} = useQuery({ 
        queryKey: ['potentialfriends'],
        queryFn: () => potentialFriendsService.getAll(),
        select: ({data}) => data
    })

    const mutationGetFriendByNickname = useMutation({
        mutationKey: ['getfriendsbynickname'],
        mutationFn: (nickname: string) => friendsService.getbynickname(nickname),
        onSuccess: (data) => {console.log(data), setData(data)},
        onError: (error) => console.log(error.message),
    })

    const mutationAddFriend = useMutation({
        mutationKey: ['addfriend'],
        mutationFn: (nickname: string) => potentialFriendsService.addfriendbynickname(nickname),
        onSuccess: (data) => {console.log(data), setData(data)},
        onError: (error) => console.log(error.message),
    })

    const mutationAcceptFriend = useMutation({
        mutationKey: ['addfriend'],
        mutationFn: (friend: IFriends) => friendsService.updatefriend(friend),
        onSuccess: (data) => {console.log(data), setData(data)},
        onError: (error) => console.log(error.message),
    })

    const mutationDenyFriend = useMutation({
        mutationKey: ['denyfriend'],
        mutationFn: (friend: IFriends) => potentialFriendsService.deletepotentialfriend(friend),
        onSuccess: (data) => {console.log(data), setData(data)},
        onError: (error) => console.log(error.message),
    })

    const mutationDeleteFriend = useMutation({
        mutationKey: ['deletefriend'],
        mutationFn: (friend: IFriends) => friendsService.deletefriend(friend),
        onSuccess: (data) => {console.log(data)},
        onError: (error) => console.log(error.message),
    })


    const nickname: string = data?.data.nickname
    friendsdata?.filter((friend: any) => data?.data.nickname != friend.nicknameTo && console.log("ХУЙНЯ",friend))

    // data?.data.nickname

    return (
        <div>
            <div className="flex flex-col gap-y-2">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="search" placeholder="nickname" onChange={(event) => setInputValue(event.target.value)} />
                    <Button type="submit" onClick={onSearchClick}>Search</Button>
                </div>
                {data?.data && (
                    <div className='grid grid-cols-2'>
                    {data?.data.nickname}
                    {!friendsdata.find(() => data?.data.nickname) && (
                        <Button onClick={onAddFriend}>ДОБАВИТЬ ДРУГА</Button>
                    )}
                </div>
                )} 

                <div className="text-zinc-950 ">
                        {potentialfriendsdata?.map((friend: any) => (
                            <div key={friend.id}>
                                <h1>Добавить в друзья</h1>
                                <div>{friend.nicknameBy}</div>
                                <Button onClick={() => onAdd(friend)}>Принять</Button>
                                <Button onClick={() => onDeny(friend)}>Отклонить</Button>
                            </div>
                        ))}
                </div>

                <div className="">

                        {isLoading && (
                            <div>Загрузка</div>
                        )}

                        {isSuccess && (
                            <div className="">
                                {friendsdata.map((friend: any) => (
                                <div key={friend?.id}>
                                    <div className="text-zinc-950">{friend?.nicknameTo}</div>
                                    <Button onClick={() => onDelete(friend)}>Удалить</Button>
                                </div>
                            ))}
                        </div>)}
                </div>
                
            </div>   
        </div>
    );
};

export default Content;
