package com.fDiary.server.diray.model.dto;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.DiaryImage;
import com.fDiary.server.diray.model.entity.Food;
import com.fDiary.server.diray.model.type.MealTime;
import com.fDiary.server.oauth.model.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class DiarySearchDTO {
    private Long diaryId;

    private String writeDate;
    //위도
    private Double lat;
    //경도
    private Double lnt;

    private String fileUrl;

    private String mealTime;

    private String memberId;

    private List<Food> foods = new ArrayList<>();

    public static DiarySearchDTO diaryToDTO(Diary diary) {
        return DiarySearchDTO.builder()
                .diaryId(diary.getDiaryId())
                .fileUrl(diary.getDiaryImage().getFileUrl())
                .lat(diary.getLat())
                .lnt(diary.getLnt())
                .foods(diary.getFoods())
                .mealTime(diary.getMealTime().name())
                .memberId(diary.getMember().getUserId())
                .writeDate(diary.getWriteDate())
                .build();
    }
}
