package com.fDiary.server.diray.model.entity;

import com.fDiary.server.diray.model.dto.FoodDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Table(name = "food")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    private String name;
    private String calories;
    private String weight;
    private String tan;
    private String dan;
    private String ji;
    private String na;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="diaryId")
    private Diary diary;

    public static Food dtoToFood(FoodDto dto, Diary diary) {
        return Food.builder()
                .name(dto.getName())
                .calories(dto.getCalories())
                .weight(dto.getWeight())
                .tan(dto.getTan())
                .dan(dto.getDan())
                .ji(dto.getJi())
                .na(dto.getNa())
                .diary(diary)
                .build();
    }
}
