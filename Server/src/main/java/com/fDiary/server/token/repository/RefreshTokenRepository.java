package com.fDiary.server.token.repository;

import com.fDiary.server.token.model.RefreshToken;
import com.fDiary.server.oauth.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;


@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    Optional<RefreshToken> findByMember(Member member);
    Optional<RefreshToken> findByToken(String token);
}
