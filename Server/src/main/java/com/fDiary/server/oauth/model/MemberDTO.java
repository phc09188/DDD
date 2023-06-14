package com.fDiary.server.oauth.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class MemberDTO {

    private String userId;
    private String username;
    private String email;
    private String phoneNo;
    private boolean social;
    private Provider provider;
    private MemberImage memberImage;
    private List<Role> roles;
    private LocalDateTime createdDate;

    @Builder
    public MemberDTO(String userId, String username, String email, String phoneNo,  boolean social, Provider provider, MemberImage memberImage, List<Role> roles, LocalDateTime createdDate) {
        this.userId = userId;
        this.username = username;

        this.email = email;
        this.phoneNo = phoneNo;
        this.social = social;
        this.provider = provider;
        this.memberImage = memberImage;
        this.roles = roles;
        this.createdDate = createdDate;
    }
}
