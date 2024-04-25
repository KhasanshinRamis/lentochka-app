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
        location.reload();
    }
    
    const onAdd = (friend: IFriends) => {
        mutationAcceptFriend.mutate({friend})
        location.reload();
    }

    const onDeny = (friend: IFriends) => {
        mutationDenyFriend.mutate({friend})
        location.reload();
    }

    const onDelete = (friend: IFriends) => {
        mutationDeleteFriend.mutate({friend})
        location.reload();
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
    
    return (
        <div className="p-2">
            <div className="flex flex-col gap-y-8">
                <div className="flex items-center justify-center">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="nickname" onChange={(event) => setInputValue(event.target.value)} />
                        <Button type="submit" onClick={onSearchClick}>Search</Button>
                    </div>
                </div>
                {data?.data && (
                    <div className="flex flex-row gap-x-4 items-center">
                        <div className="relative w-12 h-12">
                            <img
                                src={data?.data.image ? data?.data.image : "/avatar.png"}
                                alt="������ �����"
                                className="rounded-full w-full h-full object-cover"
                            />
                            
                        </div>
                        <div className="ml-4">{data?.data.nickname}</div>
                        {!friendsdata.some((friend: any) => friend.nicknameTo === data?.data.nickname) && !potentialfriendsdata.friendsfrom.some((friend: any) => friend.nicknameTo === data?.data.nickname) && (
                        <Button onClick={onAddFriend}>Add Friend</Button>
                    )}
                    </div>
                )}
 
                <div className="text-zinc-950 ">
                        {potentialfriendsdata?.friends.map((friend: any) => (
                            <div key={friend.id}>
                            <div className="flex flex-col gap-y-2">
                            <div className="text-lg">������ � ������</div>
                            <div className="flex">
                                <div className="flex flex-row items-center gap-x-4">
                                    <div className="relative w-12 h-12">
                                        <img
                                            src={data?.data.image ? data?.data.image : "/avatar.png"}
                                            alt="������ �����"
                                            className="rounded-full w-full h-full object-cover"
                                        />
                                        
                                    </div>
                                    <div>{friend.nicknameBy}</div>
                                    <div className="flex flex-row gap-x-1">
                                        <Button onClick={() => onAdd(friend)}>�������</Button>
                                        <Button onClick={() => onDeny(friend)}>���������</Button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        ))}
                </div>

                <div className="">
                        {isLoading && (
                            <div className="flex items-center justify-center text-lg">��������...</div>
                        )}

                        {isSuccess && (
                            <div className="flex flex-col gap-y-4">
                                <div className="text-lg">������</div>
                                {friendsdata.map((friend: any) => (
                                <div key={friend?.id} className="flex items-center flex-row gap-4">
                                    <div className="relative w-12 h-12">
                                        <img
                                            src={data?.data.image ? data?.data.image : "/avatar.png"}
                                            alt="������ �����"
                                            className="rounded-full w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-zinc-950">{friend?.nicknameTo}</div>
                                    <Button onClick={() => onDelete(friend)}>�������</Button>
                                </div>
                            ))}
                        </div>)}
                </div>
                
            </div>   
        </div>
    );
};

export default Content;
