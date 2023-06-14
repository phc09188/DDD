package com.fDiary.server.diray.model.entity;

import com.fDiary.server.oauth.model.Image;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class DiaryImage extends Image {
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    private Diary diary;
}
