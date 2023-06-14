package com.fDiary.server.diray.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiaryWriteDTO {
    private String writeDate;
    private Double lat;
    private Double lnt;
    private String mealTime;
    private List<FoodDto> foods;
}
