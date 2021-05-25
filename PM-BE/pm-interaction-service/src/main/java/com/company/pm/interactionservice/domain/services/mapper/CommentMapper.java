package com.company.pm.interactionservice.domain.services.mapper;

import com.company.pm.domain.interactionservice.Comment;
import com.company.pm.interactionservice.domain.services.dto.CommentDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentMapper {
    
    private final ModelMapper mapper;
    
    public Comment commentDTOToComment(CommentDTO commentDTO) {
        return mapper.map(commentDTO, Comment.class);
    }
}
