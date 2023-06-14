package com.fDiary.server.oauth.repository;

import com.fDiary.server.oauth.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberImageRepository extends JpaRepository<Image, Long> {
}
