package com.fDiary.server.diray.reppository;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food,Long> {
    List<Food> findAllByDiary(Diary diary);
}
