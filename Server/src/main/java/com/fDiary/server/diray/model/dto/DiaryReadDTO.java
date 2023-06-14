package com.fDiary.server.diray.model.dto;

import com.fDiary.server.diray.model.entity.Diary;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryReadDTO {
    private boolean[] diaryExist;
    private List<DiaryDTO> diaries;
}
