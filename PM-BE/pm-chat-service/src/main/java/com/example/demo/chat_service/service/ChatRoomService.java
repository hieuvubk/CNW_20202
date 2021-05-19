package com.example.demo.chat_service.service;

import com.example.demo.chat_service.model.Room;
import com.example.demo.chat_service.repo.ChatMessageRepository;
import com.example.demo.chat_service.repo.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ChatRoomService {


    private final ChatRoomRepository chatRoomRepository;

    private final ChatMessageRepository chatMessageRepository;


    public Mono<Room> getRoom(String senderId, String recipientId, boolean createIfNotExist) {
        if(!createIfNotExist) {
            return chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId);
        }
        Room room1 = new Room();
        Room room2 = new Room();

        room1.setSenderId(senderId);
        room1.setRecipientId(recipientId);

        room2.setSenderId(recipientId);
        room2.setRecipientId(senderId);

        Mono<Room> roomMono = chatRoomRepository.save(room2);
        return chatRoomRepository.save(room1);
    }

}
