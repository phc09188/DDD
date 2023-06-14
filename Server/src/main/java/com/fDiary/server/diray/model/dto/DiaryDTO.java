package com.fDiary.server.diray.model.dto;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.DiaryImage;
import com.fDiary.server.diray.model.entity.Food;
import com.fDiary.server.diray.model.type.MealTime;
import com.fDiary.server.diray.reppository.FoodRepository;
import com.fDiary.server.oauth.model.Member;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryDTO {
    private Long diaryId;
    private String writeDate;
    //위도
    private Double lat;
    //경도
    private Double lnt;

    private String mealTime;

    private String fileUrl;


    private List<FoodDto> foods = new ArrayList<>();


    public static List<DiaryDTO> toDiary(List<Diary> diaries) throws FileNotFoundException {
        List<DiaryDTO> list = new ArrayList<>();
        for(Diary el : diaries){
            list.add(
                    DiaryDTO.builder()
                            .diaryId(el.getDiaryId())
                            .writeDate(el.getWriteDate())
                            .lat(el.getLat())
                            .lnt(el.getLnt())
                            .foods(FoodDto.foodToDto(el.getFoods()))
                            .mealTime(el.getMealTime().name())
                            .fileUrl(el.getDiaryImage().getFileUrl())
                            .build()
            );
        }
        return list;
    }
}
