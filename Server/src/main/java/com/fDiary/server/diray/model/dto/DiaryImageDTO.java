package com.fDiary.server.diray.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DiaryImageDTO {
    private Long id;
    private String uuid;
    private String fileName;
    private String fileUrl;
    private String petId;

    @Builder
    public DiaryImageDTO(Long id, String uuid, String fileName, String fileUrl, String petId) {
        this.id = id;
        this.uuid = uuid;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.petId = petId;
    }
}
