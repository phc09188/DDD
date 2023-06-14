package com.fDiary.server.oauth.model;

import com.fDiary.server.oauth.model.MemberStrategy.MemberStrategy;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Builder
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@DynamicUpdate
public class Member implements Persistable<String> {

    @Id
    @NonNull
    @Column(updatable = false, unique = true)
    private String userId;     //사용자 ID값
    private String username;
    private String password;
    @NonNull
    @Column(unique = true)
    private String email;
    private String phoneNo;
    private boolean social;
    @Enumerated(EnumType.STRING)
    private Provider provider;
    @Enumerated(EnumType.STRING)
    private List<Role> roles;
    @OneToOne(fetch = FetchType.LAZY)
    private MemberImage memberImage;    //프로필 사진

    private MemberStrategy strategy;

    @CreatedDate
    @Column(updatable = false)
    @NonNull
    private LocalDateTime createdDate;

    public void updateMemberImage(MemberImage memberImage) {
        this.memberImage = memberImage;
    }

    public void updateRole(Role role) {
        if(this.roles == null) {
            this.roles = new ArrayList<>();
        }

        if(this.roles.contains(role)) {
            this.roles.remove(role);
        }
        else {
            this.roles.add(role);
        }
    }

    public void updateSocial(Provider provider) {
        this.social = true;
        this.provider = provider;
    }


    @Override
    public String getId() {
        return userId;
    }

    @Override
    public boolean isNew() {
        return createdDate == null;
    }
}
