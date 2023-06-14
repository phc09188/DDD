package com.fDiary.server.diray.model.dto;


import com.fDiary.server.diray.model.entity.Food;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class FoodDto {
    private String name;
    private String calories;
    private String weight;
    private String tan;
    private String dan;
    private String ji;
    private String na;

    public static List<FoodDto> foodToDto(List<Food> foods) {
        List<FoodDto> list = new ArrayList<>();
        for(Food el : foods){
            list.add(FoodDto.builder()
                            .name(el.getName())
                            .calories(el.getCalories())
                            .weight(el.getWeight())
                            .tan(el.getTan())
                            .dan(el.getDan())
                            .ji(el.getJi())
                            .na(el.getNa())
                            .build());
        }
        return list;
    }
}
