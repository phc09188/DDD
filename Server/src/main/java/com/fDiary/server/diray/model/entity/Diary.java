package com.fDiary.server.diray.model.entity;

import com.fDiary.server.diray.model.type.DiaryGrade;
import com.fDiary.server.diray.model.type.MealTime;
import com.fDiary.server.oauth.model.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;
    private String writeDate;
    //위도
    private Double lat;
    //경도
    private Double lnt;

    @Enumerated(EnumType.STRING)
    private DiaryGrade diaryGrade;

    @OneToOne
    private DiaryImage diaryImage;

    @Enumerated(EnumType.STRING)
    private MealTime mealTime;

    @JoinColumn(name = "memberId")
    @ManyToOne
    @JsonIgnore
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "diary", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Food> foods = new ArrayList<>();


}
