package com.fDiary.server.diray.controller;

import com.fDiary.server.diray.model.dto.DiarySearchDTO;
import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.service.DiarySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary/search")
public class DiarySearchController {
    private final Double DEFAULT_LAT = 35.017971;
    private final Double DEFAULT_LNT = 126.782226;
    private final DiarySearchService searchService;
    @GetMapping("/near-loc")
    public ResponseEntity<?> getAllNearLocation(
            @RequestParam Double lnt, @RequestParam Double lat) throws Exception {
        lnt = lnt == null ? DEFAULT_LNT : lnt;
        lat = lat == null ? DEFAULT_LAT : lat;
        List<DiarySearchDTO> result = searchService.getAllNearLocation(lnt,lat);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/")
    public ResponseEntity<?> getDiary(@RequestParam Long id){
        DiarySearchDTO result = searchService.getDiaryById(id);
        return ResponseEntity.ok(result);
    }
}
