package com.fDiary.server.diray.reppository;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.oauth.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary,Long> {
    Optional<Diary> findByWriteDate(String date);

    List<Diary> findAllByWriteDateAndMember(String date, Member member);
}
