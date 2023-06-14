package com.fDiary.server.oauth.service;

import com.fDiary.server.oauth.model.ImageDTO;
import com.fDiary.server.oauth.model.MemberStrategy.MemberStrategy;
import com.fDiary.server.util.FileService;
import com.fDiary.server.token.model.TokenDTO;
import com.fDiary.server.oauth.model.*;
import com.fDiary.server.oauth.repository.MemberMapper;
import com.fDiary.server.oauth.repository.MemberImageRepository;
import com.fDiary.server.oauth.repository.MemberRepository;
import com.fDiary.server.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;


import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final MemberImageRepository imageRepository;
    private final TokenService tokenService;
    private final FileService fileService;
    private final AuthService authService;

    private String uploadPath = "/Users/chandle/8am_Server";

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        return memberRepository.findByUserId(userId)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("userId: " + userId + "를 데이터베이스에서 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(Member member) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getRoles().stream().map(Role::getType).collect(Collectors.joining(",")));

        return new User(
                member.getUserId(),
                member.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }

    //이미지를 eager로 불러옴
    public Member findMemberByUserId(String userId) {
        return memberRepository.findByUserIdEagerLoadImage(userId)
                .orElseThrow(() -> new RuntimeException("해당 ID를 가진 사용자가 존재하지 않습니다."));
    }


    @Transactional(readOnly = false)
    public MemberImage saveMemberImage(MultipartFile file) {
        String originalName = file.getOriginalFilename();
        Path root = Paths.get(uploadPath, "member");

        try {
            ImageDTO imageDTO =  fileService.createImageDTO(originalName, root);
            MemberImage memberImage = MemberImage.builder()
                    .uuid(imageDTO.getUuid())
                    .fileName(imageDTO.getFileName())
                    .fileUrl(imageDTO.getFileUrl())
                    .build();

            file.transferTo(Paths.get(imageDTO.getFileUrl()));

            return imageRepository.save(memberImage);
        } catch (IOException e) {
            log.warn("업로드 폴더 생성 실패: " + e.getMessage());
        }

        return null;
    }

    public void selectUserType(String userId, String type) {
        Optional<Member> optionalMember =  memberRepository.findByUserId(userId);
        if(optionalMember.isEmpty()){
            throw new NotFoundException("회원정보가 없습니다.");
        }
        Member member = optionalMember.get();
        member.setStrategy(getEnumStrategy(type));
        memberRepository.save(member);
    }

    public MemberStrategy getEnumStrategy(String type){
        switch (type) {
            case "저탄고지" -> {
                return MemberStrategy.LTANHJI;
            }
            case "고단백" -> {
                return MemberStrategy.HDAN;
            }
            case "일반식" -> {
                return MemberStrategy.NORMAL;
            }
            case "다이어트식" -> {
                return MemberStrategy.DIET;
            }
        }
        throw new RuntimeException("존재하지 않는 전략입니다.");
    }
}
