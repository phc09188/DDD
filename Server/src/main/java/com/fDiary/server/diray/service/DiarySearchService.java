package com.fDiary.server.diray.service;

import com.fDiary.server.diray.model.dto.DiarySearchDTO;
import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.DiaryImage;
import com.fDiary.server.diray.model.entity.Food;
import com.fDiary.server.diray.reppository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiarySearchService {
    private final DiaryMybatisMapper diarySearchMapper;
    private final DiaryRepository diaryRepository;
    private final FoodRepository foodRepository;
    private final DiaryImageRepository diaryImageRepository;

    public  List<DiarySearchDTO> getAllNearLocation(Double lnt, Double lat) throws Exception {
        if(lat<-90 || lat>90 || lnt<-180 || lnt>180){
            throw new Exception("위도 경도 값이 올바르지 않습니다.");
        }
        List<Diary> diaries =  diarySearchMapper.selectListNearLocation(lnt,lat);

        List<DiarySearchDTO> dtos = new ArrayList<>();
        for(Diary el : diaries){
            DiaryImage diaryImage = diaryImageRepository.findByDiary(el).get();
            List<Food> foods = foodRepository.findAllByDiary(el);
            dtos.add(DiarySearchDTO.builder()
                            .diaryId(el.getDiaryId())
                            .lat(el.getLat())
                            .lnt(el.getLnt())
                            .mealTime(el.getMealTime().name())
                            .writeDate(el.getWriteDate())
                            .foods(foods)
                            .fileUrl(diaryImage.getFileUrl())
                    .build());
        }
        return dtos;
    }

    public DiarySearchDTO getDiaryById(Long id) {
        Diary diary =  diaryRepository.findById(id).get();

        return DiarySearchDTO.diaryToDTO(diary);
    }
}
