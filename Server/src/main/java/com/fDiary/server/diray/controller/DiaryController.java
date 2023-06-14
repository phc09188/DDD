package com.fDiary.server.diray.controller;

import com.fDiary.server.diray.model.dto.DiaryReadDTO;
import com.fDiary.server.diray.model.dto.DiaryWriteDTO;
import com.fDiary.server.diray.service.DiaryService;
import com.fDiary.server.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

@RestController()
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;

    @PostMapping("/write")
    public ResponseEntity<Long> writeDiary(@RequestBody DiaryWriteDTO diaryWriteDTO) {
        String userId = SecurityUtil.getCurrentUsername();
        return ResponseEntity.ok(diaryService.writeDiary(userId, diaryWriteDTO));
    }

    @RequestMapping("/image/upload")
    public ResponseEntity<?> fileUploadCheck(@ModelAttribute MultipartFile diaryImage,@RequestParam Long diaryId) throws IOException {
        String userId = SecurityUtil.getCurrentUsername();
        diaryService.fileUpload(diaryId, diaryImage);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/check-read")
    public ResponseEntity<DiaryReadDTO> checkAndReadDiary(@RequestParam String date) throws FileNotFoundException {
        String userId = SecurityUtil.getCurrentUsername();
        return ResponseEntity.ok(diaryService.readDateDiary(date, userId));
    }

    @GetMapping("/image/read")
    public ResponseEntity<byte[]> fileRead(@RequestParam String fileUrl){
        HttpHeaders headers = new HttpHeaders();
        File file = new File(fileUrl);
        try{
            if(Files.probeContentType(file.toPath())!= null) headers.set("Content-Type", Files.probeContentType(file.toPath()));
            byte[] arr = FileCopyUtils.copyToByteArray(file);
            return new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(file),headers,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/delete")
    public ResponseEntity<Map<String,String>> diaryDelete(@RequestParam String diaryId){
        diaryService.deleteDiary(diaryId);
        Map<String,String> resultMap = new HashMap<>();
        resultMap.put("result","success");
        return ResponseEntity.ok(resultMap);
    }
    @GetMapping("/week/report")
    public ResponseEntity<?> weeklyReport(){
        String userId = SecurityUtil.getCurrentUsername();
        diaryService.getWeeklyReport(userId);
        return null;
    }
}
