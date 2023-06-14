package com.fDiary.server.oauth.repository;

import com.fDiary.server.oauth.model.Member;
import com.fDiary.server.oauth.model.MemberDTO;
import com.fDiary.server.oauth.model.MemberRequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    MemberDTO memberToMemberDTO(Member member);

    @Mapping(target = "password", ignore = true)
    Member memberDTOToMember(MemberDTO memberDTO);

}
