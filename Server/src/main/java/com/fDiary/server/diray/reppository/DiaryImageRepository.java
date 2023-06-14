package com.fDiary.server.diray.reppository;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.DiaryImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiaryImageRepository extends JpaRepository<DiaryImage, Long> {
    Optional<DiaryImage> findByDiary(Diary el);
}
