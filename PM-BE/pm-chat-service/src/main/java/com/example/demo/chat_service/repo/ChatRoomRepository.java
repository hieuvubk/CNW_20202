package com.example.demo.chat_service.repo;

import com.example.demo.chat_service.model.Room;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface ChatRoomRepository extends R2dbcRepository<Room, Long> {

    @Query("SELECT * FROM room entity WHERE entity.senderId = :senderId AND entity.recipientId = :recipientId")
    Mono<Room> findBySenderIdAndRecipientId(String senderId, String recipientId);
}
